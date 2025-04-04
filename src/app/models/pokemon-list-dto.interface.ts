export interface PokemonDetailsDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  other?: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonListDto {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonLink[];
}

export interface PokemonLink {
  name: string;
  url: string;
}
