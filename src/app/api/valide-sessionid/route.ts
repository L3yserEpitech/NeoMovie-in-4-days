import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {

  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {

    const sessionId = req.cookies.get('sessionId')?.value;
    if (!sessionId) {
        const id = false
        return new NextResponse(
        JSON.stringify({ message: 'No session is open', id }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        }
        );
    }
    const id = true
    console.log("sessionId:", sessionId)
    return new NextResponse(
        JSON.stringify({ message: 'SessionId founded', id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Bad Request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}