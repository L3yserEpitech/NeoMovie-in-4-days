import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer 355|oiwu0k3mV0I11rWhssXPbAhwy7NmO7OuMUBeRhMc');
    headers.append('Accept', 'application/json');

    const init = {
      method: 'GET',
      headers,
    };

    const response = await fetch('https://api.movieposterdb.com/v1/random/movies', init);
    const data = await response.json();

    return new NextResponse(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
