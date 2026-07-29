import { Component, ElementRef, ViewChild, AfterViewChecked, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentOrbComponent } from './agent-orb.component';
import { AgentChatService } from '../../services/agent-chat.service';
import { AgentVoiceService } from '../../services/agent-voice.service';

@Component({
  selector: 'app-agent-widget',
  imports: [AgentOrbComponent, FormsModule],
  template: `
    <div class="fixed z-50 bottom-5 right-5 sm:bottom-8 sm:right-8 flex flex-col items-end gap-3">
      @if (open()) {
        <div class="glass gradient-border rounded-2xl w-[92vw] max-w-sm h-[70vh] max-h-[560px] flex flex-col overflow-hidden shadow-2xl">
          <div class="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <div class="w-9 h-9 shrink-0"><app-agent-orb [state]="orbState()" /></div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-text truncate">Nate — AI Intake Assistant</div>
              <div class="text-[11px] text-text-muted truncate">{{ statusLabel() }}</div>
            </div>
            <button (click)="close()" class="text-text-muted hover:text-text transition-colors p-1" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M2 2l12 12M14 2L2 14" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div #scrollHost class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            @for (m of chat.messages(); track $index) {
              <div class="flex" [class.justify-end]="m.role === 'user'">
                <div
                  class="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                  [class]="m.role === 'user'
                    ? 'bg-gradient-to-br from-[#7c5cff] to-[#38bdf8] text-white rounded-br-sm'
                    : 'bg-white/5 text-text rounded-bl-sm'">
                  {{ m.content }}
                </div>
              </div>
            }
            @if (chat.sending()) {
              <div class="flex">
                <div class="bg-white/5 rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-text-muted">
                  <span class="inline-flex gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style="animation-delay:0ms"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style="animation-delay:120ms"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style="animation-delay:240ms"></span>
                  </span>
                </div>
              </div>
            }
            @if (chat.error()) {
              <div class="text-xs text-red-400 px-1">{{ chat.error() }}</div>
            }
          </div>

          <form (submit)="onSubmit($event)" class="flex items-center gap-2 px-3 py-3 border-t border-white/10">
            @if (voice.supported) {
              <button type="button" (click)="toggleListen()"
                class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                [class]="voice.listening() ? 'bg-[#34d399] text-black' : 'bg-white/5 text-text-muted hover:text-text'"
                [attr.aria-label]="voice.listening() ? 'Stop listening' : 'Start voice input'">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 10a2 2 0 0 0 2-2V4a2 2 0 1 0-4 0v4a2 2 0 0 0 2 2Zm3.3-2a.5.5 0 0 1 1 0A4.3 4.3 0 0 1 8.5 12.24V14h1.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1h1.5v-1.76A4.3 4.3 0 0 1 3.7 8a.5.5 0 0 1 1 0A3.3 3.3 0 0 0 8 11.3 3.3 3.3 0 0 0 11.3 8Z"/>
                </svg>
              </button>
            }
            <input
              [(ngModel)]="draft"
              name="draft"
              type="text"
              placeholder="Ask about the work, or describe your project..."
              class="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-[#7c5cff]/60"
              [disabled]="chat.sending()"
            />
            <button type="submit" [disabled]="chat.sending() || !draft.trim()"
              class="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#38bdf8] text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
              aria-label="Send message">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M1 8l13-6-4 6 4 6-13-6Z"/></svg>
            </button>
          </form>
        </div>
      }

      <button
        (click)="toggle()"
        class="w-16 h-16 rounded-full glass gradient-border shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open AI assistant"
      >
        <div class="w-11 h-11"><app-agent-orb [state]="orbState()" /></div>
      </button>
    </div>
  `,
})
export class AgentWidgetComponent implements AfterViewChecked {
  @ViewChild('scrollHost') scrollHost?: ElementRef<HTMLDivElement>;

  readonly open = signal(false);
  draft = '';

  readonly orbState = computed<0 | 1 | 2>(() => {
    if (this.voice.listening()) return 2;
    if (this.voice.speaking() || this.chat.sending()) return 1;
    return 0;
  });

  readonly statusLabel = computed(() => {
    if (this.voice.listening()) return 'Listening…';
    if (this.chat.sending()) return 'Thinking…';
    if (this.voice.speaking()) return 'Speaking…';
    return 'Online';
  });

  private lastMessageCount = 0;

  constructor(readonly chat: AgentChatService, readonly voice: AgentVoiceService) {}

  toggle(): void {
    this.open.update((v) => !v);
  }

  close(): void {
    this.open.set(false);
    this.voice.stopListening();
    this.voice.stopSpeaking();
  }

  toggleListen(): void {
    if (this.voice.listening()) {
      this.voice.stopListening();
      return;
    }
    this.voice.listen((text) => {
      this.draft = text;
      void this.send(true);
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    this.send(false);
  }

  /** Only speak the reply aloud when the question itself came in by voice. */
  private async send(viaVoice: boolean): Promise<void> {
    const text = this.draft;
    this.draft = '';
    const before = this.chat.messages().length;
    await this.chat.send(text);
    const after = this.chat.messages();
    if (viaVoice && after.length > before) {
      const reply = after[after.length - 1];
      if (reply.role === 'assistant') this.voice.speak(reply.content);
    }
  }

  ngAfterViewChecked(): void {
    const count = this.chat.messages().length;
    if (count !== this.lastMessageCount && this.scrollHost) {
      this.lastMessageCount = count;
      const el = this.scrollHost.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
