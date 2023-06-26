"use strict";
class Bike {
    constructor(name = " ") {
        this.license = name;
    }
}
class Car {
    constructor(name = " ") {
        this.license = name;
    }
}
class Van {
    constructor(name = " ") {
        this.license = name;
    }
}
class ParkingLot {
    constructor(size) {
        this.allSize = "1".repeat(size);
        this.allVehicle = [];
    }
    park(vehicle) {
        let sz = this.getSizeCar(vehicle);
        let reg = new RegExp(`1{${sz}}`);
        let free = reg.test(this.allSize);
        if (free) {
            let newAllSize = this.allSize.replace(reg, "0".repeat(sz));
            this.allSize = newAllSize;
            this.allVehicle.push(vehicle);
            console.log(this.allSize);
        }
        return free;
    }
    retrieve(license) {
        let res = this.allVehicle.find(v => v.license === license);
        return res !== undefined;
    }
    getSizeCar(vehicle) {
        switch (vehicle.constructor.name) {
            case "Bike":
                return 1;
            case "Car":
                return 2;
            case "Van":
                return 3;
            default:
                return 0;
        }
    }
}
let bike1 = new Bike("B1");
let car1 = new Car("C1");
let van1 = new Van("V1");
let test = new ParkingLot(6);
console.log(test);
console.log(test.park(bike1), test.park(car1), test.park(van1));
