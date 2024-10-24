import { NextResponse } from 'next/server';
import dbConnect from '../lib/db';
import Team from '../models/team';

export async function POST(request: Request) {
    const body = await request.json();
    await dbConnect();
    const mResp = await Team.find({invitedBy: body.telegramID});
    return NextResponse.json(mResp);
}