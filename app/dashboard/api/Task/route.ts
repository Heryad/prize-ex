import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Task from '../models/task';

export async function GET() {
  await dbConnect();
  const mResp = await Task.find({});
  return NextResponse.json(mResp);
}