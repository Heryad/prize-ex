import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import User from '../models/user';

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await User.find({telegramID: body.telegramID});
    
    if(mResp.length >= 1){
        return NextResponse.json({msg: 'user login', data: mResp});
    }else{
        const mResp = await User.create(body);
        if(body.invitedBy != ''){
            const newResp = await User.findById(body.invitedBy);
            const prevBalance = newResp.userBalance;
            const newBalance = parseInt(prevBalance) + 2;
            const updatedUser = await User.findOneAndUpdate(
                { _id: body.invitedBy },
                {
                  $set: {
                    userBalance: newBalance,
                  },
                },
                { new: true } // This option returns the updated document
            );
            return NextResponse.json({msg: 'User Created', data: updatedUser});            
        }
        return NextResponse.json({msg: 'user created', data: mResp});
    }
}