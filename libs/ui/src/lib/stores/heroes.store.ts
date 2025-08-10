import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { createMessage, MessageStore } from '@toh/state';
import { create } from 'mutative';
import { debounceTime, pipe, tap } from 'rxjs';
import { Hero, mockHeroes } from '../models/hero.model';
import { createHeroesView } from '../models/heroes-view.model';

export const heroesStateEvents = eventGroup({
  source: 'Heroes UI',
  events: {
    heroNameChanged: type<string | undefined>(),
  },
});

const StoreName = 'HeroesStore' as const;

export const HeroesStore = signalStore(
  withImmutableState(createHeroesView({ heroes: mockHeroes() })),
  withComputed((state) => {
    return {
      selectedHero: computed(() => {
        const selectedId = state.selectedHeroId();

        return state.heroes().find((hero) => hero.id === selectedId);
      }),
    };
  }),
  withMethods((state) => {
    const messageStore = inject(MessageStore);

    return {
      selectHero(id: number) {
        patchState(state, { selectedHeroId: id });
      },
      updateHeroName: rxMethod<{ heroId: number; name: string | undefined }>(
        pipe(
          debounceTime(300),
          tap(({ heroId, name }) => {
            patchState(state, updateHeroName(name, heroId, state.heroes()));

            messageStore.add(
              createMessage(
                StoreName,
                `Hero name changed: ${state.selectedHero()?.name} (${heroId})`,
              ),
            );
          }),
        ),
      ),
    };
  }),
  withHooks((state) => {
    const messageStore = inject(MessageStore);

    return {
      onInit() {
        messageStore.add(createMessage(StoreName, 'Store initialized.'));
      },
      onDestroy() {
        messageStore.add(createMessage(StoreName, 'Store destroyed.'));
      },
    };
  }),
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
    // TODO: add tests that check for nullish and ''
    // '' string should change, nullish values shouldn't
    if (heroName == undefined || !heroId) {
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
