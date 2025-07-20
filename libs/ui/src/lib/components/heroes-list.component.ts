import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroesStore } from '../stores/heroes.store';

@Component({
  selector: 'toh-heroes-list',
  imports: [CommonModule],
  template: `
    <h2 class="card-title">My Heroes</h2>
    @for (hero of heroStore.heroes(); track hero.id) {
      <button
        class="btn w-60 flex gap-2 ps-0"
        (click)="selectHero(hero.id)"
        type="button"
      >
        <div
          class="h-full w-6 bg-primary text-primary-content pe-[2px] flex items-center justify-end"
        >
          {{ hero.id }}
        </div>
        <div class="flex-grow text-left">{{ hero.name }}</div></button
      ><br />
    }
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesListComponent {
  protected readonly heroStore = inject(HeroesStore);

  protected selectHero(id: number) {
    console.log('hero selected', id);

    this.heroStore.selectHero(id);
  }
}
