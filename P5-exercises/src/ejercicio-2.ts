/**
 * Representa un artista musical.
 */
export class Artist {
  public name: string;               // Atributo de nombre del artista
  public monthly_listeners: number;  // Atributo de oyentes mensuales
  public discography: Disco[];       // Atributo de discografía del artista

  /**
   * Crea un nuevo artista.
   * @param name - Nombre del artista.
   * @param monthly_listeners - Número de oyentes mensuales.
   * @param discography - Lista de discos del artista.
   * @throws - Error si el número de oyentes no es válido.
   */
  constructor(name: string, monthly_listeners: number, discography: Disco[]) {
    if (!Number.isInteger(monthly_listeners) || monthly_listeners < 0) throw new Error("Error. Los oyentes mensuales deben ser un número entero y positivo.");
    this.name = name;
    this.monthly_listeners = monthly_listeners;
    this.discography = discography;
  }
}

/**
 * Representa un disco de un artista.
 */
export class Disco {
  public name: string;   // Atributo de nombre del disco
  public year: number;   // Atributo de año de salida
  public songs: Song[];  // Atributo de lista de canciones

  /**
   * Crea un nuevo disco.
   * @param name - Nombre del disco.
   * @param year - Año de lanzamiento.
   * @param songs - Lista de canciones del disco.
   * @throws - Error si el año no es válido.
   */
  constructor(name: string, year: number, songs: Song[]) {
    if (!Number.isInteger(year) || (year < 1600 || year > 2025)) throw new Error("Error. El año debe ser un número entero y positivo y estar comprendido entre el 1600 y 2025.");
    this.name = name;
    this.year = year;
    this.songs = songs;
  }
  /**
   * Obtiene el número total de canciones en el disco.
   * @returns - Número de canciones en el disco.
   */
  getNumberOfSongs(): number { return this.songs.length }

  /**
   * Obtiene la duración total del disco en segundos.
   * @returns - Duración total del disco en segundos.
   */
  getDiscoDuration(): number { return this.songs.reduce((total, song) => total + song.duration, 0); }

  /**
   * Obtiene el número total de reproducciones del disco.
   * @returns -  Número total de reproducciones de todas las canciones del disco.
   */
  getDiscoReproductions(): number { return this.songs.reduce((total, song) => total + song.reproductions, 0); }
}

/**
 * Representa una canción dentro de un disco.
 */
export class Song {
  public name: string;              // Atributo de nombre de la canción
  public duration: number;          // Atributo de duración de la canción
  public genders: string[];         // Atributo de genero del tema
  public single: boolean;           // Atributo que indica si fue sacado como single o no
  public reproductions: number;     // Atributo de reproducciones de la canción


  /**
   * Crea una nueva canción.
   * @param name - Nombre de la canción.
   * @param duration - Duración de la canción en segundos o minutos con decimales.
   * @param genders - Géneros musicales de la canción.
   * @param single - Indica si es un sencillo.
   * @param reproductions - Número de reproducciones de la canción.
   * @throws - Error si las reproducciones no son un número válido.
   */
  constructor(name: string, duration: number, genders: string[], single: boolean, reproductions: number) {
    if (!Number.isInteger(reproductions) || reproductions < 0) throw new Error("Error. Las reproducciones han de ser un número positivo y entero.");
    this.name = name;
    this.duration = this.getDurationInSeconds(duration);
    this.genders = genders;
    this.single = single;
    this.reproductions = reproductions;
  }

  /**
   * Convierte la duración de minutos con decimales a segundos.
   * @param duration - Duración de la canción en minutos o segundos.
   * @returns - Duración en segundos.
   */
  private getDurationInSeconds(duration: number): number {
    if (!Number.isInteger(duration)) {
      let aux: string = duration.toString();
      let parts: string[] = aux.split(".");

      if (parts.length === 2) {
        let min = parseInt(parts[0], 10);
        let sec = parseInt(parts[1], 10);

        return min * 60 + sec;
      }
    }
    return duration;
  }
}


/**
 * Representa una biblioteca musical que almacena información de artistas y discos.
 */
