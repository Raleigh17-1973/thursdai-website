// HubSpot form submission — used by the demo request modal

export interface DemoRequestPayload {
  name: string;
  company: string;
  email: string;
  decision: string; // "What decision would you most want to replay?"
}

export async function submitDemoRequest(payload: DemoRequestPayload): Promise<void> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    throw new Error('HubSpot credentials not configured');
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const body = {
    fields: [
      { name: 'firstname', value: payload.name.split(' ')[0] },
      { name: 'lastname', value: payload.name.split(' ').slice(1).join(' ') },
      { name: 'company', value: payload.company },
      { name: 'email', value: payload.email },
      { name: 'decision_to_replay', value: payload.decision },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`HubSpot submission failed: ${res.status}`);
  }
}
