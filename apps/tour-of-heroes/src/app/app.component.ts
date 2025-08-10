import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageStore } from '@toh/state';
import { HeroesComponent, MessageComponent } from '@toh/ui';

@Component({
  imports: [RouterModule, HeroesComponent, MessageComponent],
  selector: 'app-root',
  providers: [MessageStore],
  template: `
    <h1 class="mb-0 mx-auto">Angular Tour of Heroes</h1>
    <toh-heroes />
    <toh-message />
    <router-outlet />
  `,
  styleUrl: './app.component.css',
  host: {
    '[class]': 'hostTailwindClasses()',
  },
})
export class AppComponent {
  protected hostTailwindClasses = signal(
    'prose lg:prose-xl mx-auto max-w-9/10 p-4 w-9/10 flex flex-col gap-2 h-full max-h-screen',
  );
}
