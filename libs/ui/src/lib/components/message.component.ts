import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessageStore } from '@toh/state';

@Component({
  selector: 'toh-message',
  imports: [],
  template: `
    @let messages = messageStore.prettyMessages();

    @if (messages.length) {
      <h2 class="mt-0 mb-1 text-info">Messages</h2>
      <button
        class="clear"
        class="btn btn-sm btn-warning"
        (click)="messageStore.clear()"
        type="button"
      >
        Clear messages
      </button>
      <pre>@for (message of messages; track $index) { {{ message }}\n}</pre>
    } @else {
      <h2 class="mt-0 mb-0">No messages</h2>
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
