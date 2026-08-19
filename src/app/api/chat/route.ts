import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { DummyAIProvider, ChatMessage } from "@/lib/ai-provider";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { messages, conversationId } = body as { messages: ChatMessage[], conversationId?: string };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // In a real scenario, we'd save the user's message to the conversation in DB here
    // e.g. await db.message.create({ ... })

    const provider = new DummyAIProvider();

    // Inject system prompt if it's not the first message
    const formattedMessages: ChatMessage[] = [
      { role: "system", content: TUTOR_SYSTEM_PROMPT },
      ...messages
    ];

    const stream = await provider.generateChatResponse(formattedMessages, TUTOR_SYSTEM_PROMPT);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
