export interface HeroesView {
  hero: string;
}

export function createHeroesView(options: Partial<HeroesView>): HeroesView {
  return {
    hero: options.hero ?? 'Default Hero',
  };
}
