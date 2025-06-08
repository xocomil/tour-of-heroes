export type Hero = {
  id: number;
  name: string;
};

export function createHero(options: Partial<Hero> = {}): Hero {
  return {
    id: options.id ?? -1,
    name: options.name ?? 'Default Hero',
  };
}
