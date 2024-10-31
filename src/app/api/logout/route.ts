import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest): Promise<NextResponse> {

    // La méthode de requête est connue par le serveur, mais n'est pas supportée par la ressource cible.
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
        // Here, we clear all secure cookies
        const response = new NextResponse(JSON.stringify({ message: 'Logged out successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

        response.headers.set('Set-Cookie', serialize('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: -1, // ou vous pouvez utiliser expires avec une date passée
            path: '/'
        }));

        return response;
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Bad Request' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
}