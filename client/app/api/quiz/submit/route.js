const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/api/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const responsePreview = (await response.text()).slice(0, 200);
      console.error('Quiz API returned a non-JSON response:', {
        status: response.status,
        contentType,
        responsePreview,
      });

      return Response.json(
        {
          success: false,
          message: 'Quiz service returned an invalid response. Check that the backend is running on port 5000.',
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Quiz API error:', error);
    return Response.json(
      { success: false, message: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
