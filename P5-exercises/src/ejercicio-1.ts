const VALID_TYPES: string[] = [
  "Acero", "Agua", "Bicho", "Dragón", "Eléctrico", "Fantasma", "Fuego", "Hada", "Hielo", 
  "Lucha", "Normal", "Planta", "Psíquico", "Roca", "Siniestro", "Tierra", "Veneno", "Volador"
]

const TYPE_EFFECTIVENESS = new Map<string, Map<string, number>>([
  ["Acero", new Map([["Hielo", 2], ["Roca", 2], ["Hada", 2], ["Acero", 0.5], ["Fuego", 0.5], ["Eléctrico", 0.5], ["Agua", 0.5]])],
  ["Agua", new Map([["Fuego", 2], ["Tierra", 2], ["Roca", 2], ["Agua", 0.5], ["Planta", 0.5], ["Dragón", 0.5]])],
  ["Bicho", new Map([["Planta", 2], ["Psiquico", 2], ["Siniestro", 2], ["Volador", 0.5], ["Fuego", 0.5], ["Lucha", 0.5], ["Hada", 0.5], ["Veneno", 0.5], ["Fantasma", 0.5], ["Acero", 0.5]])],
  ["Dragón", new Map([["Dragón", 2], ["Acero", 0.5]])],
  ["Eléctrico", new Map([["Volador", 2], ["Agua", 2], ["Planta", 0.5], ["Eléctrico", 0.5], ["Dragón", 0.5]])],
  ["Fantasma", new Map([["Psiquico", 2], ["Fantasma", 2], ["Siniestro", 0.5]])],
  ["Dragón", new Map([["Dragón", 2], ["Acero", 0.5]])],
  ["Fuego", new Map([["Planta", 2], ["Hielo", 2], ["Bicho", 2], ["Acero", 2], ["Agua", 0.5], ["Fuego", 0.5], ["Roca", 0.5], ["Dragón", 0.5]])],
  ["Hada", new Map([["Roca", 2], ["Dragón", 2], ["Siniestro", 2], ["Fuego", 0.5], ["Veneno", 0.5], ["Acero", 0.5]])],
  ["Hielo", new Map([["Volador", 2], ["Planta", 2], ["Tierra", 2], ["Dragón", 2], ["Hielo", 0.5], ["Agua", 0.5], ["Fuego", 0.5], ["Acero", 0.5]])],
  ["Lucha", new Map([["Hielo", 2], ["Normal", 2], ["Roca", 2], ["Siniestro", 2], ["Acero", 2], ["Volador", 0.5], ["Bicho", 0.5], ["Hada", 0.5], ["Psiquico", 0.5], ["Veneno", 0.5]])],
  ["Normal", new Map([["Roca", 0.5], ["Acero", 0.5]])],
  ["Planta", new Map([["Agua", 2], ["Roca", 2], ["Tierra", 2], ["Volador", 0.5], ["Planta", 0.5], ["Bicho", 0.5], ["Fuego", 0.5], ["Dragón", 0.5], ["Veneno", 0.5], ["Acero", 0.5]])],
  ["Psiquico", new Map([["Lucha", 2], ["Veneno", 2], ["Hada", 0.5], ["Acero", 0.5]])],
  ["Roca", new Map([["Hielo", 2], ["Volador", 2], ["Bicho", 2], ["Fuego", 2], ["Tierra", 0.5], ["Lucha", 0.5], ["Acero", 0.5]])],
  ["Siniestro", new Map([["Psiquico", 2], ["Fantasma", 2], ["Hada", 0.5], ["Lucha", 0.5], ["Siniestro", 0.5]])],
  ["Tierra", new Map([["Eléctrico", 2], ["Roca", 2], ["Fuego", 2], ["Veneno", 2], ["Acero", 2], ["Bicho", 0.5], ["Planta", 0.5]])],
  ["Veneno", new Map([["Planta", 2], ["Hada", 2], ["Roca", 0.5], ["Tierra", 0.5], ["Veneno", 0.5], ["Fantasma", 0.5]])],
  ["Volador", new Map([["Planta", 2], ["Bicho", 2], ["Lucha", 2], ["Eléctrico", 0.5], ["Roca", 0.5], ["Acero", 0.5]])]
]);

export class Pokemon {
  public name: string;
  private _weight_and_height: [number, number];
  public pokemon_type: [string, string?];
  private _total_stats: number;
  private _stats: number[];

