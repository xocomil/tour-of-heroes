import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageStore } from '@toh/state';
import { MessageComponent } from '@toh/ui';

@Component({
  imports: [RouterModule, MessageComponent],
  selector: 'app-root',
  providers: [MessageStore],
  template: `
    <h1 class="mb-0 mx-auto">Angular Tour of Heroes</h1>
    <nav class="flex gap-4 flex-row">
      <a routerLink="/">Home</a>
      <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet />
    @defer {
      <toh-message />
    }
  `,
  host: {
    '[class]': 'hostTailwindClasses()',
  },
})
export class AppComponent {
  protected hostTailwindClasses = signal(
    'prose lg:prose-xl mx-auto max-w-9/10 p-4 w-9/10 flex flex-col gap-2 h-full max-h-screen',
  );
}
