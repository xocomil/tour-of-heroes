import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { heroesStateEvents, HeroesStore } from '../stores/heroes.store';

@Component({
  selector: 'toh-heroes',
  imports: [CommonModule],
  template: `
    <div class="card card-sm shadow-sm bg-neutral not-prose">
      <div class="card-body">
        @let hero = heroStore.hero();
        <h2 class="card-title">{{ hero.name | uppercase }} Details</h2>
        <p><span>id: </span>{{ hero.id }}</p>
        <div>
          <label for="heroName">name: </label
          ><input
            class="input"
            id="heroName"
            [value]="hero.name"
            (input)="updateHeroName($event)"
            placeholder="Hero's Name"
          />
        </div>
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
  readonly #dispatcher = injectDispatch(heroesStateEvents);
  protected readonly heroStore = inject(HeroesStore);

  protected updateHeroName($event: Event): void {
    const value = getValueProp($event.target);

    this.#dispatcher.heroNameChanged(value);
  }
}

function hasValueProp(target: unknown): target is { value: string } {
  return !!target && target instanceof Object && 'value' in target;
}

function getValueProp(target: unknown): string | undefined {
  return hasValueProp(target) ? target.value : undefined;
}
