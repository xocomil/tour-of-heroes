import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroesStore } from '../stores/heroes.store';

@Component({
  selector: 'toh-hero-detail',
  imports: [CommonModule],
  template: `
    @let hero = heroesStore.selectedHero();
    @if (hero) {
      <h2>{{ hero.name | uppercase }} Details</h2>
      <div>id: {{ hero.id }}</div>
      <div>
        <label for="hero-name"
          >Hero name:
          <input
            class="input"
            id="hero-name"
            [value]="hero.name"
            (keyup)="updateHeroName($event, hero.id)"
            placeholder="name"
        /></label>
      </div>
    } @else {
      <h2>Select a hero</h2>
    }
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent {
  protected readonly heroesStore = inject(HeroesStore);

  protected updateHeroName($event: Event, heroId: number): void {
    const value = getValueProp($event.target);

    this.heroesStore.updateHeroName(heroId, value);
  }
}

function hasValueProp(target: unknown): target is { value: string } {
  return !!target && target instanceof Object && 'value' in target;
}

function getValueProp(target: unknown): string | undefined {
  return hasValueProp(target) ? target.value : undefined;
}
