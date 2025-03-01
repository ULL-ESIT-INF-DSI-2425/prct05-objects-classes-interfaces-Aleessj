import { describe, expect, test } from "vitest";
import { Artist, Disco, Song, MusicLibrary } from "../src/ejercicio-2";

describe("Test para la clase Artist", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);
  const song2 = new Song("Freedom", 3.02, ["J-pop", "J-Rock"], true, 9600000);

  const album = new Disco("Kyougen", 2022, [song, song2]);
  const artist = new Artist("Ado", 7018780, [album]);

  test("Existe la clase Artist", () => {
    expect(Artist).toBeDefined();
  });

  test("Definiendo objeto Artist", () => {
    expect(artist).toBeInstanceOf(Artist);
  });

  test("Debe almacenar correctamente el nombre del artista", () => {
    expect(artist.name).toBe("Ado");
  });

  test("Debe almacenar correctamente el número de oyentes mensuales", () => {
    expect(artist.monthly_listeners).toBe(7018780);
  });

  test("Debe almacenar correctamente la discografía", () => {
    expect(artist.discography).toHaveLength(1);
    expect(artist.discography[0].name).toBe("Kyougen");
  });

  test("Debe lanzar un error si los oyentes mensuales son negativos.", () => {
    expect(() => new Artist("Ado", -1, [album])).toThrow("Error. Los oyentes mensuales deben ser un número entero y positivo.");
  });

  test("Debe lanzar un error si los oyentes mensuales no son enteros.", () => {
    expect(() => new Artist("Ado", 300.33, [album])).toThrow("Error. Los oyentes mensuales deben ser un número entero y positivo.");
  });

  test("Debe permitir la creación de un artista sin discos", () => {
    const newArtist = new Artist("New Artist", 5000000, []);
    expect(newArtist.discography).toEqual([]);
  });
});

describe("Test para la clase Disco", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);
  const song2 = new Song("Freedom", 3.02, ["J-pop", "J-Rock"], true, 9600000);
  const album = new Disco("Kyougen", 2022, [song, song2]);

  test("Existe la clase Disco", () => {
    expect(Disco).toBeDefined();
  });

  test("Debe poder instanciar un objeto Disco", () => {
    expect(album).toBeInstanceOf(Disco);
  });

  test("Debe almacenar correctamente el nombre del disco", () => {
    expect(album.name).toBe("Kyougen");
  });

  test("Debe almacenar correctamente el año del disco", () => {
    expect(album.year).toBe(2022);
  });

  test("Debe almacenar correctamente las canciones del disco", () => {
    expect(album.songs).toHaveLength(2);
    expect(album.songs[0].name).toBe("Usseewa");
  });

  test("Debe lanzar un error si el año del disco no está entre 1600 y 2025", () => {
    expect(() => new Disco("Antiguo", 1500, [song])).toThrow("Error. El año debe ser un número entero y positivo y estar comprendido entre el 1600 y 2025.");
  });

  test("Debe calcular correctamente la cantidad de canciones en el disco", () => {
    expect(album.getNumberOfSongs()).toBe(2);
  });

  test("Debe calcular correctamente la duración total del disco", () => {
    expect(album.getDiscoDuration()).toBe(207 + 182); // 3:27 + 3:02 en segundos
  });

  test("Debe calcular correctamente la cantidad total de reproducciones", () => {
    expect(album.getDiscoReproductions()).toBe(518000000 + 9600000);
  });
});

describe("Test para la clase Song", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);

  test("Existe la clase Song", () => {
    expect(Song).toBeDefined();
  });

  test("Debe poder instanciar un objeto Song", () => {
    expect(song).toBeInstanceOf(Song);
  });

  test("Debe almacenar correctamente el nombre de la canción", () => {
    expect(song.name).toBe("Usseewa");
  });

  test("Debe almacenar correctamente la duración en segundos", () => {
    expect(song.duration).toBe(207); // 3:27 en segundos
  });

  test("Debe almacenar correctamente los géneros", () => {
    expect(song.genders).toContain("J-pop");
    expect(song.genders).toContain("J-Rock");
  });

  test("Debe indicar correctamente si es un single", () => {
    expect(song.single).toBe(true);
  });

  test("Debe almacenar correctamente la cantidad de reproducciones", () => {
    expect(song.reproductions).toBe(518000000);
  });

  test("Debe lanzar un error si las reproducciones no son enteras y positivas", () => {
    expect(() => new Song("Test", 3.50, ["Pop"], false, -1)).toThrow("Error. Las reproducciones han de ser un número positivo y entero.");
  });

  test("Debe calcular correctamente la duración en segundos", () => {
    const songTest = new Song("Test", 2.45, ["Pop"], false, 100);
    expect(songTest.duration).toBe(165); // 2:45 en segundos
  });
});

describe("Test para la clase MusicLibrary", () => {
  const library = new MusicLibrary();  

  const song = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);
  const album = new Disco("Kyougen", 2022, [song]);
  const artist = new Artist("Ado", 7018780, [album]);

  test("Existe la clase MusicLibrary", () => {
    expect(MusicLibrary).toBeDefined();
  });

  test("Debe poder instanciar un objeto MusicLibrary", () => {
    expect(library).toBeInstanceOf(MusicLibrary);
  });

  test("Debe permitir agregar artistas a la biblioteca", () => {
    const tempLibrary = new MusicLibrary(); // Biblioteca vacía para este test
    tempLibrary.addArtist(artist);
    expect(tempLibrary["artists"]).toHaveLength(1);
  });

  test("Debe permitir buscar un artista por nombre", () => {
    const tempLibrary = new MusicLibrary();
    tempLibrary.addArtist(artist);
    expect(() => tempLibrary.searchArtistByName("Ado")).not.toThrow();
  });

  test("Debe lanzar un error si el artista no se encuentra", () => {
    const tempLibrary = new MusicLibrary();
    expect(() => tempLibrary.searchArtistByName("Desconocido")).toThrow("No se encontró ningún artista cuyo nombre es Desconocido");
  });

  test("Debe permitir buscar un disco por nombre", () => {
    const tempLibrary = new MusicLibrary();
    tempLibrary.addArtist(artist);
    expect(() => tempLibrary.searchDiscoByName("Kyougen")).not.toThrow();
  });

  test("Debe lanzar un error si el disco no se encuentra", () => {
    const tempLibrary = new MusicLibrary();
    expect(() => tempLibrary.searchDiscoByName("No existe")).toThrow("No se encontró ningún disco cuyo nombre es No existe");
  });

  test("Debe permitir buscar una canción por nombre", () => {
    const tempLibrary = new MusicLibrary();
    tempLibrary.addArtist(artist);
    expect(() => tempLibrary.searchSongByName("Usseewa")).not.toThrow();
  });
});