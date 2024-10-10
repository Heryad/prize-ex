import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Ticket from '../models/ticket';
import User from '../models/user';
import Lottery from '../models/lottery';

export async function PUT(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await Ticket.find({ userID: body.userID });
    return NextResponse.json(mResp);
}

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();

    const mLogin = await User.find({ telegramID: body.userID });
    if (mLogin.length >= 1) {
        const userBalance = parseInt(mLogin[0].userBalance);
        const itemPrice = parseInt(body.itemPrice) * parseInt(body.ticketQty);

        if (userBalance >= itemPrice) {
            const oldLottery = await Lottery.findById(body.itemID);
            if (parseInt(body.ticketQty) <= parseInt(oldLottery.itemQuantity)) {
                const newQuantity = parseInt(oldLottery.itemQuantity) - parseInt(body.ticketQty);
                const newSoldQuantity = parseInt(oldLottery.itemSoldQuantity) + parseInt(body.ticketQty);
                const updatedLottery = await Lottery.findByIdAndUpdate(
                    { _id: body.itemID },
                    {
                        $set: {
                            itemQuantity: newQuantity,
                            itemSoldQuantity: newSoldQuantity
                        },
                    },
                    { new: true } // This option returns the updated document
                );

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
                return NextResponse.json({ msg: 'Purchase OK', updatedUser, mResp })
            } else {
                return NextResponse.json({ msg: 'Quantity Error'})
            }
        } else {
            return NextResponse.json({ msg: 'Balance Error' });
        }
    }
    return NextResponse.json({ msg: 'none' });
}