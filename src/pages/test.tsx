import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './test.css';

export default function Test() {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<any>(null);
    const [transcript, setTranscript] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleSpeechRecognition = () => {
        alert('mic activado');
        if ('webkitSpeechRecognition' in window) {
            alert('if?');
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'es-ES';

            recognition.onstart = () => {
                console.log('Speech recognition service has started');
            };

            recognition.onresult = (event: any) => {
                const speechResult = event.results[0][0].transcript;
                setTranscript(speechResult);
                console.log('Result received: ' + speechResult);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error detected: ' + event.error);
            };

            recognition.onend = () => {
                console.log('Speech recognition service disconnected');
            };

            recognition.start();
        } else {
            console.error('webkitSpeechRecognition is not supported in this browser.');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleNextStep();
    };

    return (
        <div className="registro-container">
            <form onSubmit={handleSubmit} className="formulario">
                {step === 1 && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Bienvenido! {user?.nombre}
                        </Typography>
                        <Button type="submit" variant="contained" color="primary" size="large" className="btn-siguiente">
                            Siguiente
                        </Button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Test a {user?.nombre}
                        </Typography>
                        <div id="result" className="result">{transcript}</div>
                        <TextField
                            label="input"
                            variant="outlined"
                            name="input"
                            value={transcript}
                            className="input-field"
                            required
                        />
                        <Button onClick={handleSpeechRecognition} variant="contained" color="primary" size="large" className="btn-siguiente">
                            Hablar
                        </Button>
                        <Button type="submit" variant="contained" color="primary" size="large" className="btn-siguiente">
                            Siguiente
                        </Button>
                    </>
                )}
                {step === 3 && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Felicidades! {user?.nombre}, has pasado la prueba con éxito
                        </Typography>
                        <Button type="submit" variant="contained" color="primary" size="large" className="btn-siguiente">
                            Terminar
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
}
