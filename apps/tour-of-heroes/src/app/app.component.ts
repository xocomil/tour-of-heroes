import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <h1>Angular Tour of Heroes</h1>
    <router-outlet></router-outlet>
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
