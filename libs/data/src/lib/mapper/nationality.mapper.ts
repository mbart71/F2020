const mapper = new Map<string, string>(
  [
    ['France', 'French']
  ]
);

export const map = (nation: string): string | undefined => mapper.get(nation);
