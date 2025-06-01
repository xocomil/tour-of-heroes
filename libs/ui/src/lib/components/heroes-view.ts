import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroesStore } from '../stores/heroes.store';

@Component({
  selector: 'toh-heroes',
  imports: [CommonModule],
  template: `<h2>{{ heroStore.hero() }}</h2>`,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroesStore],
})
export class HeroesComponent {
  protected readonly heroStore = inject(HeroesStore);
}
