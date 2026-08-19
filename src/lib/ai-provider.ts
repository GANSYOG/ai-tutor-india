export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProvider {
  generateChatResponse(messages: ChatMessage[], systemPrompt?: string): Promise<ReadableStream>;
}

/**
 * A dummy AI provider for Phase 3 prototype before real Gateway integration.
 */
export class DummyAIProvider implements AIProvider {
  async generateChatResponse(messages: ChatMessage[], systemPrompt?: string): Promise<ReadableStream> {
    const encoder = new TextEncoder();

    return new ReadableStream({
      async start(controller) {
        const dummyResponse = "This is a simulated AI tutor response. The real AI Gateway will connect here in Phase 2.";
        const words = dummyResponse.split(" ");

        for (const word of words) {
          controller.enqueue(encoder.encode(word + " "));
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        controller.close();
      }
    });
  }
}
