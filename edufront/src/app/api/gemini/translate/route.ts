import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text, target } = await req.json();
  if (!text || !target) return NextResponse.json({ translated: '', error: 'Missing text or target' }, { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ translated: '', error: 'API key missing' }, { status: 500 });

  try {
const res = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey, 
    },
    body: JSON.stringify({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: `Translate this text to ${target}: "${text}" , just write the translated text` }] }]
    })
  }
);


    const data = await res.json();
    console.log('API response:', JSON.stringify(data, null, 2));

    const translated = data.candidates?.[0]?.content?.parts?.[0]?.text
    return NextResponse.json({ translated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ translated: '', error: 'Translation failed' }, { status: 500 });
  }
}
