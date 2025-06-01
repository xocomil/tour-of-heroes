import { signalStore, withState } from '@ngrx/signals';
import { createHeroesView } from '../models/heroes.model';

export const HeroesStore = signalStore(
  withState(() => createHeroesView({ hero: 'Windstorm' })),
);
