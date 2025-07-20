import { Hero } from './hero.model';

export type HeroesView = {
  heroes: Hero[];
  selectedHeroId: number | undefined;
};

export function createHeroesView(
  options: Partial<HeroesView> = {},
): HeroesView {
  return {
    heroes: options.heroes ?? [],
    selectedHeroId: options.selectedHeroId ?? undefined,
  };
}
