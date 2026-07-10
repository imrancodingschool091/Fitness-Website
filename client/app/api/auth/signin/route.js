const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Auth API error:', error);
    return Response.json(
      { message: 'Failed to sign in' },
      { status: 500 }
    );
  }
}
