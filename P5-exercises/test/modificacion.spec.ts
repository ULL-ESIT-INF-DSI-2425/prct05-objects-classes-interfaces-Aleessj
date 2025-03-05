import { describe, expect, test } from "vitest";
import { CommonStats, Car, Moto } from "../src/modificacion";

describe("Test para la clase CommonStats", () => {
  test("Existe la clase CommonStats", () => {
    expect(CommonStats).toBeDefined();
  });

  test("Existe la clase Car", () => {
    expect(Car).toBeDefined();
  });

  test("Existe la clase Moto", () => {
    expect(Moto).toBeDefined();
  });

  test("Definiendo objeto Car", () => {
    const car = new Car("5866ABC", "Volkswagen", "Polo", 300, 4000, 2, false);
    expect(car).toBeInstanceOf(Car);
  });

  test("Definiendo objeto Moto", () => {
    const moto = new Moto("5866ABC", "Kawasaki", "Z1000", 300, 1500, false);
    expect(moto).toBeInstanceOf(Moto); // typeof
  });

  test("Probando funcion getData()", () => {
    const moto = new Moto("5866ABC", "Kawasaki", "Z1000", 300, 1500, false);
    const str = `Esta moto es una Kawasaki Z1000, con matrícula 5866ABC, una cilindrada de 300 cc y una potencia de 1500 W. Además el paquete es false`;
    expect(moto.getData()).toBe(str); // typeof
  });

  test("Probando funcion getData()", () => {
    const car = new Car("5866ABC", "Volkswagen", "Polo", 300, 4000, 2, false);
    const str = `Este coche es un Volkswagen Polo, con matrícula 5866ABC, de 2 puertas, una cilindrada de 300 cc y una potencia de 4000 W. Además descapotable es false`;
    expect(car.getData()).toBe(str); // typeof
  });
});