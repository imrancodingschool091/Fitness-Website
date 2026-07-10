const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const allowedActions = new Set(['create-checkout-session', 'verify-checkout-session', 'create-portal-session', 'subscription-status']);

const forward = async (req, params, method) => {
  try {
    const { action } = await params;
    if (!allowedActions.has(action)) return Response.json({ message: 'Not found' }, { status: 404 });

    const options = {
      method,
      headers: { Authorization: req.headers.get('authorization') || '' },
    };
    if (method === 'POST') {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(await req.json());
    }

    const response = await fetch(`${BACKEND_URL}/api/payments/${action}`, options);
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await response.json() : { message: 'Payment service returned an invalid response.' };
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Payments API error:', error);
    return Response.json({ message: 'Payment service is unavailable.' }, { status: 500 });
  }
};

export async function GET(req, { params }) {
  return forward(req, params, 'GET');
}

export async function POST(req, { params }) {
  return forward(req, params, 'POST');
}
