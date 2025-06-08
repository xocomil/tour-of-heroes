import { signalStore, withState } from '@ngrx/signals';
import { createHeroesView } from '../models/heroes-view.model';

export const HeroesStore = signalStore(
  withState(() => createHeroesView({ hero: { id: 1, name: 'Windstorm' } })),
);
