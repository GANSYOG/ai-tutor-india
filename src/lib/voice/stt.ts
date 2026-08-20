import { createClient } from "@deepgram/sdk";
import { env } from "@/config/env";

const deepgram = createClient(env.DEEPGRAM_API_KEY || "dummy");

export async function transcribeAudioStream(audioStream: NodeJS.ReadableStream): Promise<string> {
    try {
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            audioStream as any,
            {
                model: "nova-2",
                language: "en-IN",
                smart_format: true,
            }
        );

        if (error) {
            console.error("Deepgram Error:", error);
            throw new Error("STT Failed");
        }

        return result?.results?.channels[0]?.alternatives[0]?.transcript || "";
    } catch (e) {
        console.error("Deepgram transcription failed:", e);
        throw e;
    }
}
