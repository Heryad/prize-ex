import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Payment from '../models/payment';

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await Payment.create(body);
    return NextResponse.json(mResp);
}