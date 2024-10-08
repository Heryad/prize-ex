import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Ticket from '../models/ticket';
import User from '../models/user';

export async function PUT(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await Ticket.find({userID: body.userID});
    return NextResponse.json(mResp);
}
  
export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();

    const mLogin = await User.find({telegramID: body.userID});
    if(mLogin.length >= 1){
        const userBalance = parseInt(mLogin[0].userBalance);
        const itemPrice = parseInt(body.itemPrice) * parseInt(body.ticketQty);

        if(userBalance >= itemPrice){
            const newUserBalance = userBalance - itemPrice;
            const updatedUser = await User.findOneAndUpdate(
                { telegramID: body.userID },
                {
                  $set: {
                    userBalance: newUserBalance,
                  },
                },
                { new: true } // This option returns the updated document
            );
            const mResp = await Ticket.create(body);
            return NextResponse.json({msg: 'Purchase OK', updatedUser, mResp})
        }else{
            return NextResponse.json({msg: 'Balance Error'});
        }
    }
    return NextResponse.json({msg: 'none'});
}