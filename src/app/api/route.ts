/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ name: 'StyleList94' });
}
