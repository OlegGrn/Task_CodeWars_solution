"use strict";

class MyClock {
    static test = null

    constructor({template}) {
        this.template = template;
    }

    start() {
        this.rend();
        this.timer = setInterval(() => this.rend(), 1000)
    }

    stop() {
        clearInterval(this.timer)
    }

    rend() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours += "0";

        let mins = date.getMinutes();
        if (mins < 10) mins += "0";

        let sec = date.getSeconds();
        if (sec < 10) sec += "0";

        let out = this.template
            .replace(/h/, hours)
            .replace(/m/, mins)
            .replace(/s/, sec)

        console.log(out)
    }
}

class ExtendedClock extends MyClock {

    constructor(props) {
        super(props);
        let {precision = 1000} = props;
        this.precision = precision;

    }

    start() {
        this.rend();
        this.timer = setInterval(() => this.rend(), this.precision)
    }
}


let tes = new ExtendedClock({template: 'h:m:s', precision: 2000});


/*tes.start();
setTimeout(() => tes.stop(), 6000)*/

class Rabbit extends Object {
    constructor(name) {
        super()
        this.name = name;
    }
}

let rabbit = new Rabbit("Кроль");



