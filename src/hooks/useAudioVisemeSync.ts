import { useState, useRef, useEffect } from "react";

export function useAudioVisemeSync() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);

    // This is a naive implementation simulating visemes from audio frequency.
    // In a production system, you'd use a dedicated lip-sync library or viseme metadata from ElevenLabs/Oculus
    const getVisemeMorphTargetValue = () => {
        if (!isPlaying || !analyzerRef.current || !dataArrayRef.current) {
            return 0;
        }

        analyzerRef.current.getByteFrequencyData(dataArrayRef.current as any);

        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
            sum += dataArrayRef.current[i];
        }

        const average = sum / dataArrayRef.current.length;

        // Map 0-255 average to 0.0 - 1.0 range for morph target
        return Math.min(1.0, average / 128.0);
    };

    const setupAudioContext = (stream: MediaStream) => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();

        analyzerRef.current = audioContextRef.current.createAnalyser();
        analyzerRef.current.fftSize = 256;

        const bufferLength = analyzerRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyzerRef.current);

        // We don't connect to destination to avoid echo, we assume an <audio> tag is playing it
        setIsPlaying(true);
    };

    const cleanupAudioContext = () => {
        setIsPlaying(false);
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
    };

    useEffect(() => {
        return () => {
            cleanupAudioContext();
        };
    }, []);

    return {
        setupAudioContext,
        cleanupAudioContext,
        getVisemeMorphTargetValue,
        isPlaying
    };
}
