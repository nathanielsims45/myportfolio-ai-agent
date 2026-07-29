import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AgentVoiceService {
  readonly supported = typeof window !== 'undefined'
    && !!(window as any).webkitSpeechRecognition || !!(window as any).SpeechRecognition;
  readonly ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  readonly listening = signal(false);
  readonly speaking = signal(false);

  private recognition: any = null;

  listen(onResult: (text: string) => void, onEnd?: () => void): void {
    if (!this.supported) return;
    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => this.listening.set(true);
    this.recognition.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript ?? '';
      if (text) onResult(text);
    };
    this.recognition.onerror = () => this.listening.set(false);
    this.recognition.onend = () => {
      this.listening.set(false);
      onEnd?.();
    };

    this.recognition.start();
  }

  stopListening(): void {
    this.recognition?.stop();
  }

  speak(text: string): void {
    if (!this.ttsSupported || !text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.02;
    utter.pitch = 1;
    utter.onstart = () => this.speaking.set(true);
    utter.onend = () => this.speaking.set(false);
    utter.onerror = () => this.speaking.set(false);
    window.speechSynthesis.speak(utter);
  }

  stopSpeaking(): void {
    if (!this.ttsSupported) return;
    window.speechSynthesis.cancel();
    this.speaking.set(false);
  }
}
