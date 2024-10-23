import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Finished_Task from '../models/finished_task';

export async function PUT(request: Request) {
  const body = await request.json();
  await dbConnect();
  const mResp = await Finished_Task.find({userID: body.userID});
  return NextResponse.json(mResp);
}

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await Finished_Task.create(body);
    return NextResponse.json(mResp);
}