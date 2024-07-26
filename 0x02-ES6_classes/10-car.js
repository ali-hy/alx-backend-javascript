class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  cloneCar() {
    const symbolKeys = Object.getOwnPropertySymbols(this);
    const clonedCar = new Car();

    for (const key of symbolKeys) {
      clonedCar[key] = this[key];
    }

    return clonedCar;
  }
}

export default Car;
