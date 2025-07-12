// app/api/swapRequests/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import SwapRequest from '@/models/SwapRequest' // define this model

export async function GET() {
  try {
    await connectToDatabase()
    const requests = await SwapRequest.find()
    return NextResponse.json({ success: true, requests })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to fetch swap requests' }, { status: 500 })
  }
}
