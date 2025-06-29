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

export function mockHeroes(): Hero[] {
  return [
    { id: 1, name: 'Windstorm' },
    { id: 12, name: 'Dr. Nice' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr. IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
  ];
}
