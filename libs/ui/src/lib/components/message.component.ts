import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessageStore } from '@toh/state';

@Component({
  selector: 'toh-message',
  imports: [CommonModule],
  template: `
    @let messages = messageStore.prettyMessages();

    @if (messages.length) {
      <h2>Messages</h2>
      <button class="clear" (click)="messageStore.clear()" type="button">
        Clear messages
      </button>
      <div>
        @for (message of messages; track message) {
          {{ message }}
        }
      </div>
    } @else {
      <h2>No messages</h2>
    }
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  protected readonly messageStore = inject(MessageStore);
}
