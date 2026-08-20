import { transcribeAudioStream } from "@/lib/voice/stt";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Missing audio file" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert Buffer to Node.js Readable stream
        const audioStream = new Readable();
        audioStream.push(buffer);
        audioStream.push(null);

        const transcript = await transcribeAudioStream(audioStream);

        return NextResponse.json({ transcript });
    } catch (e) {
        console.error("STT Route Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
