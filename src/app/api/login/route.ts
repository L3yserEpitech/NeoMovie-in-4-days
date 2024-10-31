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
 
        const body = await req.json();
        const { email, password, isRemember } = body;

        if (!email || !password) {
            return new NextResponse(
                JSON.stringify({ error: 'Email and password are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const userData = await sql`SELECT * FROM taker WHERE email = ${email}`;
        if (!userData || userData.rowCount === 0) {
            return new NextResponse(
                JSON.stringify({ message: 'User does not exist. Please try creating an account.' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const user = userData.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return new NextResponse(
                JSON.stringify({ message: 'The password you entered is incorrect. Please try again.' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const token = generateToken({ id: user.id, email: user.email });

        const response = new NextResponse(
            JSON.stringify({ message: 'New user successfully created', user }),
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