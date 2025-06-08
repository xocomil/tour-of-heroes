import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroesStore } from '../stores/heroes.store';

@Component({
  selector: 'toh-heroes',
  imports: [CommonModule],
  template: `
    <div class="card card-sm shadow-sm bg-neutral not-prose">
      <div class="card-body">
        @let hero = heroStore.hero();
        <h2 class="card-title">{{ hero.name }} Details test</h2>
        <div><span>id: </span>{{ hero.id }}</div>
        <div><span>name: </span>{{ hero.name }}</div>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroesStore],
})
export class HeroesComponent {
  protected readonly heroStore = inject(HeroesStore);
}
