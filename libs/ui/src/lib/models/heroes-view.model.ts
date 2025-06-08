import { createHero, Hero } from './hero.model';

export type HeroesView = {
  hero: Hero;
};

export function createHeroesView(
  options: Partial<HeroesView> = {},
): HeroesView {
  return {
    hero: createHero(options.hero),
  };
}
