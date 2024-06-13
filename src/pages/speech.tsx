import React, { useState } from 'react';
import './test.css';
import { Button } from '@mui/material';

export default function TestComponent() {
    const [result, setResult] = useState('');

    const startConverting = () => {
        if ('webkitSpeechRecognition' in window) {
            var speechRecognizer = new webkitSpeechRecognition();
            speechRecognizer.continuous = true;
            speechRecognizer.interimResults = true;
            speechRecognizer.lang = 'en-US';
            speechRecognizer.start();

            var finalTranscripts = '';

            speechRecognizer.onresult = function (event) {
                var interimTranscripts = '';
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var transcript = event.results[i][0].transcript;
                    transcript.replace("\n", "<br>");
                    if (event.results[i].isFinal) {
                        finalTranscripts += transcript;
                    } else {
                        interimTranscripts += transcript;
                    }
                }
                setResult(finalTranscripts + '<span style="color: #999">' + interimTranscripts + '</span>');
            };
            speechRecognizer.onerror = function (event) {

            };
        } else {
            setResult('Your browser is not supported. Please download Google Chrome or update your browser!');
        }
    };

    const handleSpeechRecognition = () => {
        startConverting();
    };

    return (
        <div className="registro-container">
            <Button onClick={handleSpeechRecognition} variant="contained" color="primary">
                Iniciar Reconocimiento de Voz
            </Button>
            <div id="result" className="result" dangerouslySetInnerHTML={{ __html: result }}></div>
        </div>
    );
}
