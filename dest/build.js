"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*const a: string[] = ["b", "c"];
const b: string[] = ["d", "e"];
const c: string[] = ["f", "g"];
const d: string[] = ["h", "i"];
const e: string[] = ["j", "k"];
const f: string[] = ["l", "m"];
const g: string[] = ["n", "o"];*/
const data = {
    a: ["b", "c", "p"],
    b: ["d", "e", "q"],
    c: ["f", "g"],
    d: ["h", "i"],
    e: ["j", "k"],
    f: ["l", "m"],
    g: ["n", "o"],
};
// a => m  a,c,f,m
function another(str, base) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        return base[str];
    });
}
function getPath({ from, to, data, func }) {
    return __awaiter(this, void 0, void 0, function* () {
        //создаем очередь с началом пути внутри
        let queue = [from];
        //создаем объект пройденного пути
        let passedPath = {};
        let isFindEnd = undefined;
        while (queue.length > 0) {
            //выходим из цикла если закончилась
            if (queue.length === 0)
                break;
            //получаем первый город из очереди
            let firstInQueue = queue.shift();
            //получаем первый набор городов из базы
            let cities = yield func(firstInQueue, data);
            // проверяем на конечный путь каждый город в массиве
            isFindEnd = cities === null || cities === void 0 ? void 0 : cities.find(city => {
                if (firstInQueue !== undefined) {
                    //закидываем в пройденный путь контрольную точку
                    passedPath[firstInQueue] = passedPath[firstInQueue]
                        ? passedPath[firstInQueue] + "," + city
                        : city;
                    //закидываем в очередь город
                    queue.push(city);
                }
                // возвращаем результат проверки
                return city.localeCompare(to) === 0;
            });
            //выходим из цикла если нашли конечную точку
            if (isFindEnd) {
                break;
            }
        }
        if (isFindEnd) {
            //в результат помещаем конечную точку
            let result = [to];
            let currentPoint = to;
            while (currentPoint !== from) {
                //функция ищет какой ключ в passedPath содержит currentPoint и возвращает его
                //перезаписываем найденным ключом currentPoint
                currentPoint = searchPoint(passedPath, currentPoint);
                //найденный ключ закидываем начало результата
                result.unshift(currentPoint);
            }
            return result;
        }
        else
            return "нет пути";
    });
}
/*
getPath({from: "a", to: "o", data, func: another})
    .then(e => console.log(e))
*/
/*
a:  "bcp"
b:  "deq"
c:  "fg"
d:  "hi"
e:  "jk"
f:  "lm"
*/
// @ts-ignore
function searchPoint(path, point) {
    let reg = new RegExp(`\\b${point}\\b`);
    for (let key in path) {
        if (reg.test(path[key])) {
            return key;
        }
    }
}
