import { ElevenLabsClient } from "elevenlabs";
import { env } from "@/config/env";

const elevenlabs = new ElevenLabsClient({ apiKey: env.ELEVENLABS_API_KEY || "dummy" });

const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

export async function generateTTSStream(text: string, voiceId: string = DEFAULT_VOICE_ID) {
    try {
        const audioStream = await elevenlabs.generate({
            voice: voiceId,
            text,
            model_id: "eleven_multilingual_v2",
        });

        return audioStream;
    } catch (e) {
        console.error("ElevenLabs TTS Error:", e);
        throw e;
    }
}
