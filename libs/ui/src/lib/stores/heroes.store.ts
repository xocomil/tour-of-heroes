import { computed } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalStore,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { create } from 'mutative';
import { Hero, mockHeroes } from '../models/hero.model';
import { createHeroesView } from '../models/heroes-view.model';

export const heroesStateEvents = eventGroup({
  source: 'Heroes UI',
  events: {
    heroNameChanged: type<string | undefined>(),
  },
});

export const HeroesStore = signalStore(
  withState(() => createHeroesView({ heroes: mockHeroes() })),
  withMethods((state) => ({
    selectHero(id: number) {
      patchState(state, { selectedHeroId: id });
    },
  })),
  withComputed((state) => ({
    selectedHero: computed(() => {
      const selectedId = state.selectedHeroId();

      return state.heroes().find((hero) => hero.id === selectedId);
    }),
  })),
  // withReducer(
  //   on(heroesStateEvents.heroNameChanged, ({ payload: heroName }) =>
  //     updateHeroName(heroName),
  //   ),
  // ),
);

function updateHeroName(
  heroName: string | undefined,
): PartialStateUpdater<{ hero: Hero }> {
  const name = heroName?.trim() ?? '';

  return (state) =>
    create(state, (draft) => {
      draft.hero.name = name;
    });
}
