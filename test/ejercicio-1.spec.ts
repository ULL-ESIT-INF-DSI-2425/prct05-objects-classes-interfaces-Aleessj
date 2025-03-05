import { describe, expect, test } from "vitest";
import { Pokemon, Pokedex, Combat } from "../src/ejercicio-1";

describe("Test para la clase Pokemon", () => {
  test("Existe la clase Pokemon", () => {
    expect(Pokemon).toBeDefined();
  });

  test("Definiendo objeto Pokemon", () => {
    const pokemon = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    expect(pokemon).toBeInstanceOf(Pokemon);
  });

  test("Debe lanzar un error si las estadísticas no son exactamente 3", () => {
    expect(() => new Pokemon("Pikachu", [30, 30], ["Eléctrico"], [45, 49])).toThrow("El Pokemon debe contener exactamente 3 estadísticas.");
  });

  test("Debe lanzar un error si una estadística no es un número entero positivo", () => {
    expect(() => new Pokemon("Pikachu", [30, 30], ["Eléctrico"], [45, -49, 30])).toThrow("Todas las estadísticas deben ser números enteros y positivos.");
  });

  test("Debe lanzar un error si el peso y la altura no son enteros positivos", () => {
    expect(() => new Pokemon("Pikachu", [30.5, 30], ["Eléctrico"], [45, 49, 30])).toThrow("Peso y altura deben ser números enteros y positivos.");
  });

  test("Debe lanzar un error si el tipo no es válido", () => {
    expect(() => new Pokemon("Pikachu", [30, 30], ["Fuego", "Dinosaurio"], [45, 49, 30])).toThrow("El tipo del Pokémon debe ser válido.");
  });

  test("Debe calcular correctamente la suma de estadísticas", () => {
    const pokemon = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    expect(pokemon.totalStats).toBe(143);
  });

  test("Debe permitir cambiar la salud del Pokémon con el setter", () => {
    const pokemon = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    pokemon.health = 20;
    expect(pokemon.Stats[0]).toBe(20);
  });
});

describe("Test para la clase Pokedex", () => {
  test("Existe la clase Pokedex", () => {
    expect(Pokedex).toBeDefined();
  });

  test("Definiendo objeto Pokemon", () => {
    const pokedex = new Pokedex();
    expect(pokedex).toBeInstanceOf(Pokedex);
  });

  test("Contiene un método addPokemon", () => {
    const pokedex = new Pokedex();
    expect(typeof pokedex.addPokemon).toBe("function");
  });

  test("Contiene un método searchByName", () => {
    const pokedex = new Pokedex();
    expect(typeof pokedex.searchByName).toBe("function");
  });

  test("Contiene un método searchByType", () => {
    const pokedex = new Pokedex();
    expect(typeof pokedex.searchByType).toBe("function");
  });

  test("Contiene un método searchByTotalStats", () => {
    const pokedex = new Pokedex();
    expect(typeof pokedex.searchByTotalStats).toBe("function");
  });

  test("Debe añadir un Pokémon correctamente", () => {
    const pokedex = new Pokedex();
    const pokemon = new Pokemon("Squirtle", [30, 30], ["Agua"], [44, 48, 65]);
    pokedex.addPokemon(pokemon);

    expect(pokedex.searchByName("Squirtle")).toContain(pokemon);
  });

  test("Debe buscar Pokémon por tipo", () => {
    const pokedex = new Pokedex();
    const charizard = new Pokemon("Charizard", [50, 60], ["Fuego", "Volador"], [78, 84, 78]);
    const bulbasaur = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);

    pokedex.addPokemon(charizard);
    pokedex.addPokemon(bulbasaur);

    expect(pokedex.searchByType(["Fuego"])).toContain(charizard);
    expect(pokedex.searchByType(["Planta"])).toContain(bulbasaur);
    expect(pokedex.searchByType(["Agua"])).toEqual([]);
  });

  test("Debe devolver undefined si la estadística total es inválida", () => {
    const pokedex = new Pokedex();
    expect(pokedex.searchByTotalStats(-1)).toBeUndefined();
  });

  test("Debe devolver los Pokémon con la misma estadística total", () => {
    const pokedex = new Pokedex();
    const charizard = new Pokemon("Charizard", [50, 60], ["Fuego", "Volador"], [78, 84, 78]);
    const dragonite = new Pokemon("Dragonite", [100, 120], ["Dragón", "Volador"], [78, 84, 78]);

    pokedex.addPokemon(charizard);
    pokedex.addPokemon(dragonite);

    expect(pokedex.searchByTotalStats(240)).toEqual([charizard, dragonite]);
  });
});

describe("Test para la clase Combat", () => {
  test("Existe la clase Combat", () => {
    expect(Combat).toBeDefined();
  });

  test("Definiendo objeto Combat", () => {
    const pokemon = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    const pokemon2 = new Pokemon("Charmander", [30, 30], ["Fuego"], [39, 52, 43]);
    const combat = new Combat(pokemon, pokemon2);

    expect(combat).toBeInstanceOf(Combat);
  });

  test("Contiene un método start", () => {
    const pokemon = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    const pokemon2 = new Pokemon("Charmander", [30, 30], ["Fuego"], [39, 52, 43]);
    const combat = new Combat(pokemon, pokemon2);

    expect(typeof combat.start).toBe("function");
  });

  test("Contiene un método privado calculateEffectiveness", () => {
    const pokemon = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    const pokemon2 = new Pokemon("Charmander", [30, 30], ["Fuego"], [39, 52, 43]);
    const combat = new Combat(pokemon, pokemon2);
    const privateMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(combat));
  
    expect(privateMethods.includes("calculateEffectiveness")).toBe(true);
  });

  test("Debe calcular correctamente la efectividad", () => {
    const pokemon1 = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    const pokemon2 = new Pokemon("Charmander", [30, 30], ["Fuego"], [39, 52, 43]);
    const combat = new Combat(pokemon1, pokemon2);

    expect(combat["calculateEffectiveness"](pokemon1.pokemon_type, pokemon2.pokemon_type)).toBeGreaterThan(0);
    expect(combat["calculateEffectiveness"](pokemon2.pokemon_type, pokemon1.pokemon_type)).toBeGreaterThan(0);
  });

  test("Debe ejecutar el combate sin errores", () => {
    const pokemon1 = new Pokemon("Bulbasaur", [30, 30], ["Planta"], [45, 49, 49]);
    const pokemon2 = new Pokemon("Charmander", [30, 30], ["Fuego"], [39, 52, 43]);
    const combat = new Combat(pokemon1, pokemon2);

    expect(() => combat.start()).not.toThrow();
  });

  test("Debe determinar correctamente al ganador", () => {
    const pokemon1 = new Pokemon("Magikarp", [20, 20], ["Agua"], [20, 10, 55]);
    const pokemon2 = new Pokemon("Pikachu", [30, 30], ["Eléctrico"], [35, 55, 40]);

    const combat = new Combat(pokemon1, pokemon2);
    combat.start();

    expect(pokemon1.Stats[0]).toBe(0); // Magikarp pierde
    expect(pokemon2.Stats[0]).toBeGreaterThan(0); // Pikachu gana
  });
});