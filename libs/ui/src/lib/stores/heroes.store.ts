import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { create } from 'mutative';
import { createHeroesView } from '../models/heroes-view.model';

export const HeroesStore = signalStore(
  withState(() => createHeroesView({ hero: { id: 1, name: 'Windstorm' } })),
  withMethods((state) => ({
    updateHeroName(heroName: string | undefined): void {
      const name = heroName?.trim() ?? '';

      patchState(state, {
        hero: create(state.hero(), (draft) => {
          draft.name = name;
        }),
      });
    },
  })),
);
