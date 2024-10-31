import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { generateToken } from '@/lib/jwt';

export async function POST(req: NextRequest): Promise<NextResponse> {

  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {

    const body = await req.json()
    const { email, password, prenom, nom, isRemember } = body
    
    if (!email || !password || !prenom || !nom) {
      return new NextResponse(
          JSON.stringify({ 
            message: 'Email and password are required.' }),
            { status: 409, headers: { 'Content-Type': 'application/json' }
          }
        );
    }
    
    const userExists = await sql`SELECT * FROM taker WHERE email = ${email}`;
    if (userExists === null || (userExists.rowCount !== null && userExists.rowCount > 0)) {
      return new NextResponse(
        JSON.stringify({ error: 'This email is already registered. Please log in.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const abonnement = "free";

    const result = await sql`
      INSERT INTO taker (email, password, prenom, nom, abonnement)
      VALUES (${email}, ${hashedPassword}, ${prenom}, ${nom}, ${abonnement})
      RETURNING *;
    `;

    const user = result.rows[0];

    const token = generateToken({ id: user.id, email: user.email });

    const response = new NextResponse(
      JSON.stringify({ message: 'New user successfully created', token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    if (!isRemember) {
      return response;
  } else {
      response.headers.set('Set-Cookie', serialize('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 30,
          path: '/'
      }));
      return response;
  }

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Bad Request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}