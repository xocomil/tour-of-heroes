import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroesStore } from '../stores/heroes.store';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'toh-heroes',
  imports: [CommonModule, HeroDetailComponent],
  template: `
    <div
      class="card card-sm shadow-sm bg-neutral not-prose max-h-(--card-height)"
    >
      <div class="card-body flex-row overflow-hidden max-h-full">
        <div class="overflow-y-scroll max-h-full">
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
        </div>
        <div class="max-h-full prose">
          <toh-hero-detail />
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      --card-height: calc(100vh - 8rem);
    }
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroesStore],
})
export class HeroesComponent {
  protected readonly heroStore = inject(HeroesStore);

  protected selectHero(id: number) {
    console.log('hero selected', id);

    this.heroStore.selectHero(id);
  }
}
