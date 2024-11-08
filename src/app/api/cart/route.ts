import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Cart from '@/app/models/Cart'

export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { items, total } = body

    // TODO: Add proper user authentication and get real userId
    const userId = '123'

    const cart = await Cart.create({
      userId,
      items,
      total
    })

    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    console.error('Error saving cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save cart' },
      { status: 500 }
    )
  }
}
