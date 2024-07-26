class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  cloneCar() {
    return Object.create(Object.getPrototypeOf(this));
  }
}

export default Car;
