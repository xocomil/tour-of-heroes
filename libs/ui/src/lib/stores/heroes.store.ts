import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalStore,
  type,
  withComputed,
  withMethods,
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
  withImmutableState(createHeroesView({ heroes: mockHeroes() })),
  withMethods((state) => ({
    selectHero(id: number) {
      patchState(state, { selectedHeroId: id });
    },
    updateHeroName(heroId: number, name: string | undefined) {
      patchState(state, updateHeroName(name, heroId, state.heroes()));
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
  heroId: number,
  heroes: Hero[],
): PartialStateUpdater<{ heroes: Hero[] }> {
  return (state) => {
    if (!heroName || !heroId) {
      return { heroes };
    }

    const currentHero = heroes.findIndex((hero) => hero.id === heroId);

    if (currentHero === -1) {
      return { heroes };
    }

    return create(state, (draft) => {
      draft.heroes[currentHero].name = heroName;
    });
  };
}
