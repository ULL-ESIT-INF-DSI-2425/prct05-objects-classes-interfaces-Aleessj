export class Artist {
  public name: string;
  public monthly_listeners: number;
  public discography: Disco[];

  constructor(name: string, monthly_listeners: number, discography: Disco[]) {
    if (!Number.isInteger(monthly_listeners) || monthly_listeners < 0) throw new Error("Error. Los oyentes mensuales deben ser un número entero y positivo.");
    this.name = name;
    this.monthly_listeners = monthly_listeners;
    this.discography = discography;
  }
}

export class Disco {
  public name: string;
  public year: number;
  public songs: Song[];

  constructor(name: string, year: number, songs: Song[]) {
    if (!Number.isInteger(year) || (year < 1600 || year > 2025)) throw new Error("Error. El año debe ser un número entero y positivo y estar comprendido entre el 1600 y 2025.");
    this.name = name;
    this.year = year;
    this.songs = songs;
  }

  getNumberOfSongs(): number { return this.songs.length }
  getDiscoDuration(): number { return this.songs.reduce((total, song) => total + song.duration, 0); }
  getDiscoReproductions(): number { return this.songs.reduce((total, song) => total + song.reproductions, 0); }
}

export class Song {
  public name: string;
  public duration: number;
  public genders: string[];
  public single: boolean;
  public reproductions: number;

  constructor(name: string, duration: number, genders: string[], single: boolean, reproductions: number) {
    if (!Number.isInteger(reproductions) || reproductions < 0) throw new Error("Error. Las reproducciones han de ser un número positivo y entero.");
    this.name = name;
    this.duration = this.getDurationInSeconds(duration);
    this.genders = genders;
    this.single = single;
    this.reproductions = reproductions;
  }

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

export class MusicLibrary {
  private artists: Artist[];
  
  constructor() {this.artists = [] }

  addArtist(artist: Artist): void { this.artists.push(artist); }

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