import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Lottery from '../models/lottery';

export async function GET() {
  await dbConnect();
  const mResp = await Lottery.find({lotteryStatus: 'completed'});
  return NextResponse.json(mResp);
}