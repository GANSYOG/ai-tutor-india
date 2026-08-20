import { generateTTSStream } from "@/lib/voice/tts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, voiceId } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Missing text" }, { status: 400 });
        }

        const audioStream = await generateTTSStream(text, voiceId);

        return new Response(audioStream as any, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (e) {
        console.error("TTS Route Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
