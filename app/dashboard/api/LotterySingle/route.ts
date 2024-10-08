import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Lottery from '../models/lottery';

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await Lottery.findById(body._id);
    return NextResponse.json(mResp);
}