export class MusicLibrary {
  private artists: Artist[];  // Atributo de listado de artistas de la biblioteca.
  
  // Constructor que inicializa el listado de artistas vacío.
  constructor() {this.artists = [] }

  /**
   * Agrega un artista a la biblioteca.
   * @param artist - Artista a agregar.
   */
  addArtist(artist: Artist): void { this.artists.push(artist); }

  /**
   * Muestra la biblioteca musical en formato tabla en la consola.
   */
  showLibrary(): void {
    console.log("Music Library:");
    const artistTable = this.artists.map(artist => ({
      Artist: artist.name,
      "Monthly Listeners": artist.monthly_listeners,
      "Number of Albums": artist.discography.length
    }));
    console.table(artistTable);

    this.artists.forEach((artist) => {
      console.table(artist.discography.map(disco => ({
      Disco: disco.name,
      Year: disco.year,
      "Number of songs": disco.getNumberOfSongs(),
      Duration: disco.getDiscoDuration() + "s",
      Reproductions: disco.getDiscoReproductions()
    })));

    artist.discography.forEach(disco => {
      console.log(`Songs in '${disco.name}':`);
      console.table(disco.songs.map(song => ({
        Song: song.name,
        Durtion: song.duration + "s",
        Genders: song.genders.join(", "),
        Single: song.single ? "Sí" : "No",
        Reproductions: song.reproductions
      })));
    });
    console.log("\n");
    });
  }

  /**
   * Busca un artista por su nombre.
   * @param name - Nombre del artista a buscar.
   */
  searchArtistByName(name: string): void {
    let found_artist: Artist[] = this.artists.filter(artist => artist.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    if (found_artist.length === 0) throw new Error(`No se encontró ningún artista cuyo nombre es ${name}`);

    console.log("Artistas encontrados:");
    console.table(found_artist.map(artist => ({
      Name: artist.name,
      "Monthly Listeners": artist.monthly_listeners,
      "Number of Albums:": artist.discography.length
    })));
  } 

  /**
   * Busca una canción por su nombre en toda la biblioteca.
   * @param name - Nombre de la canción a buscar.
   */
  searchSongByName(name: string): void {
    let found_songs: Song[] = [];

    this.artists.forEach(artist => {
      artist.discography.forEach(disco => {
        disco.songs.forEach(song => {
          if (song.name.toLowerCase().includes(name.toLowerCase())) found_songs.push(song); 
        });
      });
    });

    if (found_songs.length === 0) throw new Error(`No se encontró ninguna canción cuyo nombre es ${name}`);
    console.log("Canciones encontradas:");
    console.table(found_songs.map(song => ({
      Name: song.name,
      Duration: song.duration + "s",
      Genders: song.genders.join(", "),
      Single: song.single ? "Yes" : "No",
      Reproductions: song.reproductions
    })));
  }

  /**
   * Busca un disco por su nombre en toda la biblioteca.
   * @param name - Nombre del disco a buscar.
   */
  searchDiscoByName(name: string) {
    let found_discos: Disco[] = [];

    this.artists.forEach(artist => {
      artist.discography.forEach(disco => {
        if (disco.name.toLowerCase().includes(name.toLowerCase())) found_discos.push(disco);
      });
    });

    if (found_discos.length === 0) throw new Error(`No se encontró ningún disco cuyo nombre es ${name}`);
    console.log("Discos encontrados:");
    console.table(found_discos.map(disco => ({
      Name: disco.name,
      Year: disco.year,
      "Number of songs": disco.getNumberOfSongs(),
      Duration: disco.getDiscoDuration() + "s",
      Reproductions: disco.getDiscoReproductions()
    })));
  }
}

//const song = new Song("Gyakko", 3.58, ["J-pop", "J-Rock"], false, 224000000);
//const song2 = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);
//const song3 = new Song("Freedom", 3.02, ["J-pop", "J-Rock"], true, 9600000);

//const album = new Disco("Kyougen", 2022, [song2, song3]);

//const artist = new Artist("Ado", 7018780, [album]);

//const library = new MusicLibrary()
//library.addArtist(artist);

//library.showLibrary();