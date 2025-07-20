import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesComponent } from '@toh/ui';

@Component({
  imports: [RouterModule, HeroesComponent],
  selector: 'app-root',
  template: `
    <h1>Angular Tour of Heroes</h1>
    <toh-heroes />
    <router-outlet />
  `,
  styleUrl: './app.component.css',
  host: {
    '[class]': 'hostTailwindClasses()',
  },
})
export class AppComponent {
  protected hostTailwindClasses = signal(
    'prose lg:prose-xl block mx-auto max-w-9/10 p-4 w-9/10',
  );
}
