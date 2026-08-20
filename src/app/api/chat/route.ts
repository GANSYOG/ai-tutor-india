import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { defaultModel } from "@/lib/ai-provider";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompts";
import { db } from "@/lib/db";
import { streamText, type CoreMessage } from "ai";
import { chatRateLimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.studentProfileId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (process.env.NODE_ENV !== "development") {
        const identifier = session.user.id;
        const { success } = await chatRateLimit.limit(identifier);

        if (!success) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
    }

    const { messages, conversationId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    let currentConversationId = conversationId;

    if (!currentConversationId) {
      const conv = await db.conversation.create({
        data: {
          studentProfileId: session.user.studentProfileId,
          title: "New Session",
        },
      });
      currentConversationId = conv.id;
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "user") {
      await db.message.create({
        data: {
          conversationId: currentConversationId,
          role: "user",
          content: lastMessage.content,
        },
      });
    }

    const recentMemories = await db.memory.findMany({
        where: { studentProfileId: session.user.studentProfileId },
        orderBy: { createdAt: "desc" },
        take: 5
    });

    let contextString = "";
    if (recentMemories.length > 0) {
        contextString = "Recent context about the student:\n" + recentMemories.map(m => `- ${m.content}`).join("\n");
    }

    const systemPromptWithContext = `${TUTOR_SYSTEM_PROMPT}\n\n${contextString}`;

    const result = await streamText({
      model: defaultModel,
      system: systemPromptWithContext,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })) as CoreMessage[],
      onFinish: async (completion) => {
        await db.message.create({
          data: {
            conversationId: currentConversationId,
            role: "assistant",
            content: completion.text,
          },
        });
      },
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
