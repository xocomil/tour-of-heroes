import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroesStore } from '../stores/heroes.store';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesListComponent } from './heroes-list.component';

@Component({
  selector: 'toh-heroes',
  imports: [CommonModule, HeroDetailComponent, HeroesListComponent],
  template: `
    <div
      class="card card-sm shadow-sm bg-neutral not-prose max-h-(--card-height)"
    >
      <div class="card-body flex-row overflow-hidden max-h-full">
        <div class="overflow-y-scroll max-h-full">
          <toh-heroes-list />
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
export class HeroesComponent {}
