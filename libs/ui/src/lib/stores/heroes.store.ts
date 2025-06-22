import {
  PartialStateUpdater,
  signalStore,
  type,
  withState,
} from '@ngrx/signals';
import { eventGroup, on, withReducer } from '@ngrx/signals/events';
import { create } from 'mutative';
import { Hero } from '../models/hero.model';
import { createHeroesView } from '../models/heroes-view.model';

export const heroesStateEvents = eventGroup({
  source: 'Heroes UI',
  events: {
    heroNameChanged: type<string | undefined>(),
  },
});

export const HeroesStore = signalStore(
  withState(() => createHeroesView({ hero: { id: 1, name: 'Windstorm' } })),
  withReducer(
    on(heroesStateEvents.heroNameChanged, ({ payload: heroName }) =>
      updateHeroName(heroName),
    ),
  ),
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
