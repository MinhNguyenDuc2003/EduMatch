import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text, target } = await req.json();

  if (!text || !target) {
    return NextResponse.json({ translated: '', error: 'Text or target missing' }, { status: 400 });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI API key missing');

    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Translate the following text to ${target}:\n${text} , just write the translated text` }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();
    const translated = data.candidates?.[0]?.content?.trim() ?? '';
    return NextResponse.json({ translated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ translated: '', error: 'Translation failed' }, { status: 500 });
  }
}