  constructor(name: string, weight_and_height: [number, number], pokemon_type: [string, string?], stats: number[]) {
    if (stats.length !== 3) throw new Error("El Pokemon debe contener exactamente 3 estadísticas.");
    if (!stats.every(stat => Number.isInteger(stat) && stat > 0)) throw new Error("Todas las estadísticas deben ser números enteros y positivos.");
    if (!Number.isInteger(weight_and_height[0]) || weight_and_height[0] <= 0 || !Number.isInteger(weight_and_height[1]) || weight_and_height[1] <= 0) {
      throw new Error("Peso y altura deben ser números enteros y positivos.");
    }

    if (!VALID_TYPES.includes(pokemon_type[0]) || (pokemon_type[1] && !VALID_TYPES.includes(pokemon_type[1]))) throw new Error("El tipo del Pokémon debe ser válido.");
    this.name = name;
    this._weight_and_height = weight_and_height;
    this.pokemon_type = pokemon_type;
    this._stats = stats;
    this._total_stats = stats.reduce((sum, stat) => sum + stat, 0);
  }

  get weightAndHeight(): [number, number] { return this._weight_and_height; }
  get Stats(): number[] { return [...this._stats]; }
  set health(value: number) { this._stats[0] = value; }
  get totalStats(): number { return this._total_stats; }
}

export class Pokedex {
  private pokemons: Pokemon[];

  constructor() { this.pokemons = []; }

  addPokemon(pokemon: Pokemon): void { this.pokemons.push(pokemon); }
  searchByType(types: string[]): Pokemon[] { return this.pokemons.filter(pokemon => types.every(type => pokemon.pokemon_type.includes(type))); }
  searchByName(name: string) : Pokemon[] { return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase())); }

  searchByTotalStats(num: number): Pokemon[] | undefined {
    if (!Number.isInteger(num) || num < 0) return undefined;
    return this.pokemons.filter(pokemon => pokemon.totalStats === num);
  }
}

export class Combat {
  public opponent: Pokemon;
  public other_opponent: Pokemon;

  constructor(pokemon1: Pokemon, pokemon2: Pokemon) {
    this.opponent = pokemon1;
    this.other_opponent = pokemon2;
  }

  start(): void {
    console.log(`Los Pokémon ${this.opponent.name} y ${this.other_opponent.name} entran en combate`);
    console.log(`${this.opponent.name} atacará primero`);
    
    let effectiveness_1: number = this.calculateEffectiveness(this.opponent.pokemon_type, this.other_opponent.pokemon_type);
    let effectiveness_2: number = this.calculateEffectiveness(this.other_opponent.pokemon_type, this.opponent.pokemon_type);
    let damage_1: number = 0, damage_2: number = 0;

    while (this.opponent.Stats[0] > 0 && this.other_opponent.Stats[0] > 0) {
      damage_1 = Math.round(50 * (this.opponent.Stats[1] / this.other_opponent.Stats[2]) * effectiveness_1);
      this.other_opponent.health = this.other_opponent.Stats[0] - damage_1;

      if (this.other_opponent.Stats[0] < 0) this.other_opponent.health = 0;
      

      console.log(`El ataque de ${this.opponent.name} le hizo ${damage_1} de daño al rival. Le quedan ${this.other_opponent.Stats[0]} HP.`);

      if (this.other_opponent.Stats[0] === 0) break;

      damage_2 = Math.round(50 * (this.other_opponent.Stats[1] / this.opponent.Stats[2]) * effectiveness_2);
      this.opponent.health = this.opponent.Stats[0] - damage_2;

      if (this.opponent.Stats[0] <= 0) this.opponent.health = 0;

      console.log(`El ataque de ${this.other_opponent.name} le hizo ${damage_2} de daño al rival. Le quedan ${this.opponent.Stats[0]} HP.`);

      if (this.opponent.Stats[0] === 0) break;
    }

    if (this.opponent.Stats[0] === 0)  console.log(`El Pokemon ${this.opponent.name} está fuera de combate.`);
    else console.log(`El Pokemon ${this.other_opponent.name} está fuera de combate.`);
  }

  private calculateEffectiveness(attacker: [string, string?], defender: [string, string?]): number {
    let effectiveness: number = 1;

    attacker.forEach((type) => {
      if (type && TYPE_EFFECTIVENESS.has(type)) effectiveness *= TYPE_EFFECTIVENESS.get(type).get(defender[0]) ?? 1;
      if (defender[1]) effectiveness *= TYPE_EFFECTIVENESS.get(type).get(defender[1]) ?? 1;
    });

    return Math.round(effectiveness);
  }
}

//let pk1 = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
//let pk2 = new Pokemon("Charmander", [30, 30], ["Fuego"], [39, 52, 43]);

//let pokedex = new Pokedex();
//pokedex.addPokemon(pk1);

//let combat = new Combat(pk1, pk2);
//combat.start();