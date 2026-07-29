import { Injectable, NgZone, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AgentVoiceService {
  readonly supported = typeof window !== 'undefined'
    && !!((window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition);
  readonly ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  readonly listening = signal(false);
  readonly speaking = signal(false);

  private recognition: any = null;
  private voicesReady = false;

  constructor(private zone: NgZone) {
    // Chrome loads voices async; the first speak() call can silently no-op
    // if it fires before the voice list is populated.
    if (this.ttsSupported) {
      const warm = () => { this.voicesReady = window.speechSynthesis.getVoices().length > 0; };
      warm();
      window.speechSynthesis.onvoiceschanged = warm;
    }
  }

  listen(onResult: (text: string) => void, onEnd?: () => void): void {
    if (!this.supported) return;
    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    // Speech recognition events fire outside Angular's zone, so signal
    // writes and the onResult callback never trigger change detection
    // unless explicitly run back inside the zone.
    this.recognition.onstart = () => this.zone.run(() => this.listening.set(true));
    this.recognition.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript ?? '';
      if (text) this.zone.run(() => onResult(text));
    };
    this.recognition.onerror = () => this.zone.run(() => this.listening.set(false));
    this.recognition.onend = () => {
      this.zone.run(() => {
        this.listening.set(false);
        onEnd?.();
      });
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
    if (this.voicesReady) {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => v.lang.startsWith('en') && /female|samantha|zira/i.test(v.name))
        ?? voices.find((v) => v.lang.startsWith('en'));
      if (preferred) utter.voice = preferred;
    }
    utter.onstart = () => this.zone.run(() => this.speaking.set(true));
    utter.onend = () => this.zone.run(() => this.speaking.set(false));
    utter.onerror = () => this.zone.run(() => this.speaking.set(false));
    window.speechSynthesis.speak(utter);
  }

  stopSpeaking(): void {
    if (!this.ttsSupported) return;
    window.speechSynthesis.cancel();
    this.speaking.set(false);
  }
}
