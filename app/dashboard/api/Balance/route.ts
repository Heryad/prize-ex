import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import User from '../models/user'

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();
    console.debug(body.userID);

    const userResp = await User.find({ telegramID: body.userID });

    const prevBalance = userResp[0].userBalance;
    const newBalance = parseInt(prevBalance) + parseInt(body.paymentAmount);
    console.debug(newBalance);
    const updatedBalance = await User.findOneAndUpdate(
        { telegramID: body.userID },
        {
            $set: {
                userBalance: newBalance,
            },
        },
        { new: true } // This option returns the updated document
    );

    return NextResponse.json({ msg: 'ok', updatedBalance });
}