import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { sql } from '@vercel/postgres';
import { serialize } from 'cookie';

export async function POST(req: NextRequest): Promise<NextResponse> {

  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const authToken = req.cookies.get('authToken')?.value;
  if (!authToken) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized, please provide valid authentication.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {

    const decodedToken = verifyToken(authToken)
    //@ts-expect-error email utilisateur
    const email = decodedToken?.email

    const userData = await sql`
        SELECT email, password, prenom, nom, abonnement
        FROM taker
        WHERE email = ${email};
    `;

    if (!userData.rowCount) {
      const response = new NextResponse(
        JSON.stringify({ 
          message: 'Not found, the resource could not be located.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' }
        }
      );

      response.headers.set('Set-Cookie', serialize('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
          maxAge: -1,
          path: '/'
      }));

      return response;
    }

    const user = userData?.rows[0]

    return new NextResponse(
        JSON.stringify({ message: 'User data succesfuly received', user }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}