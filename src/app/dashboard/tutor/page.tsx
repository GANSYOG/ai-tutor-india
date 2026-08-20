"use client";

import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { TutorAvatar } from "@/components/avatar/TutorAvatar";
import { useAudioVisemeSync } from "@/hooks/useAudioVisemeSync";
import { useChat } from "@ai-sdk/react";
import { MicrophoneButton } from "@/components/voice/MicrophoneButton";

export default function TutorInterface() {
  const { messages, input, handleInputChange, handleSubmit, setMessages, append } = useChat({
      api: '/api/chat',
      onFinish: async (message) => {
        // Stream completed, now trigger TTS
        await playTTS(message.content);
      }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [visemeValue, setVisemeValue] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { setupAudioContext, cleanupAudioContext, getVisemeMorphTargetValue } = useAudioVisemeSync();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpeaking) {
      interval = setInterval(() => {
        setVisemeValue(getVisemeMorphTargetValue());
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isSpeaking, getVisemeMorphTargetValue]);

  const playTTS = async (text: string) => {
      try {
        const ttsResponse = await fetch("/api/voice/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, voiceId: "21m00Tcm4TlvDq8ikWAM" }),
        });

        if (!ttsResponse.ok) throw new Error("TTS request failed");

        const audioBlob = await ttsResponse.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
            audioRef.current.src = audioUrl;

            audioRef.current.oncanplay = () => {
                const stream = (audioRef.current as any).captureStream?.() || (audioRef.current as any).mozCaptureStream?.();
                if (stream) {
                    setupAudioContext(stream);
                }
                setIsSpeaking(true);
                audioRef.current?.play();
            };

            audioRef.current.onended = () => {
                setIsSpeaking(false);
                cleanupAudioContext();
                URL.revokeObjectURL(audioUrl);
            };
        }
      } catch (e) {
          console.error(e);
      }
  }

  const customSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* 3D Avatar Section */}
      <div className="w-1/2 relative">
        <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="city" />
          <OrbitControls target={[0, 1.5, 0]} />
          {/* Using a generic ready player me dummy URL here */}
          <TutorAvatar
            modelUrl="https://models.readyplayer.me/64b58e72ef0f940bb7189178.glb"
            speaking={isSpeaking}
            visemeValue={visemeValue}
          />
        </Canvas>
        <div className="absolute bottom-4 left-4 right-4 text-center">
            {isSpeaking && <div className="text-green-400 font-bold animate-pulse">Tutor is speaking...</div>}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="w-1/2 flex flex-col border-l border-gray-700 bg-gray-800">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-4 rounded-xl max-w-lg ${m.role === "user" ? "bg-blue-600 self-end ml-auto" : "bg-gray-700"}`}>
              {m.content}
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-900 border-t border-gray-700">
          <form onSubmit={customSubmit} className="flex space-x-2">
            <MicrophoneButton
                onTranscribe={(text) => append({ role: 'user', content: text })}
            />
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask your tutor anything..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Hidden Audio Player */}
      <audio ref={audioRef} className="hidden" crossOrigin="anonymous" />
    </div>
  );
}
