'use client';

import { useState, useEffect } from 'react';

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

export default function VoiceRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ko-KR';

        recognition.onstart = () => {
            console.log('음성 인식이 시작되었습니다.');
        };

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            
            setTranscript(transcript);
            
            // 여기서 Cursor에 전달하는 로직을 구현할 수 있습니다
            // 예: WebSocket이나 HTTP 요청을 통해 서버로 전송
        };

        recognition.onerror = (event: any) => {
            console.error('음성 인식 에러:', event.error);
        };

        recognition.onend = () => {
            console.log('음성 인식이 종료되었습니다.');
            if (isListening) {
                recognition.start();
            }
        };

        if (isListening) {
            recognition.start();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsListening(!isListening)}
                className={`p-4 rounded-full shadow-lg ${
                    isListening ? 'bg-red-500' : 'bg-blue-500'
                } text-white`}
            >
                {isListening ? '음성 인식 중지' : '음성 인식 시작'}
            </button>
            {transcript && (
                <div className="mt-2 p-2 bg-white rounded shadow">
                    {transcript}
                </div>
            )}
        </div>
    );
} 