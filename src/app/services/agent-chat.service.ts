import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class AgentChatService {
  readonly messages = signal<ChatMessage[]>([
    { role: 'assistant', content: "Hi, I'm Nate's AI intake assistant. Ask me about his work, or tell me what you're trying to build." },
  ]);
  readonly sending = signal(false);
  readonly error = signal<string | null>(null);

  async send(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed || this.sending()) return;

    this.error.set(null);
    this.messages.update((m) => [...m, { role: 'user', content: trimmed }]);
    this.sending.set(true);

    try {
      const res = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: this.messages() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      const data = await res.json();
      const reply: string = data?.reply ?? "Sorry, I didn't get a response — try again in a moment.";
      this.messages.update((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Something went wrong reaching the agent.');
    } finally {
      this.sending.set(false);
    }
  }
}
