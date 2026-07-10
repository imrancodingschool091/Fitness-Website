const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(req) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(await req.json()),
    });
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await response.json()
      : { message: 'Account service returned an invalid response.' };
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Sign-up API error:', error);
    return Response.json({ message: 'Unable to reach the account service. Is the backend running?' }, { status: 503 });
  }
}
