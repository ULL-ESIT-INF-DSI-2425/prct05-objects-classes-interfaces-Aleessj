/**
 * Clase abstracta CommonStats que implementa caracteristicas comune de coche y motos.
 */
export abstract class CommonStats {
  // Constructor
  constructor(private _plate: string, private _brand: string, private _model: string, private _cc: number, private _power: number) {}
  
  // Setters
  set plate(plate: string) { this._plate = plate; }
  set brand(brand: string) { this._brand = brand; }
  set model(model: string) { this._model = model; }
  set cc(cc: number) { this._cc = cc; }
  set power(power: number) { this._power = power; }

  // Getters
  get plate() { return this._plate; }
  get brand() { return this._brand; }
  get model() { return this._model; }
  get cc() { return this._cc; }
  get power() {return this._power; }

  /**
   * Método abstracto getData() a implementar por clases hijas.
   */
  abstract getData(): string;
}

/**
 * Clase Coche que hereda de CommonsStats y además contiene otros atributos.
 */
export class Car extends CommonStats {
  /**
   * 
   * @param plate - Matricula del coche
   * @param brand - Marca del coche
   * @param model - Modelo del coche
   * @param cc - Cilindrada del coche
   * @param power - Potencia del coche
   * @param _doors - Numero de puertas
   * @param _convertible - Es descapotable?
   */
  constructor(plate: string, brand: string, model: string, cc: number, power: number, private _doors: number, private _convertible: boolean) { super(plate, brand, model, cc, power); }

  // Setters
  set doors(doors: number) { this._doors = doors; }
  set convertible(convertible: boolean) { this._convertible = convertible; }

  // Getters
  get doors() { return this._doors; }
  get convertible() { return this._convertible; }

  /**
   * Funcion que muestra los datos del coche
   * @returns - string con los datos del coche
   */
  getData(): string {
    let data: string = "";
    data += `Este coche es un ${this.brand} ${this.model}, con matrícula ${this.plate}, de ${this.doors} puertas, una cilindrada de ${this.cc} cc `;
    data += `y una potencia de ${this.power} W. Además descapotable es ${this.convertible}`;
    return data;
  }
}

export class Moto extends CommonStats {
  /**
   * 
   * @param plate - Matricula de la moto
   * @param brand - Marca de la moto
   * @param model - Modelo de la moto
   * @param cc - Cilindrada de la moto
   * @param power - Potencia de la moto
   * @param _package - Tiene paquete?
   */
  constructor(plate: string, brand: string, model: string, cc: number, power: number, private _package: boolean) { 
    super(plate, brand, model, cc, power); 
  }
  // Getter y Setter
  set package(pack: boolean) { this._package = pack; }
  get package() { return this._package; }

  /**
   * Funcion que muestra los datos de la moto
   * @returns - string con los datos de la moto
   */
  getData(): string {
    let data: string = "";
    data += `Esta moto es una ${this.brand} ${this.model}, con matrícula ${this.plate}, una cilindrada de ${this.cc} cc `;
    data += `y una potencia de ${this.power} W. Además el paquete es ${this.package}`;
    return data;
  }
}