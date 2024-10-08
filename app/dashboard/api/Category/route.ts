import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Category from '../models/category';

export async function GET() {
  await dbConnect();
  const mResp = await Category.find({});
  return NextResponse.json(mResp);
}