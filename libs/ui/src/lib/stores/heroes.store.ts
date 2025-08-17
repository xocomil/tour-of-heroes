import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { injectDispatch } from '@ngrx/signals/events';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { createMessage, messageStateEvents, MessageStore } from '@toh/state';
import { create } from 'mutative';
import { debounceTime, pipe, tap } from 'rxjs';
import { Hero, mockHeroes } from '../models/hero.model';
import { createHeroesView } from '../models/heroes-view.model';

const StoreName = 'HeroesStore' as const;

export const HeroesStore = signalStore(
  withImmutableState(createHeroesView({ heroes: mockHeroes() })),
  withComputed((state) => {
    const messageDispatcher = injectDispatch(messageStateEvents);

    return {
      selectedHero: computed(() => {
        const selectedId = state.selectedHeroId();

        const hero = state.heroes().find((hero) => hero.id === selectedId);

        if (hero) {
          messageDispatcher.addMessage(
            createMessage(
              StoreName,
              `Selected hero: ${hero.name} (${hero.id})`,
            ),
          );
        }

        return hero;
      }),
    };
  }),
  withMethods((state) => {
    const messageDispatcher = injectDispatch(messageStateEvents);

    return {
      selectHero(id: number) {
        patchState(state, { selectedHeroId: id });
      },
      updateHeroName: rxMethod<{ heroId: number; name: string | undefined }>(
        pipe(
          debounceTime(300),
          tap(({ heroId, name }) => {
            patchState(state, updateHeroName(name, heroId, state.heroes()));

            messageDispatcher.addMessage(
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
);

function updateHeroName(
  heroName: string | undefined,
  heroId: number,
  heroes: Hero[],
): PartialStateUpdater<{ heroes: Hero[] }> {
  return (state) => {
    // TODO: add tests that check for nullish and ''
    // '' string should change, nullish values shouldn't
    // TODO: add tests to check for hero ID 0. This should be allowed
    // hero IDs should not be negative
    if (heroName == undefined || heroId <= 0) {
      return { heroes };
    }

    const currentHeroIndex = heroes.findIndex((hero) => hero.id === heroId);

    if (currentHeroIndex === -1) {
      return { heroes };
    }

    return create(state, (draft) => {
      draft.heroes[currentHeroIndex].name = heroName.trim();
    });
  };
}
