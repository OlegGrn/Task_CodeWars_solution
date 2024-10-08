//*
//? Вариант 1 МОЙ

//? Вариант 2 НЕ мой

//*Кукушка выскакивает из часов с кукушкой и бьет один раз в четверть часа, полчаса и три четверти часа.
// В начале каждого часа (1-12) она отбивает час. Зная текущее время и число n ,
// определите время, когда кукушка отбила n   раз.//
// Входные параметры:
// initial_time — строка в формате «ЧЧ:ММ», где 1 ≤ ЧЧ ≤ 12 и 0 ≤ ММ ≤ 59, с ведущими нулями, если необходимо.
// n — целое число, представляющее целевое количество звонков, при этом 1 <= n <= 200.
//
// Возвращаемое значение: время, когда кукушка прокуковала n   раз — строка в том же формате, что и initial_time.
//
// Если кукушка кукует в initial_time , включите эти удары в подсчет. Если n- й удар достигается в час,
// сообщите время в начале этого часа (т. е. предположим, что кукушка заканчивает кукуть до того, как истечет минута).
//
// Пример: "03:38", 19   должно вернуть "06:00" .
// Объяснение: Он звонит один раз в "03:45" , 4 раза в "04:00" , по одному разу в "04:15", "04:30", "04:45",
// 5 раз в "05:00" и по одному разу в "05:15", "05:30", "05:45" . На данный момент он прозвонил 16 раз,
// поэтому 19-й звонок происходит, когда он звонит 6 раз в "06:00" .
//
// Источник: Международный студенческий конкурс по программированию, Северо-Центральный регион Северной Америки,
// 2023 г.
// ? Вариант 1 МОЙ

function cuckoo(inputTime, chimes) {
    let arr = inputTime.match(/\d{2}/g) || [];
    let [hours, min] = arr.map(i => +i);
    min = min % 15 ? Math.ceil(min / 15) * 15 : min;
    while (chimes > 0) {
        if (min === 0 || min === 60) {
            hours = min === 60 ? (hours === 12 ? 1 : ++hours) : hours;
            chimes -= hours;
            min = chimes > 0 ? 15 : 0;
        }
        else {
            chimes--;
            min = chimes > 0 ? min + 15 : min;
        }
    }
    let newHours = hours.toString().padStart(2, "0");
    let newMin = min.toString().padStart(2, "0");
    return (newHours + ":" + newMin);
}

//? Вариант 2 НЕ мой

//* Конвектор Милисикунд в часы/мин/сек/милисек
// ? Вариант 1 МОЙ
function convectorMsToTime(ms) {

    let hs = Math.floor(ms / 3600000);
    let min = Math.floor(ms / 60000) % 60;
    let sec = Math.floor(ms / 1000) % 60;
    let msRest = ms % 1000;

    return `${hs}:${min}:${sec},${msRest}`
}

//*
// (TEST)принимает массив интервалов и возвращает сумму длин всех интервалов.
//Перекрывающиеся интервалы следует учитывать только один раз.
//? Вариант 1 МОЙ
function sumIntervals(intervals) {

    let upLevel = -Infinity

    return intervals
        .sort((a, b) => a[0] - b[0])
        .reduce((sum, item, ind) => {
            if (ind !== 0 && item[0] <= upLevel) {
                sum += item[1] > upLevel ? item[1] - upLevel : 0;
            } else {
                sum += item[1] - item[0];
            }
            upLevel = item[1] > upLevel ? item[1] : upLevel;
            return sum
        }, 0)
}

//*
//? Вариант 1 МОЙ
function formatDuration(seconds) {

    let result = [{qty: 0, rest: seconds, name: ""}];

    do {
        getData(result[result.length - 1].rest, result);
    } while (result[result.length - 1].rest !== 0);
    return result.reduce((sum, item, ind, arr) => {
        if (ind === 0)
            return sum;
        return sum += getValue(item, ind, arr.length);
    }, "");
}

function getData(sec, result) {

    const minuteSec = 60;
    const hourSec = minuteSec * 60;
    const daySec = hourSec * 24;
    const yearSec = daySec * 365;

    switch (true) {
        case sec >= yearSec:
            madeData(result, sec, yearSec, "year", "years");
            break;
        case sec >= daySec:
            madeData(result, sec, daySec, "day", "days");
            break;
        case sec >= hourSec:
            madeData(result, sec, hourSec, "hour", "hours");
            break;
        case sec >= minuteSec:
            madeData(result, sec, minuteSec, "minute", "minutes");
            break;
        case sec > 0:
            madeData(result, sec, 1, "second", "seconds");
            break;
        default:
            result.push({qty: 0, rest: 0, name: "now"});
    }
}

function madeData(arr, sec, pointSec, singular, plural) {
    const num = Math.floor(sec / pointSec);
    arr.push({
        qty: num,
        rest: sec % pointSec,
        name: num > 1 ? plural : singular
    });
}

function getValue(item, ind, length) {
    switch (true) {
        case (length - ind) === 1:
            return ((item.qty === 0 ? "" : item.qty + " ") + item.name);
        case (length - ind) === 2:
            return (item.qty + " " + item.name + " and ");
        default:
            return (item.qty + " " + item.name + ", ");
    }
}

//? Вариант 2 НЕ мой
const formatDuration2 = seconds =>

    !seconds ? 'now' : [Math.floor(seconds / 31536000), Math.floor(seconds / 86400) % 365, Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]

        .map((n, i) => !n ? "" : n + [' year', ' day', ' hour', ' minute', ' second'][i] + (n > 1 ? 's' : ''))

        .filter(el => el)

        .join(', ')

        .replace(/,([^,]*)$/, ' and$1');

//--------------------------------------------------------------------------
//*Напишите функцию cakes(), которая принимает рецепт (объект) и доступные ингредиенты
// (тоже объект) и возвращает максимальное количество тортов, которые Пит может испечь
// (целое число). Для простоты нет единиц измерения количества (например, 1 фунт муки или 200 г
// сахара — это просто 1 или 200). Ингредиенты, отсутствующие в объектах, можно принять за 0.
//Примеры:
// must return 2
//cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200});
// must return 0
//cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000});
//? Вариант 1 МОЙ
function cakes(recipe, available) {
    let result;
    for (let key in recipe) {
        if (!(key in available)) {
            result = 0;
            break;
        }
        let candidate = Math.floor(available[key] / recipe[key]);
        result = result === undefined
            ? candidate
            : candidate < result
                ? candidate
                : result;
    }
    return result;
}

//? Вариант 2 мой улучшенный
function cakes2(recipe, available) {
    let result = Infinity;
    for (let key in recipe) {
        if (!(key in available)) {
            result = 0;
            break;
        }
        let candidate = Math.floor(available[key] / recipe[key]);
        result = Math.min(candidate, result);
    }
    return result;
}


//--------------------------------------------------------------------------//*
//Напишите класс, который при получении строки будет возвращать строку в верхнем
// регистре , в которой каждая буква сдвинута вперед в алфавите на любое количество мест,
// на которые был инициализирован шифр.
// var c = new CaesarCipher(5); // creates a CipherHelper with a shift of five
// c.encode('Codewars'); // returns 'HTIJBFWX'
// c.decode('BFKKQJX'); // returns 'WAFFLES'
//? Вариант 1 МОЙ
class CaesarCipher {
    constructor(num) {
        this.num = num;
    }

    encode(word) {
        return word.replace(/[A-Za-z]/g, (match, offset, input) => {
            let charCode = match.toUpperCase().charCodeAt(0);
            let candidate = charCode + this.num;
            let newCharCode = candidate <= 90
                ? candidate
                : 64 + (candidate - 90);
            return String.fromCharCode(newCharCode);
        });
    }

    decode(word) {
        return word.replace(/\w/g, (match, offset, input) => {
            let charCode = match.toUpperCase().charCodeAt(0);
            let candidate = charCode - this.num;
            let newCharCode = candidate >= 65
                ? candidate
                : 91 - (65 - candidate);
            return String.fromCharCode(newCharCode);
        });
    }
}

//? Вариант 2 НЕ мой
let CaesarCipher2 = function (shift) {
    this.encode = (str) => str.replace(/[a-z]/gi, (c) => String.fromCharCode((c.toUpperCase().charCodeAt(0) + shift - 65) % 26 + 65));
    this.decode = (str) => str.replace(/[a-z]/gi, (c) => String.fromCharCode((c.toUpperCase().charCodeAt(0) + 26 - shift - 65) % 26 + 65));
};

//--------------------------------------------------------------------------
//* Самый дорогой путь и сам путь
function expensiveAndPath(arr) {
    let matrix = []
    arr.forEach((row, y) => {
        matrix.push([])
        if (y === 0) {

            row.forEach((el, x) => {

                let sum = x === 0 ? el : el + matrix[y][x - 1].sum;
                let path = x === 0 ? "" : matrix[y][x - 1].path + "R";
                matrix[0].push(x === 0
                    ? {sum: el, path: ""}
                    : {sum: sum, path: path})

            })
        } else {
            row.forEach((el, x) => {
                if (x === 0) {
                    let sum = matrix[y - 1][0].sum + el;
                    let path = matrix[y - 1][0].path + "D";
                    matrix[y].push({sum: sum, path: path})
                } else {
                    if (matrix[y][x - 1].sum >= matrix[y - 1][x].sum) {
                        matrix[y].push(
                            {
                                sum: el + matrix[y][x - 1].sum,
                                path: matrix[y][x - 1].path + "R"
                            }
                        )
                    } else {
                        matrix[y].push(
                            {
                                sum: el + matrix[y - 1][x].sum,
                                path: matrix[y - 1][x].path + "D"
                            }
                        )
                    }
                }
            })
        }
    })
    let result = matrix[matrix.length - 1].pop()
    return `${result.sum} ${result.path}`
}

//--------------------------------------------------------------------------
//* Самый дешевый путь
function cheapest(arr) {
    let matrix = []
    arr.forEach((row, y) => {
        matrix.push([])
        if (y === 0) {
            row.forEach((el, x) => {
                matrix[y].push(x === 0 ? el : el + matrix[y][x - 1])
            })
        } else {
            row.forEach((el, x) => {
                if (x === 0) {
                    matrix[y].push(el + matrix[y - 1][x])
                } else {
                    matrix[y].push(Math.min(matrix[y][x - 1], matrix[y - 1][x]) + el)
                }
            })
        }
    })
    return matrix[matrix.length - 1].pop()
}

//-------------------------------------------------------------------------------------
//* гвоздики и веревочка. Динамическое программирование
function int(a, b) {
    let bSort = b.sort((a, b) => a - b);

    if (a <= 3) return bSort[a - 1] - bSort[0];

    let prev_1 = bSort[2] - bSort[0];
    let prev_2 = bSort[1] - bSort[0];

    for (let i = 3; i < bSort.length; i++) {
        let alfa = bSort[i] - bSort[i - 1];
        let d_current = Math.min(prev_1, prev_2) + alfa;
        prev_2 = prev_1;
        prev_1 = d_current;
    }
    return prev_1
}

//-------------------------------------------------------------------------------------
//* показать маршрут из точки А в точку Х. Функция fetchFlight(from) асинхронная,
// выдаёт список городов возможных к вылету из точки from
// функция getPath(from, to, func.js = fetchFlight) принмает от и куда + fetchFlight и
// показывает результат массивом
async function fetchFlight(from) {
    return data[from]
}

async function getPath(from, to, func = fetchFlight) {

    let queue = [from] //очередь
    let path = {};
    let result = [to]

    while (queue.length > 0) {
        let pick = queue.shift(); // лучше брать с конца
        let pickValue = await func(pick)
        if (!pickValue) continue;

        pickValue.forEach(pickValueItem => {
            path[pickValueItem] = pick;
            if (to !== pickValueItem) {
                queue.push(pickValueItem)
            } else {
                let toFrom = path[to];
                while (toFrom !== from) {
                    result.unshift(toFrom);
                    toFrom = path[toFrom]
                }
                result.unshift(from)
            }
        })
    }
    return result.length > 1
        ? Promise.resolve(result)
        : Promise.reject("No way")
}

//-------------------------------------------------------------------------------------
//* Является ли слово полиндромом, например "Казак" - да,
// "А роза, упала на лапу азора" - да. Знаки и регистры игнорировать
function isNoLetter(char) {
    return char.toUpperCase() === char.toLowerCase()
}

function polindrom(str) {
    let leftL = 0;
    let rightL = str.length - 1;

    while (leftL < rightL) {
        if (isNoLetter(str[leftL])) {
            leftL++;
            continue
        }
        if (isNoLetter(str[rightL])) {
            rightL--;
            continue
        }
        if (str[leftL++].toLowerCase() !== str[rightL--].toLowerCase()) {
            return false
        }
    }
    return true
}

//-------------------------------------------------------------------------------------
//*принимает любое количество параметров,возвращает сумму каждого заданного параметра,
//любой параметр, который не может быть проанализирован как число, будет считаться равным 0.
//можно бесконечно вызывать, следующий вызов функции сделает то же самое, но также суммирует последнее возвращенное число.
// пример, MagicFunction(1, 2)(3, 4, 5)(6)(7, 10) == 38; should return true

//? Вариант 1 МОЙ
function MagicFunction() {
    const makeSum = (...arr) => arr.reduce((s, a) => s += +((isNaN(+a)) ? 0 : +a), 0);
    let sum = makeSum(...arguments);

    function cover() {
        sum += +makeSum(...arguments);
        return cover
    }

    cover.toString = () => sum;
    return cover
}

//? Вариант 2 НЕ мой
function MagicFunction2(...args) {
    let sum = args.reduce((a, b) => a + (+(b) || 0), 0);
    let fn = MagicFunction.bind(null, sum);
    fn.valueOf = () => sum;
    return fn;
}

//-------------------------------------------------------------------------------------
//*zipWith( или zip_with) принимает функцию и два массива и объединяет массивы вместе, применяя функцию к каждой паре значений.
// Значением функции является один новый массив. Если массивы имеют неравную длину, вывод будет такой же длины, как и более короткий.
//? Вариант 1 МОЙ
function zipWith(func, a, b) {
    return Array.from({length: Math.min(a.length, b.length)}, (_, i) => func(a[i], b[i]))
}

//-------------------------------------------------------------------------------------
//* У вас есть последовательность значений и некоторый предикат для этих значений.
// Вы хотите получить самый длинный префикс элементов, чтобы предикат был истинным для каждого элемента.
// Он принимает два аргумента. Первая — это последовательность значений, а вторая — функция предиката.
// Функция не изменяет значение исходной последовательности.
//? Вариант 1 МОЙ
function takeWhile(arr, func) {
    let i = 0;
    return arr.reduce((res, x) => {
        return i = i || +!func(x), i || res.push(x), res
    }, [])
}

//-------------------------------------------------------------------------------------
//*Напишите функцию span, которая принимает последовательность и функцию-предикат и возвращает две последовательности.
// Первая последовательность содержит все элементы последовательности аргументов до элемента, вызвавшего первую ошибку предиката.
// Вторая возвращенная последовательность содержит остальную часть исходной последовательности. Исходная последовательность не изменена.
//? Вариант 1 МОЙ
function span(arr, predicate) {
    return arr.reduce((sum, x) => {
        if (sum.test) {
            if (predicate(x)) {
                sum.result[0].push(x)
            } else {
                sum.test = false;
                sum.result[1].push(x)
            }
        } else {
            sum.result[1].push(x)
        }
        return sum
    }, {result: [[], []], test: true})
        .result
}

//? Вариант 2 НЕ мой
function span2(arr, predicate) {
    var i = 0;
    return arr.reduce(function (r, val) {
        return r[i = i || +!predicate(val)].push(val), r;
    }, [[], []]);
}

//-------------------------------------------------------------------------------------
//* управлять рядом соседних парковочных мест Parking Lot #1
//? Вариант 1 МОЙ
class ParkingLot {
    constructor(size) {
        this.parkZone = Array.from({length: size}, (v, pos) => ({free: 1, pos: ++pos}))
    }

    park(vehicle) {
        let width = ParkingLot.getWidthVehicle(vehicle);
        let freePos = ParkingLot.lookingFreePos(width, this.parkZone);

        if (freePos) {
            let start = freePos - width;
            let stop = freePos - 1;
            this.parkZone.map((parking, freePos) => {
                if (start <= freePos && freePos <= stop) {
                    parking.free = 0;
                    parking.license = vehicle.license;
                }
                return parking
            })
        }
        return freePos ? true : false;
    }

    retrieve(license) {
        let result = false;
        this.parkZone.map(parking => {
            if (parking.license && parking.license === license) {
                result = true;
                parking.free = 1;
                delete parking.license
            }
        })
        return result;
    }

    static lookingFreePos(width, parkZone) {
        let needWidth = 0;
        let findWidth = 0;
        let findPos;
        for (const place of parkZone) {
            let {free, pos} = place;
            if (free) {
                findWidth = findWidth + 1;
                needWidth = Math.max(needWidth, findWidth)
                if (needWidth === width) {
                    findPos = pos;
                    break;
                }
            } else {
                findWidth = 0;
            }
        }
        return findPos
    }

    static getWidthVehicle(vehicle) {
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

//-------------------------------------------------------------------------------------
//Изменить getDate для Date, чтобы он возвращал значения 26 для объектов, представляющих 25 декабря,
// но правильно работал для всех остальных дней года.
//? Вариант 1 МОЙ
Date.prototype.getDate = function () {
    let arrData = this.toString().split(" ");
    if (arrData[1] === "Dec" && arrData[2] === "25") return 26
    return +arrData[2]
}
//-------------------------------------------------------------------------------------
//*На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].//
// Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.//
// Функция getMaxSubSum(arr) должна возвращать эту сумму.
//? Вариант 1 МОЙ
function getMaxSubSum(arr) {
    let test = [];
    while (arr.length > 0) {
        arr.reduceRight((sum, it) => {
            sum = sum + it;
            test.push(sum);
            return sum;
        }, 0);
        arr.pop();
    }
    let result = Math.max(...test);
    return result > 0 ? result : 0;
}

//? Вариант 2 НЕ мой
function getMaxSubSum_2(arr) {
    let max = 0;
    let part = 0;
    arr.forEach(it => {
        part += +it;
        max = Math.max(part, max)
        if (part < 0) part = 0
    })
    return max
}

//-------------------------------------------------------------------------------------
//*возвращает среднее значение квадрата разности абсолютных значений между каждой парой элементов.
// [1, 2, 3], [4, 5, 6]  -->   9   because (9 + 9 + 9) / 3
//? Вариант 1 МОЙ
let solution = function (firstArray, secondArray) {
    return firstArray.reduce((sum, it, ind) => {
        return sum + (it - secondArray[ind]) ** 2;
    }, 0) / firstArray.length;
};

//? переработанный МОЙ с учетом инфы ниже

//? Вариант 2 НЕ мой

//-------------------------------------------------------------------------------------
//*  создать таблицу умножения N×N размера, указанного в параметре.
//? Вариант 1 МОЙ
const multiplicationTable = function (size) {
    let table = [];
    for (let i = 1; i <= size; i++) {
        table.push(Array(size).fill("").map((_, ind) => ++ind * i));
    }
    return table
};

//? переработанный МОЙ
const multiplicationTable2 = function (size) {
    let table = []
    for (let i = 1; i <= size; i++) {
        table.push(
            Array.from({length: size}, (_, ind) => ++ind * i)
        )
    }
    return table
}


//? Вариант 2 НЕ мой

//-------------------------------------------------------------------------------------
//*Ваша миссия — реализовать функцию buildMatchesTable, которая получает количество команд
// (всегда положительное и четное число) и возвращает матрицу.
// Каждая строка матрицы представляет собой один раунд. Каждый столбец матрицы представляет
// одно совпадение.
// Матч представлен в виде массива с двумя командами. Каждая команда представлена числом,
// начиная с 1 и заканчивая количеством команд. (каждый матч в турнире не повторяется)
//? Вариант 1 МОЙ
function buildMatchesTable(numberOfTeams) {
    let matrix = [];
    let arr = Array(numberOfTeams).fill(0).map((_, i) => ++i);
    for (let i = 1; i < numberOfTeams; i++) {
        arr = arr.map((it, ind) => {
            return (ind === 0) ? it : (ind === arr.length - 1) ? arr[1] : arr[ind + 1];
        });
        let round = [];
        for (let q = 0; q < numberOfTeams / 2; q++) {
            round.push([arr[q], arr[arr.length - q - 1]].sort());
        }
        matrix.push(round);
    }
    return matrix;
}

//? переработанный МОЙ
function buildMatchesTable2(numberOfTeams) {
    let matrix = []
    let arr = Array(numberOfTeams).fill(0).map((_, i) => ++i)

    for (let i = 1; i < numberOfTeams; i++) {
        let round = []
        for (let q = 0; q < numberOfTeams / 2; q++) {
            round.push([arr[q], arr[arr.length - q - 1]].sort())
        }
        matrix.push(round)
        arr.splice(1, 0, arr.pop())
    }
    return matrix
}

//? Вариант 2 НЕ мой

//-------------------------------------------------------------------------------------
//* First Variation on Caesar Ciphe
// Функция «movingShift» сначала кодирует всю строку, а затем возвращает массив строк,
// содержащий закодированную строку в 5 частях
// Расшифровка: параметры и возврат функции "demovingShift"
//? Вариант 1 МОЙ
function splitNewS(newS) {
    let part = Math.ceil(newS.length / 5);
    let reg = new RegExp(`.{1,${part}}`, "g");
    let res = newS.match(reg) || [];
    while (res.length < 5) {
        res.push("");
    }
    return res;
}

function movingShift(s, shift) {
    let newS = s.replace(/./gi, val => {
        if (/[a-z]/i.test(val)) {
            return val.replace(/([a-z])|([A-Z])/, (it, p1, p2) => {
                let a = p1 ? "a".charCodeAt(0) : "A".charCodeAt(0);
                return String.fromCharCode(
                    ((it.charCodeAt(0) - a) + shift++) % 26 + a
                );
            });
        }
        return shift++ && val;
    });
    return splitNewS(newS);
}

function demovingShift(arr, shift) {
    return arr.join("").replace(/./gi, val => {
        if (/[a-z]/gi.test(val)) {
            return val.replace(/([a-z])|([A-Z])/, (it, p1, p2) => {
                let a = p1 ? "a".charCodeAt(0) : "A".charCodeAt(0);
                return String.fromCharCode(
                    ((it.charCodeAt(0) - a) + 26 - shift++ % 26) % 26 + a
                );
            });
        }
        return shift++ && val;
    });
}

//-------------------------------------------------------------------------------------
//*Форматируйте любое целое число в строку с "," (запятыми) в правильных местах.
// 5678545 the function should return '5,678,545'
//? Вариант 1 МОЙ
const numberFormat = function (number) {
    let str = String(number);
    let reg = /^(-?)(\d+)(\d{3})/;
    // let reg2 = /\B(?=(\d{3})+(?!\d))/g; интересное рег. выражение
    while (reg.test(str)) {
        str = str.replace(reg, "$1$2,$3");
    }
    return str;
};

//-------------------------------------------------------------------------------------
//*Напишите функцию: simplify, которая принимает на вход строку, представляющую полилинейный
// непостоянный полином в целых числах с коэффициентами (например "3x-zx+2xy-x"),
// и возвращает другую строку в качестве вывода, где то же самое выражение
// было упрощено "-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"
//? Вариант 1 МОЙ
function simplify(poly) {
    let result = poly.match(/\+?-?\d*([a-z]+)/g)
        .reduce((sum, it) => {
            let el = it.match(/((\+?-?)(\d*))([a-z]+)/)
            let sortL = el[4].split("").sort().join("")
            let k = Number(el[3] ? el[1] : el[2] + 1)
            if (!sum[sortL]) {
                sum[sortL] = k
            } else {
                sum[sortL] += k;
            }
            return sum
        }, {})

    return Object.entries(result)
        .sort((a, b) => {
            return (a[0].length != b[0].length)
                ? a[0].length - b[0].length
                : a[0].localeCompare(b[0]);
        })
        .reduce((str, it) => {
            switch (it[1]) {
                case 0:
                    return str
                case 1:
                    return str += "+" + it[0]
                case -1:
                    return str += "-" + it[0]
                default:
                    return str = it[1] > 0 ? str + "+" + it[1] + it[0] : str + it[1] + it[0]
            }
        }, "")
        .replace(/^\+/, "")
}

//-------------------------------------------------------------------------------------
//*Напишите функцию, которая проверяет входную строку. Если строка представляет собой
// идеальный квадрат, верните true, в противном случае — false.
// символ '.' (точка) — правильный квадрат (1x1) *
//? Вариант 1 МОЙ
function perfectSquare(string) {
    if (/[^.\n]/g.test(string)) return false;
    let res = string.split(/\n/);
    return res.every(r => r.length === res.length);
}

//-------------------------------------------------------------------------------------
//* Согласно Википедии, ROT13 часто используется для запутывания шуток в USENET.//
// Для этой задачи вы должны только заменить символы. Не пробелы, знаки препинания, цифры и т.д
// "This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!".
//? Вариант 1 МОЙ
function rot13(str) {
    return str.replace(/[a-z]/gi, a => {
        let num = a.charCodeAt(0);
        return String.fromCharCode(((num > 77 && num < 97) || num > 109) ? num - 13 : num + 13);
    });
}

//? Вариант 2 НЕ мой
const rot133 = str =>
    str.replace(/[a-z]/gi, val => String.fromCharCode(val.charCodeAt() + (/[a-m]/i.test(val) ? 13 : -13)));

//-------------------------------------------------------------------------------------
//*функцию dataTypes, которая должна возвращать массив из следующих
// трех типов данных JavaScript: строки, числа, логические значения
// "truestring1" => ['boolean', 'string', 'number'].
//? Вариант 1 МОЙ
function dataTypes(string) {
    // @ts-ignore
    return string
        .replace(/true|false/gi, "!")
        .match(/([a-z]+)|(\d+)|!/gi)
        .map(i => {
            if (/[a-z]+/i.test(i)) {
                return "string";
            } else if (/\d+/.test(i)) {
                return "number";
            } else return "boolean";
        });
}

//-------------------------------------------------------------------------------------
//*Закодированные слова состоят из строчных букв и как минимум одной звездочки
// speech = "***lo w***d!" and vocabulary = ["hello", "world"] => "hello world!"  ;
//? Вариант 1 МОЙ
function translate(speech, vocabulary) {
    return speech.replace(/[*\w]+/g, s => {
        let reg = new RegExp(`\\b${s.replace(/\*/g, "\\w")}\\b`);
        return vocabulary.find(w => reg.test(w));
    });
}

//-------------------------------------------------------------------------------------
//*Напишите функцию loopArr, которая зацикливает массив в указанном направлении
// на некоторое количество шагов.
//? Вариант 1 МОЙ
function loopArr(arr, direction, steps) {
    if (direction === "left") {
        let arr2 = arr.splice(0, steps);
        return [...arr, ...arr2];
    } else if (direction === "right") {
        let arr2 = arr.splice(-steps);
        return [...arr2, ...arr];
    }
}

//-------------------------------------------------------------------------------------
//*написать регулярное выражение (регулярное выражение), которое будет соответствовать
// строке только в том случае, если она содержит хотя бы одну допустимую дату в формате
// (то есть [mm-dd]месяц из двух цифр, за которым следует тире, за которым следует двузначное
// число дату в квадратных скобках).
//? Вариант 1 МОЙ
let reg12 = /(\[02-(0[1-9]|1\d|2[0-8])])|(\[(0[13578]|1[02])-(0[1-9]|[12]\d|3[01])])|(\[(0[469]|11)-(0[1-9]|[12]\d|30)])/


//-------------------------------------------------------------------------------------
//* Напишите алгоритм, который будет определять действительные адреса IPv4 в десятичном формате с точками.
// IP-адреса следует считать действительными, если они состоят из четырех октетов со значениями
// от 0до 255включительно. Ведущие нули (например 01.02.03.04) считаются недействительными
//? Вариант 1 МОЙ
function isValidIP(str) {
    let reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.|$)){4}$/;
    return reg.test(str);
}

//-------------------------------------------------------------------------------------
//*Учитывая массив (arr) в качестве аргумента, завершите функцию countSmileys, которая
// должна вернуть общее количество улыбающихся лиц.
// Каждый смайлик должен содержать допустимую пару глаз. Глаза могут быть отмечены как : или ;
// У смайлика может быть нос, но не обязательно. Допустимые символы для носа - или ~
// Каждое улыбающееся лицо должно иметь улыбающийся рот, который должен быть отмечен либо значком, ) либо D
//? Вариант 1 МОЙ
function countSmileys(arr) {
    return arr.filter(i => /^(:|;)(-|~)?(\)|D)$/.test(i)).length;
}

//-------------------------------------------------------------------------------------
//*необходимо зашифровать каждое слово в сообщении, используя следующие правила:
// Первая буква должна быть преобразована в код ASCII. // Вторая буква должна быть заменена последней буквой
//? Вариант 1 МОЙ
const encryptThis = function (text) {
    return text.replace(/\b(\w?)(\w?)(\w*)(\w)\b/g,
        (_, p1, p2, p3, p4) => !p1 ? p4.charCodeAt() : p1.charCodeAt() + p4 + p3 + p2);
}
//-------------------------------------------------------------------------------------
//*  нужно инициализировать имена. 'Barack Hussain obama' => B.H.Obama
//? Вариант 1 МОЙ
function initials(n) {
    let reg = /(\w)(\w+)(\s+|($))/g;
    return n.replace(reg, (_, p1, p2, p3) => p3 ? p1.toUpperCase() + "." : p1.toUpperCase() + p2);
}

//-------------------------------------------------------------------------------------
//*Вам нужно написать регулярное выражение, которое будет проверять пароль, чтобы убедиться,
// что он соответствует следующим критериям: Не менее шести символов, содержит строчную букву,
// содержит заглавную букву, содержит цифру, содержит только буквенно-цифровые символы (обратите внимание, что '_'это не буквенно-цифровые символы)
//? Вариант 1 МОЙ
const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;


//-------------------------------------------------------------------------------------
//*Реализуйте функцию, чтобы она производила предложение из заданных частей.
//['hello', ",", ",", 'my' , ",", ",", 'dear',".", ".",] ===  hello, my, dear.
//? Вариант 1 МОЙ
function makeSentence(parts) {
    return parts.join(" ").replace(/(?:\s(,))+|(\s\.)+/gi, (_, p1, p2) => p1 ? p1 : "") + ".";
}

//-------------------------------------------------------------------------------------
//*Если строка содержит буквенно-цифровые символы ("3a4B2d"), возвращает расширение этой
// строки: числовые значения представляют вхождение каждой буквы, предшествующей этому числовому значению.
// В итоговой строке не должно быть цифр.: ('3abc'),'aaabbbccc') ('3D2a5d2f'),'DDDaadddddff')
//? Вариант 1 МОЙ

function stringExpansion(s) {
    let repeat = 1;
    return s.replace(/.+?/g, l => {
        let num = +l;
        let chart = "";
        if (!isNaN(num)) {
            repeat = num;
            return "";
        }
        for (let i = 1; i <= repeat; i++) {
            chart += l;
        }
        return chart;
    })
}

//? переработанный МОЙ
function stringExpansion2(s) {
    return s.replace(/((\d*)(\d))([a-z]*)/gi, (_, _1, _2, p3, p4) => {
        return p4.replace(/\w/gi, (w) => w.repeat(p3));
    });
}

//-------------------------------------------------------------------------------------
//*вы должны проверить, является ли строка ввода пользователя буквенно-цифровой
// Допустимые символы: прописные/строчные латинские буквы и цифры от 0до9
// Без пробелов/подчеркивания
function alphanumeric(string) {
    let reg = new RegExp(/^[A-Za-z0-9]+$/);
    return reg.test(string);
}

//-------------------------------------------------------------------------------------
//*Учитывая речь "a**? *c*. **e,"и словарный запас ["ace", "acd", "abd"],
// ожидаемый ответ "abd? acd. ace,".
//? Вариант 1 МОЙ
function translate11(speech, vocabulary) {
    while (speech.includes("*")) {
        speech = speech.replace(/[*\w]*\*[*\w]*/gi, w => {
            let reg = new RegExp(w.replace(/\*/g, "\\w")
                .replace(/.+/, "\\b$&\\b"));
            let result = vocabulary.filter(v => reg.test(v));
            if (result.length === 1) {
                vocabulary = vocabulary.filter(i => i !== result[0]);
                return result[0];
            } else return w;
        });
    }
    return speech;
}

//-------------------------------------------------------------------------------------
//*Напишите функцию, которая принимает массив из 10 целых чисел (от 0 до 9),
// которая возвращает строку этих чисел в виде номера телефона.
// ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
//? Вариант 1 МОЙ
function createPhoneNumber(numbers) {
    return numbers.join("")
        .replace(/(\d{3})(\d{3})(\d+)/, "($1) $2-$3");
}

//-------------------------------------------------------------------------------------
//*Переместите первую букву каждого слова в конец, а затем добавьте «ay» в конец слова.
// Оставьте знаки препинания нетронутыми.
// Pig t latin is cool = igPay tay atinlay siay oolcay
//? Вариант 1 МОЙ
function pigIt(str) {
    return str.replace(/(\w)(\w*)(\s|$)/gi, "$2$1ay$3");
}

//-------------------------------------------------------------------------------------
//* Преобразовать "camelsHaveThreeHumps"  -->  "camels-have-three-humps"
function kebabize(str) {
    return str.replace(/([^A-Za-z])/g, "")
        .replace(/[A-Z]/g, (l, ind) => (ind !== 0) ? `-${l.toLowerCase()}` : l.toLowerCase());
}

//-------------------------------------------------------------------------------------
//* Удалить скобки вместе с содержимым
//? Вариант 1 МОЙ
let str25 = "(first (more (wo)rds) oup) test (second group)"; // на выходе слово  test
function removeParentheses(s) {
    let qty = -1;
    //console.log(s.match(/\([^(]*?\)/g));
    return s.replace(/./g, l => {
        if (l === "(") {
            qty++;
        }
        if (qty >= 0) {
            if (l === ")") {
                qty--;
            }
            return "";
        } else return l;
    });
}

//-------------------------------------------------------------------------------------
// Для каждого слова://
// вторая и последняя буквы меняются местами (например, Hello становится Holle)
// первая буква заменяется кодом символа (например, H становится 72)
//? Вариант 1 МОЙ
function decipherThis(str) {
    return str
        .split(" ")
        .map(word => {
            return word
                .replace(/\d+/, digit => String.fromCodePoint(+digit))
                .split("")
                .map((char, ind, arr) => {
                    if (ind === 1) {
                        return arr[arr.length - 1];
                    } else if (ind === arr.length - 1 && arr.length > 1) {
                        return arr[1];
                    } else {
                        return char;
                    }
                })
                .join("");
        })
        .join(" ");
}

//? Вариант 2 НЕ мой
function decipherThis_2(str) {
    return str.split(" ")
        .map(w =>
            w.replace(/^\d+/, c => String.fromCharCode(c))
                .replace(/^(.)(.)(.*)(.)$/, "$1$4$3$2")
        )
        .join(" ")
}

//? Вариант 2 Мой
function changeStr(str) {
    let res = str.split(" ")
        .map(word => word.replace(/\b(?<one>\w)(?<two>\w)(?<anoter>\w*)(?<last>\w)\b/gi
            , "$<one>$<last>$<anoter>$<two>")
        )
        .join(" ")
}

//-------------------------------------------------------------------------------------
// Завершите метод/функцию, чтобы он преобразовывал слова,
// разделенные тире/подчеркиванием, в верблюжий регистр.
//? Вариант 1 МОЙ
function toCamelCase(str) {
    let count;
    return str.replace(/./g, (char, ind) => {
        if (char === "-" || char === "_") {
            count = ind + 1;
            return "";
        } else if (ind === count) {
            return char.toUpperCase();
        } else {
            return char;
        }
    });
}

//? Вариант 2 НЕ мой
function toCamel_Case(str) {
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}


//-------------------------------------------------------------------------------------
//* Реализуйте функцию findMatchedByPattern (pattern), которая возвращает
//функцию. Функция проверяет введенную строку и возвращает значение true,
//если строка соответствует шаблону, и false в противном случае.
//Слово считается соответствующим заданному шаблону, если первое вхождение
//каждой буквы шаблона встречается в том же порядке в слове

// Вариант 1 МОЙ
function findMatchedByPattern(pattern) {
    return function (word) {
        let count = 0;
        let test = word.replace(/\w/g, char => {
            if (pattern.slice(count).includes(char)) {
                count++;
                return char;
            } else {
                return "";
            }
        });
        return test === pattern;
    };
}

//let predicate = findMatchedByPattern("bmb");
//console.log(predicate("bomb"));

//-------------------------------------------------------------------------------------
//* Учитывая время в формате AM/PM в виде строки, преобразуйте
// его в военное (24-часовое) время в виде строки.
// Полночь — это 00:00:00 в 12-часовом формате и 00:00:00 в 24-часовом формате.
// Полдень — это 12:00:00 в 12-часовом формате и 12:00:00 в 24-часовом формате.
// Пример ввода: 19:05:45 Пример вывода: 19:05:45//
// Старайтесь не использовать встроенные библиотеки DateTime.

// Вариант 1 МОЙ

function getMilitaryTime(str) {
    return str
        .slice(0, -2)
        .split(":")
        .map((item, ind) => {
            if (ind === 0) {
                if (str.includes("AM")) {
                    return item === "12" ? "00" : item;
                } else {
                    return item === "12" ? item : String(+item + 12);
                }
            } else return item;
        })
        .join(":");
}

//-------------------------------------------------------------------------------------
//* Создайте асинхронную функцию getUsers(names), которая получает на вход массив логинов пользователей GitHub,
//* запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей
//* Если какой-то запрос завершается ошибкой функция должна возвращать null
//? Вариант 1 МОЙ

async function getUsers(names) {
    return await Promise.all(
        names.map(async user => {
            const respon = await fetch(`https://api.github.com/users/${user}`);
            return (!respon.ok) ? null : await respon.json();
        })
    )
}

/*
let usersName = ["iliakan"
     , "ilik"
     , "-f-f-f-f-f-f-f-f-++++ff"
]
getUsers(usersName).then(console.log)
*/

//* Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.
/*function Clock({ template }) {

     let timer;

     function render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
     }

     this.stop = function() {
        clearInterval(timer);
     };

     this.start = function() {
        render();
        timer = setInterval(render, 1000);
     };

 }*/

//? Вариант 1 МОЙ
class Clock {

    constructor({template}) {
        this.template = template;

    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    };

    start() {
        this.render();
        this.timer = setInterval(this.render, 1000);
    };

}

// let clock = new Clock({ template: 'h:m:s' });

//* Учитывая список целых чисел и одно значение суммы, верните первые два значения (анализируйте слева)
//*в порядке появления, которые в сумме образуют сумму.
//* Если имеется две или более пар с требуемой суммой, то решением является пара,
//* второй элемент которой имеет наименьший индекс.
//? Вариант 1 МОЙ

function sumPairs(ints, s) {

    let result = {};
    let arrKeys = []

    outer:
        for (let [ind, item] of ints.entries()) {

            if (arrKeys.includes(item)) continue;
            arrKeys.push(item);

            for (let i = ++ind; i < ints.length; i++) {
                let sum = item + ints[i];
                if (sum === s) {
                    result[i] = [item, ints[i]];
                    arrKeys.push(ints[i])
                    continue outer;
                }
            }
        }
    return Object.values(result)[0]
}

//? Вариант 2  НЕ мой

function sum_pairs(ints, s) {
    let seen = new Set();
    for (let i of ints) {
        if (seen.has(s - i)) return [s - i, i];
        seen.add(i);
    }
}

//* Напишите функцию sum, которая бы работала следующим образом:
//* sum(1)(2)(3) == 6; // 1 + 2 + 3
//* sum(0)(1)(2)(3)(4)(5) == 15
//? Вариант 1 МОЙ
function sum(a) {
    let result = a;

    function wrapper(b) {
        result += b;
        return wrapper;
    }

    wrapper.toString = function () {
        return result;
    }
    return wrapper;
}


//* Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая
//*вызов в f не более одного раза в ms миллисекунд. Те вызовы, которые попадают в период «торможения»,
//* игнорируются.
//* Отличие от debounce – если проигнорированный вызов является последним во время «задержки»,
//* то он выполняется в конце.
//? Вариант 1 МОЙ
function f(x) {
    console.log(x);
}

function throttle(f, ms) {
    let call = true;

    function wrapper() {
        wrapper.calls.push(...arguments);
        if (!call) return;

        f.call(this, wrapper.calls.pop());
        call = false;

        setTimeout(() => {
            call = true;
            if (wrapper.calls.length > 0) {
                wrapper();
                wrapper.calls = []
            }
        }, ms)
    }

    wrapper.calls = [];
    return wrapper;
}

// let f1500 = throttle(f, 1500);

// f1500(1);
// f1500(2);
// f1500(3);
// f1500(4);
// f1500(5);
// setTimeout(() => f1500(8), 2000)
// setTimeout(() => f1500(9), 2200)

//* Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более
//* одного раза в ms миллисекунд. Другими словами, когда мы вызываем debounce, это гарантирует,
//* что все остальные вызовы будут игнорироваться в течение ms.
//? Вариант 1 МОЙ
function f(x) {
    console.log(x);
}

function debounce(f, ms) {
    let call = true;
    return function () {
        if (call) {
            call = false;
            setTimeout(() => call = true, ms);
            f.apply(this, arguments);
        }
    }
}

// f = debounce(f, 1000);
// f(2);// сработает
// setTimeout(() => f(3), 800);// не сработает
// setTimeout(() => f(5), 1500);// сработает

//*Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
//? Вариант 1 МОЙ
function f(x) {
    console.log(x);
}

function delay(func, ms) {
    return function () {
        return setTimeout(() => {
            func.apply(this, arguments)
        }, ms)
    }
}

// let f2000 = delay(f, 2000);
// f2000("test");

//* Создайте декоратор spy(func.js), который должен возвращать обёртку,
//* которая сохраняет все вызовы функции в своём свойстве calls.
//* Каждый вызов должен сохраняться как массив аргументов.
//? Вариант 1 МОЙ
function work(a, b) {
    console.log(a + b); // произвольная функция или метод
}

function spy(func) {
    function spyFunc() {
        spyFunc.calls.push([...arguments]);
        return func.apply(this, arguments);
    }

    spyFunc.calls = [];
    return spyFunc;
}

// work = spy(work);
// work(2, 5);


//* Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.
//*Если объект salaries пустой, то нужно вернуть null.
//*Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
//? Вариант 1 МОЙ
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250

};

function topSalary(obj) {
    let entries = Object.entries(obj);
    return (entries.length == 0) ? null :
        entries
            .sort(([nam1, val1], [nam2, val2]) => val1 - val2)
            .pop()
            .shift();
}

//* Если строка уже заканчивается числом, число должно быть увеличено на 1.
//* Если строка не заканчивается цифрой. число 1 должно быть добавлено к новой строке.
//* учитывать "000" перед числом при наличии
//? Вариант 1 МОЙ
function incrementString(strng) {
    let num = strng.replace(/\D/g, "");
    if (num === "") {
        return strng + 1;
    } else {
        let text = strng.replace(/\d/g, "");
        let end = `${+num + 1}`;
        return text + end.padStart(num.length, "0")
    }
}

//* Определите функцию, которая принимает два неотрицательных целых числа (a b)
//*  ввиде строки и возвращает последнюю десятичную цифру a**b
//* Обратите внимание, чтоаааа такжебббможет быть очень большим!
//? Вариант 1 МОЙ
var lastDigit = function (str1, str2) {
    if (str2 == 0) return 1;
    let lastNumBase = +str1.slice(-1);
    if (lastNumBase === 1 || lastNumBase === 5 || lastNumBase === 0) return lastNumBase;
    let restPow = Number(BigInt(str2) % BigInt(4));
    if (restPow !== 0) return +`${Math.pow(lastNumBase, restPow)}`.slice(-1);
    let evenOrOdd = (lastNumBase % 2 === 0) ? true : false;
    if (evenOrOdd) return 6;
    return 1;
}
//? Вариант 2  НЕ мой
var lastDigit = function (str1, str2) {
    return +str2 === 0 ? 1 : Math.pow(+str1.slice(-1), +str2.slice(-2) % 4 + 4) % 10
}

//* Напишите функцию, которая принимает неотрицательное целое число (секунды)
//* в качестве входных данных и возвращает время в удобочитаемом формате ( HH:MM:SS)
//? Вариант 1 МОЙ
function humanReadable(seconds) {
    let data = new Date((seconds * 1000));
    let objData = {
        "hours": `${(data.getUTCDate() - 1) * 24 + (data.getUTCHours())}`.padStart(2, 0),
        "min": `${data.getMinutes()}`.padStart(2, 0),
        "sec": `${data.getSeconds()}`.padStart(2, 0),
        toString() {
            return `${this.hours}:${this.min}:${this.sec}`
        }
    };
    return objData.toString()
}


//? Вариант 2  НЕ мой
const humanReadablE = sec => {
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor(sec % 3600 / 60);
    let seconds = Math.floor(sec % 3600 % 60);
    let result = `${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(seconds)}`
    return result;
}

const timeFormat = s => {
    if (s === 0) {
        return '00'
    } else if (s < 10) {
        return '0' + s
    } else {
        return s
    }
}

//* Создайте функцию, которая принимает строку и возвращает строку, зашифрованную с помощью Rot13.
//* Если в строку включены числа или специальные символы, они должны быть возвращены как есть.
//* Сдвинуты должны быть только буквы латинского/английского алфавита, как в оригинальной "реализации" Rot13.
//? Вариант 1 МОЙ
function rot13(message) {
    return message
        .split("")
        .map(item => {
            let code = item.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                let codeNewUp = (code < 78) ? code + 13 : code - 13;
                return String.fromCharCode(codeNewUp);
            }
            if (code >= 97 && code <= 122) {
                let codeNewLower = (code < 110) ? code + 13 : code - 13;
                return String.fromCharCode(codeNewLower);
            }
            return item;
        })
        .join("")
}

//* написать функцию, которая возвращает, true/Trueесли аргумент является строковым десятичным
//*представлением номера счастливого билета или false/Falseвсех остальных чисел.
//* Он должен выдавать ошибки для пустых строк или строк, которые не представляют десятичное число
//? Вариант 1 МОЙ
function luckCheck(ticket) {
    let arrTicket = ticket.split("");
    let midl = Math.floor(arrTicket.length / 2);
    let result = arrTicket.reduce((sum, item, ind) => {
        if (ind < midl) {
            sum.left += +item;
        } else if (ind < (arrTicket.length - ind)) {
            return sum
        } else {
            sum.right += +item;
        }
        return sum
    }, {"left": 0, "right": 0});
    return result.left == result.right;
}

//* Напишите алгоритм, который берет массив и перемещает все нули в
//*конец, сохраняя порядок остальных элементов.
//? Вариант 1 МОЙ
function moveZeros(arr) {
    return arr.sort(
        (a, b) => {
            if (a !== 0 && b !== 0) return 0;
            if (a === 0 && b !== 0) return 1;
            if (a !== 0 && b === 0) return -1;
        }
    )
}

//? Вариант 2  НЕ мой
function moveZeros(arr) {
    return arr.sort((a, b) => b === 0 ? -1 : 0);
}

//* развернуть массив не используя reverse() и код должен быть как можно короче, не более 28 символов.
//? Вариант 1 МОЙ
let weirdReverse = a => a.sort(n => 1);
// ещё вариант на 30 символов
let weirdRevers = a => [...a].map(a.pop, a);

//* Вам будет дано число, и вам нужно будет вернуть его в виде строки в расширенной форме .
//? Вариант 1 МОЙ
function expandedForm(num) {
    let numStr = String(num);
    let result = '';
    for (let i = 0; i < numStr.length; i++) {
        let curentNum = numStr[i];
        if (curentNum == '0') continue;

        for (let n = i; n < numStr.length - 1; n++) {
            curentNum += "0";
        }
        result = `${result} + ${curentNum}`
    }
    return result.slice(2).trim()
}

//* максимальная сумма диапазона
//? Вариант 1 МОЙ
function maxSum(arr, range) {
    return Math.max(...
        range.map(item => {
            let sum = 0;
            for (let i = item[0]; i <= item[1]; i++) {
                sum += arr[i]
            }
            return sum;
        })
    )
}

// console.log(maxSum(
// 	[1, -2, 3, 4, -5, -4, 3, 2, 1],
// 	[[1, 3],
// 	[0, 4],
// 	[6, 8]]
// ));


//* является ли число простым (с небольшой оптимизацией под большие числа)
//? Вариант 1 МОЙ
function isPrime(num) {

    if (num <= 1) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= (num ** (1 / 2)); i++) {
        if ((num % i) === 0) return false;
        i++;
    }
    return true;
}


//* Панаграмма строка или нет?
//? Вариант 1 МОЙ
function isPangram(string) {
    return string
        .toLowerCase()
        .split('')
        .reduce((sum, item) => {
            if (item.charCodeAt(0) > 96 && item.charCodeAt(0) < 123 && sum.includes(item) == false) {
                sum.push(item)
            }
            return sum
        }, []).length == 26
}


//* Вам дан массив (список) strarrстрок и целое число k. Ваша задача — вернуть первую самую длинную строку,
//* состоящую из k последовательных строк, взятых в массиве.
//? Вариант 1 МОЙ
function longestConsec(strarr, k) {
    return strarr
        .reduce((sum, _, index, arr) => {
            if (index <= (arr.length - k)) {
                let curentlength = 0;
                let curentResult = "";
                for (let i = 0; i < k; i++) {
                    curentlength += arr[index + i].length;
                    curentResult += arr[index + i];
                }
                if (curentlength > sum.length) {
                    sum.length = curentlength;
                    sum.result = curentResult;
                }
            }
            return sum
        }, {result: '', length: 0})
        .result
}

let strarr = ["reew", "foling", "trashy"];
let k = 1;


//* Пример формата переданного в CSV:"1,2,3\n4,5,6\n7,8,9\n10,11,12"
//*  csvColumns("1,2,3\n4,5,6", [0, 1]) => "1,2\n4,5"
//? Вариант 1 МОЙ
function csvColumns(csv, indices) {
    return csv
        .replace(/\n/g, ',\n,')
        .split(',')
        .reduce((sum, item) => {
            if (item == '\n') {
                sum.index = -1;
                if (sum.result.length > 0) sum.result += '\n';
                return sum
            } else {
                sum.index += 1
            }
            if (indices.includes(sum.index)) {
                if (sum.result.indexOf('\n', sum.result.length - 1) == -1 && sum.result.length > 0) {
                    sum.result += ","
                }
                sum.result = sum.result + item
            }
            return sum;
        }, {result: "", index: -1})
        .result
}

//? переработнанный МОЙ с учетом инфы ниже
function csvColumns(csv, indices) {
    return csv
        .split('\n')
        .map(item => item
            .split(",")
            .filter((_, index) => indices.includes(index)))
        .join("\n")
        .trim()
}

//? Вариант 2  НЕ мой
function csvColumns(csv, indices) {
    return csv.split('\n')
        .map(row => row.split(',').filter((_, i) => indices.includes(i)).join(','))
        .join('\n')
        .trim();
}

//* Посчитать рукопожатия
//? Вариант 1 МОЙ
function getParticipants(handshakes) {

    let countHandshakes = (men) => (men <= 1) ? 0 : (men - 1) + countHandshakes(men - 1);

    let count = 0;
    let men = 0;

    do {
        men++;
        count = countHandshakes(men);
    } while (count < handshakes)

    return (handshakes == 0) ? handshakes : men;
}

//? Вариант 2  НЕ мой
function getParticipants(handshakes) {
    let farmers = 0
    while (handshakes > farmers * (farmers - 1) / 2) {
        farmers++
    }
    return farmers
}

//*Крысолов Легенда  Пример  ~O~O~O~OP~O~OO~имеет 2 глухих крысы
/*P= Крысолов
O~= Крыса идет налево
~O= Крыса идет вправо
*/
//? Вариант 1 МОЙ
var countDeafRats = function (town) {

    let result = 0;
    let start = town.indexOf('P');
    let arrTown = town.split("");

    arrTown
        .slice(start + 1)
        .reduce((sum, item) => {
            if (item == "O") {
                sum++
            } else if (item == "~") {
                sum--
            }
            if (sum < 0) result++;
            return sum
        }, 0);

    arrTown
        .slice(0, start)
        .reduceRight((sum, item) => {
            if (item == "O") {
                sum++
            } else if (item == "~") {
                sum--
            }
            if (sum < 0) result++;
            return sum
        }, 0);

    return result

}


//* написать функцию, printer_errorкоторая по заданной строке будет возвращать частоту ошибок
//* принтера в виде строки Test.assertEquals(printerError(s), "3/56")
//? Вариант 1 МОЙ
function printerError(s) {
    let erors = s.split('').reduce((sum, item) => {
        if (item > 'm') sum += item;
        return sum;
    }, '');
    return `${erors.length}/${s.length}`
}


//* Последовательность Трибоначчи
//? Вариант 1 МОЙ
function tribonacci(signature, n) {
    if (n < 4) return signature.filter((el, ind) => ind < n);

    let result = signature;

    for (let i = 4; i <= n; i++) {
        result.push(result[i - 4] + result[i - 3] + result[i - 2]);
    }
    return result;
}

//? переработнанный мой с учетом инфы ниже
function tribonacci(signature, n) {
    let result = signature;

    for (let i = 4; i <= n; i++) {
        result.push(result[i - 4] + result[i - 3] + result[i - 2]);
    }
    return result.splice(0, n);
}


//*Напишите функцию, которая составляет список строк, представляющих все способы
//*балансировки nпар скобок
//balancedParens(2) => ["()()","(())"]
//? Вариант 1 МОЙ
//! не решил!!!!
//* 1. получаю все возможные комбинации 2. фильтрую верные и убираю дубликаты


//? Вариант 2  НЕ мой
function balancedParens(n, match = 0, str = '', res = []) {
    if (n) balancedParens(n - 1, match + 1, str + '(', res);
    if (match) balancedParens(n, match - 1, str + ')', res);
    if (!n && !match) res.push(str);
    return res;
}


//*Завершите функцию/метод (в зависимости от языка), чтобы вернуть true/ True, когда ее аргумент
//*является массивом, который имеет те же структуры вложенности и ту же соответствующую длину
//* вложенных массивов, что и первый массив.

//? Вариант 1 МОЙ

Array.prototype.sameStructureAs = function (other) {
    if (other.length != this.length) return false;

    for (let i = 0; i < this.length; i++) {

        if (Array.isArray(this[i]) == false && Array.isArray(other[i]) == false) {

        } else if (Array.isArray(this[i]) == Array.isArray(other[i])) {
            return this[i].sameStructureAs(other[i])
        } else return false;
    }
    return true
};

//? Вариант 2  НЕ мой
Array.prototype.sameStructureAs = function (other) {
    return (this.length === other.length) ? this.every(function (el, i) {
        return Array.isArray(el) ? el.sameStructureAs(other[i]) : true;
    }) : false;
};

//*Завершите решение так, чтобы оно принимало список целых чисел в порядке возрастания
//* и возвращало правильно отформатированную строку в формате диапазона.
//* [-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])
//*  "-6,-3-1,3-5,7-11,14,15,17-20")
//? Вариант 1 МОЙ
function solution(list) {

    return list
        .reduce((sum, item, index, arr) => {
            if (item - arr[index - 1] == 1) {
                sum[sum.length - 1].push(item)
            } else sum.push([item]);
            return sum
        }, [])
        .map(row => {
            if (row.length > 2) {
                return `${row[0]}-${row[row.length - 1]}`
            } else return row
        })
        .join(',')
}

//? Вариант 2  НЕ мой
solution = (list) => list.reduce((acc, curr, i) => {
    if (i == 0) return curr.toString();
    if (list[i - 1] == curr - 1 && list[i + 1] == curr + 1) return acc;
    if (list[i - 2] == curr - 2 && list[i - 1] == curr - 1) return acc + "-" + curr;
    return acc + "," + curr;
});

//*Есть секретная строка, которая вам неизвестна. Учитывая набор
//*случайных троек из строки, восстановить исходную строку.
//? Вариант 1 МОЙ
function firstLetter(arr) { // получаем первую букву
    return arr
        .map(item => item[0])
        .filter(first => {
            let pos = arr.reduce((index, row) => {
                let _ind = 0
                if (row.includes(first)) {
                    _ind = row.indexOf(first);
                }
                return index += _ind;
            }, 0)
            return pos == 0;
        })[0];
}

function nextLetters(Letter, arr, word) {
    let selectLetter = arr      //* получаем буквы идущие сразу же за Letter
        .filter(row => row.includes(Letter))
        .map(item => {
            if (item.indexOf(Letter) != 3) {
                return item[item.indexOf(Letter) + 1]
            }
        })
        .filter((_l, _i, _a) => _i == _a.indexOf(_l) && _l !== undefined)

    if (selectLetter.length == 1) {
        return selectLetter
    } else {
        return selectLetter.filter(item => {
            return 0 == checkLetter(item, arr, word)
        })
    }

    function checkLetter(char, arr, word) { //* 0 -ок, если > 0, буква не подходит (есть буквы перед ней, которых нет в массиве результатов word)
        return arr
            .filter(row => row.includes(char) && row.indexOf(char) > 0)
            .map(item => item.slice(0, item.indexOf(char)))
            .map(item => {
                let num = item.reduce((sum, item) => {
                    if (!word.includes(item)) sum++;
                    return sum;
                }, 0);
                return num;
            })
            .reduce((sum, item) => sum += item) //*на выходе число 0 или >
    }
}

function recoverSecret(triplets) {
    let word = [];
    let first = firstLetter(triplets);
    word = word.concat(first);

    let next = nextLetters(first, triplets, word);

    while (next.length) {
        word = word.concat(next);
        next = nextLetters(...next, triplets, word);
    }
    return word.join('');
}

let triplets1 = [
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['w', 'h', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['t', 'u', 'p']
]


//? Вариант 2  НЕ мой
var recoverSecret = function (triplets) {
    for (var [first] of triplets) {
        if (triplets.every(tuple => tuple.indexOf(first) <= 0)) {
            triplets.filter(([item]) => item == first).forEach(tuple => tuple.shift());
            return first + recoverSecret(triplets.filter(tuple => tuple.length > 0));
        }
    }
    return '';
}


//* создать все перестановки непустой входной строки и удалить дубликаты, если они есть.
//*  'ab' = return ['ab', 'ba']
//? Вариант 1 МОЙ
function permutations(list) {

    let lst = Array.from(list);
    let result = [];

    if (lst.length === 1) return lst;

    lst.forEach((item, ind) => {

        let temp = permutations(lst.filter((subItem, z) => {
            if (z != ind) return subItem;
        }));
        temp = temp.map(_set => [item, ..._set]);
        result = [...result, ...temp]
    });
    return result
        .map(item => item.join(''))
        .filter((item, ind, arr) => arr.indexOf(item) == ind)
}


//? Вариант 2  НЕ мой
//!принимает массив
function permutations(arr) {
    let perms = arr.reduce((acc, element) => {
        let updatedPerms = new Set();
        acc.forEach((word) => {
            for (let i = 0; i <= word.length; i++) {
                updatedPerms.add(word.substring(0, i) + element + word.substring(i));
            }
        });
        return updatedPerms;
    }, new Set(['']));
    return [...perms];
}


//* Общие знаменатели для массива чисел
//? Вариант 1 МОЙ

function nod(a, b) {
    if (a == b) {
        return a;
    } else {
        return nod((Math.max(a, b) - Math.min(a, b)), Math.min(a, b))
    }
}

function nok(a, b) {
    return (a * b) / nod(a, b);
}

function multiNok(...arg) {
    let n = nok(arg[0], arg[1]);
    for (let i = 1; i <= arg.length - 2; i++) {
        n = nok(n, arg[i + 1]);
    }
    return n;
}

function convertFrac(lst) {

    let arr = lst.map((item) => {
        if (item[0] == 1) {
            return item;
        } else {
            let x = nod(item[0], item[1]);
            return [item[0] / x, item[1] / x];
        }
    })

    let nokList = multiNok(...arr.reduce((list, item) => {
        list.push(item[1]);
        return list
    }, []))

    return arr
        .map(item => [nokList / item[1] * item[0], nokList])
        .reduce((str, item) => str += `(${item[0]},${item[1]})`, '')
}

//? переработнанный мой с учетом инфы ниже
function nod(a, b) {
    if (a == b) {
        return a;
    } else {
        return nod((Math.max(a, b) - Math.min(a, b)), Math.min(a, b))
    }
}

function nok(a, b) {
    return (a * b) / nod(a, b);
}

function convertFrac(lst) {

    let arr = lst.map((item) => {
        if (item[0] == 1) {
            return item;
        } else {
            let x = nod(item[0], item[1]);
            return [item[0] / x, item[1] / x];
        }
    })

    let nokList = arr.reduce((nk, item) => {
        return nok(nk, item[1])
    }, 1)

    return arr
        .map(item => [nokList / item[1] * item[0], nokList])
        .reduce((str, item) => str += `(${item[0]},${item[1]})`, '')
}


//? Вариант 2  НЕ мой
function gcd(a, b) {
    return a < b ? gcd(b, a) : b == 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}

function convertFrac(lst) {
    var denom = lst.reduce(function (p, c) {
        return lcm(p, c[1]);
    }, 1);
    return lst.map(function (v) {
        return "(" + (v[0] * denom / v[1]) + "," + denom + ")";
    }).join("");
}

//* Меморизированная фибоначи рукурсия
//? Вариант 1 МОЙ
function fibonacci(n) {
    if (n == 0 || n == 1)
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function caching(func) {
    let cach = {};

    return function (arg) {
        if (cach[arg]) {
            return cach[arg]
        } else {
            cach[arg] = func(arg);
            return cach[arg]
        }
    }
}

fibonacci = caching(fibonacci);

// вариант фибо с динамический методом программирования
function fibonacci2(n) {
    // if (n <= 2) return 1
    let n_1 = 1;
    let n_2 = 1;
    let result = 1; // result = 0

    for (let i = 3; i <= n; i++) {
        result = n_1 + n_2;
        n_1 = n_2;
        n_2 = result;
    }
    return result
}


//*В этом ката вы напишете функцию, которая возвращает позиции и значения «пиков»
//*(или локальных максимумов) числового массива.
//? Вариант 1 МОЙ
function pickPeaks(arr) {

    return arr.reduce((sum, num, i, arr) => {

        if (arr[i - 1] < num && num > arr[i + 1]) {
            sum.pos.push(i);
            sum.peaks.push(num);

        } else if (arr[i - 1] < num && num == arr[i + 1]) {
            let pos = i + 1;
            while (num == arr[pos]) pos++;
            if (num > arr[pos]) {
                sum.pos.push(i);
                sum.peaks.push(num);
            }
        }
        return sum;
    }, {pos: [], peaks: []})
}

//* Калькулятор чисел для больших и малых
//? Вариант 1 МОЙ
function add(a, b) {

    let arrA = [...a].reverse();
    let arrB = [...b].reverse();

    let arrBiger = (arrA.length > arrB.length) ? arrA : arrB;
    let arrLitl = (arrA.length > arrB.length) ? arrB : arrA;

    let one = 0;

    return arrBiger.reduce((sumStr, item, index, arr) => {

        let litl = (arrLitl[index] === undefined) ? 0 : arrLitl[index];

        let sum = +item + +litl + one;

        if (one > 0) one--;

        if (sum < 10) {
            return sumStr + sum;

        } else if (sum >= 10 && index == arr.length - 1) {
            return sumStr + sum.toString().split('').reverse().join('')

        } else {
            one++;
            return sumStr + sum.toString().split('')[1]
        }

    }, "").split('').reverse().join('');
}


//*Завершите функцию scramble(str1, str2), которая возвращает, true если часть str1 символов
//* можно переставить, чтобы они соответствовали str2, иначе возвращает false.
//? Вариант 1 МОЙ
function scramble(str1, str2) {

    function obgStr(str) {
        let obj = {};
        for (const leter of str) {
            if (obj[leter] === undefined) {
                let reg = new RegExp(`${leter}`, 'g');
                obj[leter] = str.match(reg).length;
            }
        }
        return obj;
    }

    let list = obgStr(str1);
    let word = obgStr(str2);
    let risult = false;

    outer:
        while (!risult) {
            for (let key in word) {
                if (list[key] == undefined || word[key] > list[key]) break outer;
            }
            risult = true;
        }
    return risult;
}

//? Вариант 2  НЕ мой
function scramble(str1, str2) {
    let occurences = str1.split("").reduce((arr, cur) => {
        arr[cur] ? arr[cur]++ : arr[cur] = 1;
        return arr;
    }, {});
    return str2.split("").every((character) => --occurences[character] >= 0);
}

//*Улитка Учитывая n x nмассив, вернуть элементы массива, расположенные от самых внешних
//*элементов до среднего элемента, перемещаясь по часовой стрелке.
//? Вариант 1 МОЙ
let snaill = function (array) {

    let result = [];
    let rest = array;

    function top(rest) {
        result = result.concat(
            ...rest.splice(0, 1)
        )
    }

    function right(rest) {
        rest.forEach(
            i => result = result.concat(
                i.splice(-1, 1)
            )
        )
    }

    function down(rest) {
        result = result.concat(
            ...rest
                .splice(-1, 1)
                .map(i => i.reverse())
        )
    }

    function left(rest) {
        rest
            .reverse()
            .forEach(
                i => result = result.concat(
                    i.splice(0, 1)
                )
            )
        rest.reverse();
    }

    while (rest.length > 0) {
        if (rest.length > 0) top(rest);
        if (rest.length > 0) right(rest);
        if (rest.length > 0) down(rest);
        if (rest.length > 0) left(rest);
    }
    return result;
}


//? переработнанный мой с учетом инфы ниже
const ssnail = function (array) {

    let result = [];
    let rest = array;

    while (array.length) {

        result = result.concat(
            ...rest.shift(),
            ...rest.map(i => i.pop())
        )

        rest
            .reverse()
            .map(i => i.reverse());
    }
    return result;
}


//? Вариант 2  НЕ мой
const snail = function (array) {
    const list = [];

    while (array.length) {
        list.push(...array.shift(), ...array.map(row => row.pop()));

        array.reverse().map(row => row.reverse());
    }

    return list;
}

//*Завершите решение так, чтобы оно удаляло весь текст, следующий за любым из переданных маркеров
//*комментариев. Все пробелы в конце строки также должны быть удалены.
//? Вариант 1 МОЙ
function solution(input, markers) {
    let arrStr = input.split('\n');
    let risult = [];

    outer:
        for (let str of arrStr) {
            for (let m of markers) {
                if (str.includes(m)) {
                    let back = str.split(m);
                    risult.push(back[0].trim());
                    continue outer;
                }
            }
            risult.push(str.trim())
        }
    return risult.join('\n')

}

//? переработнанный мой с учетом инфы ниже

function solution(input, markers) {
    let arrStr = input.split('\n');
    let risult = [];

    outer:
        for (let str of arrStr) {
            for (let m of markers) {
                if (str.includes(m)) {

                    risult.push(str.split(m)[0].trim());
                    continue outer;
                }
            }
            risult.push(str.trim())
        }
    return risult.join('\n')

}


//? Вариант 2  НЕ мой
function solution(input, markers) {
    return input.split('\n').map(
        line => markers.reduce(
            (line, marker) => line.split(marker)[0].trim(), line
        )
    ).join('\n')
}


//*Дан массив целых чисел, найдите то, которое встречается нечетное количество раз.
//*Всегда будет только одно целое число, которое встречается нечетное количество раз.
// [1,1,2]должен вернуть 2, потому что это происходит 1 раз (что нечетно).
// [0,1,0,1,0]должен вернуть 0, потому что он встречается 3 раза (что нечетно).
//? Вариант 1 МОЙ
function findOdd(A) {

    return Number(
        A.map((item, index, arr) => {
            if (arr.filter((el) => el == item).length % 2 !== 0) {
                return item
            }
        })
            .filter((el, ind, ar) => el !== undefined
                && ind == ar.indexOf(el))
    )
}

//? переработнанный мой с учетом инфы ниже
function findOdd(A) {

    return A
        .find((item, index, arr) => {
            if (arr.filter((el) => el == item).length % 2 !== 0) return item
        })
}


//? Вариант 2  НЕ мой

function findOdd(arr) {
    return arr.find((item, index) => arr.filter(el => el == item).length % 2)
}


//*
/*преобразовать строку в новую строку, где каждый символ в новой строке соответствует тому,
"("если этот символ появляется только один раз в исходной строке или ")"если этот символ появляется
 в исходной строке более одного раза. Игнорировать заглавные буквы при определении,
 является ли символ дубликатом.*/

//? Вариант 1 МОЙ
function duplicateEncode(word) {
    word = word.toLowerCase();
    let result = "";
    for (let i = 0; i < word.length; i++) {
        let pos = 0;
        let count = 0;
        while (true) {
            let foundPos = word.indexOf(word[i], pos);
            if (foundPos == -1) {
                (count > 1) ? result += ')' : result += '(';
                break;
            }
            pos = foundPos + 1;
            count += 1;
        }
    }
    return result;
}

//? Вариант 2  НЕ МОЁ

function duplicateEncode(word) {
    return word
        .toLowerCase()
        .split('')
        .map(function (a, i, w) {
            return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')'
        })
        .join('');
}


//*Напишите функцию проверяющая скобки
//? Вариант 1 МОЙ
function validParentheses(parens) {
    let arrParens = parens.split('');
    outer:
        while (true) {
            if (arrParens[0] == ')' || arrParens[arrParens.length - 1] == '(') break;
            if (arrParens.length == 0) return true;

            for (let i = 1; i < arrParens.length; i++) {
                if (i !== arrParens.indexOf(arrParens[i])) continue;
                arrParens.splice(--i, 2);
                continue outer;
            }
            break;
        }
    return false
}

//? Вариант 2 МОЙ НЕ МОЁ
function validParentheses(parens) {
    var n = 0;
    for (var i = 0; i < parens.length; i++) {
        if (parens[i] == '(') n++;
        if (parens[i] == ')') n--;
        if (n < 0) return false;
    }
    return n == 0;
}

//? Вариант 3 НЕ МОЁ
function validParentheses(parens) {
    var indent = 0;
    for (var i = 0; i < parens.length && indent >= 0; i++) {
        indent += (parens[i] == '(') ? 1 : -1;
    }
    return (indent == 0);
}

//*
/*Напишите функцию, которая найдет все анаграммы слова из списка. Вам будет дано два входа слово и
массив со словами. Вы должны вернуть массив всех анаграмм или пустой массив, если их нет.*/

//? Вариант 2  МОЙ

function anagrams(word, words) {
    let result = [];
    words.forEach(item => {
        if (word.length != item.length) return;
        if (word.split('').sort().join('') == item.split('').sort().join('')) result.push(item);
    });
    return result;
}


//? Вариант 1  МОЙ
function anagrams(word, words) {

    let result = [];
    let length = word.length;

    outer:
        for (let i = 0; i < words.length; i++) {

            if (word.length != words[i].length) continue;

            let maybe = Array.from(words[i]);
            let mask = Array.from(word);

            for (let n = 0; n < length; n++) {

                let index = maybe.indexOf(mask[0]);
                if (index === -1) continue outer;
                mask.splice(0, 1);
                maybe.splice(index, 1);

            }
            result.push(words[i])
        }
    return result;
}

//*
/*Создайте функцию, принимающую положительное целое число в качестве параметра и
возвращающую строку, содержащую римское числовое представление этого целого числа.*/

function solution(number) {

    let strnumber = String(number).split('');

    let numberRim = [
        ['I', 'V', 'X'],
        ['X', 'L', 'C'],
        ['C', 'D', 'M'],
        ['M']
    ];

    let rimnumberer = [];

    strnumber.forEach((item, index, arstr) => {
        addResult(item, numberRim[arstr.length - ++index], rimnumberer);
    });

    function addResult(number, arr, result) {
        let first = 1;
        if (number == 0) {

        } else if (number > 5 && number < 9) {
            result.push(arr[1]);
            while ((number - 4) - first++) result.push(arr[0]);
        } else if (number >= 1 && number < 4) {
            while ((+number + 1) - first++) result.push(arr[0]);
        } else if (number == 4) {
            result.push(arr[0]);
            result.push(arr[1]);
        } else if (number == 9) {
            result.push(arr[0]);
            result.push(arr[2]);
        } else result.push(arr[1]);

    }

    return rimnumberer.join('');
}

//* не моё решение
function solution(number) {
    // convert the number to a roman numeral
    let roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }
    let ans = '';

    for (let key in roman) {
        while (number >= roman[key]) {
            ans = ans + key;
            number = number - roman[key];
        }
    }
    return ans;
}


//*
/*Завершите findNextSquareметод, который находит следующий целочисленный идеальный квадрат после квадрата,
переданного в качестве параметра. Напомним, что целочисленный совершенный квадрат — это целое число n,
такое что sqrt(n) также является целым числом.
Если параметр сам по себе не является идеальным квадратом -1, его следует вернуть.
Вы можете предположить, что параметр неотрицательный.*/

function findNextSquare(sq) {
    let prev = sq ** (1 / 2);
    return (Math.ceil(prev) - prev > 0) ? -1 : Math.pow(++prev, 2);
}

//*
/*Реализуйте функцию unique_in_order, которая принимает в качестве аргумента
последовательность и возвращает список элементов без каких-либо элементов с одинаковым
значением рядом друг с другом и с сохранением исходного порядка элементов.
Test.assertSimilar(uniqueInOrder('AAAABBBCCDAABBB'), ['A','B','C','D','A','B'])*/

let uniqueInOrder = function (iterable) {

    return Array.from(iterable).filter((item, index, arr) => {
        while (index < arr.length) {
            return (item !== arr[++index])
        }
    });
}
console.log(uniqueInOrder('AAAABBBCCDAABBB'));

//*прогулка по городу - каждая буква это сторона света. Одна буква - путь в одну минуту
//* нужно вернуться в исходную точку через 10 минут

let walk = ['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's'];
//let walk = ['w', 'e', 'w', 's'];
let path = 0;


function isValidWalk(walk) {

    if (walk.length == 10) {

        let vertical = [];
        let horizon = [];

        walk.forEach(leter => {
            (leter == 'w') ? vertical.push(-1) :
                (leter == 'e') ? vertical.push(1) :
                    (leter == 'n') ? horizon.push(1) :
                        horizon.push(-1);
        });
        let pathVertical = vertical.reduce((sum, item) => sum + item, 0);
        let pathHorizon = horizon.reduce((sum, item) => sum + item, 0);

        if (pathVertical == 0 && pathHorizon == 0) {
            return true
        } else return false

    } else return false

}


//* отфильтровать гласные в строке
function disemvowel(str) {
    let vowels = "aeiou";

    let result = str.split('').filter(leter => {
        return !vowels.includes(leter.toLowerCase())
    });
    str = result.join('');

    return str;
}

//let str = "This website is for losers LOL!"
//console.log(disemvowel(str));
//!------------------UP CODEWARS----------------------------------------------
//* Напишите код, который выводит все простые числа из интервала от 2 до n.
let start = 2;
let end = 15;

outer:
    for (start; start < end; start++) {

        for (let i = 2; i < start; i++) {

            if (start % i == 0) continue outer;
        }
        console.log(start);
    }

//*Напишите функцию pow(x,n), которая возвращает x в степени n.
let pow = (x, n) => (n == 1) ? x : x * pow(x, n - 1);


//* Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
//sumTo(n) = n + sumTo(n-1) for n > 1.

function sumTo(n) {
    // let sum = 0
    // for (let i = 0; i <= n; i++) {
    // 	sum = sum + i;
    // }
    // return sum;

    return (n == 1) ? n : n + sumTo(n - 1);
}

console.log(sumTo(22));

//* Замените код Function Expression стрелочной функцией

let ask = (question, yes, no) => (confirm(question)) ? yes() : no();
result
ask(
    "Вы согласны?",
    () => alert("Вы согласились."),
    () => alert("Вы отменили выполнение."),
);


//*Вычислить факториал  ============================================================================
//Подсказка: n! можно записать как n * (n-1)! Например: 3! = 3*2! = 3*2*1! = 6
function factorial(n) {
    if (n == 2) {
        return n;
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(5));

//*Числа Фибоначчи ======================================================================================
//Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.
//Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2.
//То есть, следующее число получается как сумма двух предыдущих.
//Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....

function fib(n) {
    if (n == 1 || n == 2) {
        return 1;
    } else {
        let arr = [];
        for (let i = 2; i < n; i++) {
            arr[0] = 0;
            arr[1] = 1
            arr[i] = arr[i - 1] + arr[i - 2];
        }
        return arr[n - 1] + arr[n - 2];
    }
}

// вторая версися
function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;

}

console.log(fib(77));

//*Вывод односвязного списка =======================================================================
//Напишите функцию printList(list), которая выводит элементы списка по одному.
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};


let vr = []

function printList(arr) {
    vr.push(arr.value);
    if (arr.next) {
        printList(arr.next)
    }
}

printList(list);
console.log(vr);

//* Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.
// Да, именно таким образом, используя двойные круглые скобки (не опечатка).
// sum(1)(2) = 3

function sum(x) {

    function summ(b) {
        return b + x;
    }

    return summ;
}

let result = sum(5)(-1);
console.log(result);

//*Сделайте набор «готовых к употреблению» фильтров:
// Они должны использоваться таким образом:
// arr.filter(inBetween(3,6)) – выбирает только значения между 3 и 6 (включительно).
// arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива

let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
    return item => (item >= a && item <= b);
}

function inArray(ar) {
    return item => ar.includes(item);
}

let res = arr.filter(inBetween(3, 6));
let res2 = arr.filter(inArray([1, 2, 10]));

console.log(res);
console.log(res2);

//*Напишите функцию byField, которая может быть использована для этого.
//У нас есть массив объектов, который нужно отсортировать:
//Обычный способ был бы таким:

// по имени (Ann, John, Pete)
//users.sort((a, b) => a.name > b.name ? 1 : -1);

// по возрасту (Pete, Ann, John)
//users.sort((a, b) => a.age > b.age ? 1 : -1);

// Можем ли мы сделать его короче, скажем, вот таким?

// users.sort(byField('name'));
// users.sort(byField('age'));

// То есть, чтобы вместо функции, мы просто писали byField(fieldName).
//Напишите функцию byField, которая может быть использована для этого.

let users = [
    {name: "John", age: 20, surname: "Johnson"},
    {name: "Pete", age: 18, surname: "Peterson"},
    {name: "Ann", age: 19, surname: "Hathaway"}
];

function byField(fieldName) {
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;

}

console.log(users.sort(byField('age')));

//* Измените код makeCounter() так, чтобы счётчик мог увеличивать и устанавливать значение:
// counter() должен возвращать следующее значение (как и раньше).
// counter.set(value) должен устанавливать счётчику значение value.
// counter.decrease() должен уменьшать значение счётчика на 1.
// Посмотрите код из песочницы с полным примером использования.

// P.S. Для того, чтобы сохранить текущее значение счётчика, можно воспользоваться как
//замыканием,
// так и свойством функции. Или сделать два варианта решения: и так, и так.

function makeCounter() {

    function counter() {
        return counter.count++;
    }

    counter.count = 0;

    counter.set = (value) => counter.count = value;
    counter.decrease = () => --counter.count;

    return counter;
}

let counter = makeCounter();

counter.set(10);
alert(counter()); // 1
alert(counter()); // 1
counter.set(5);
alert(counter()); // 1
alert(counter()); // 1
counter.decrease();
alert(counter()); // 1

//*Напишите функцию printNumbers(from, to),
//*которая выводит число каждую секунду, начиная от from и заканчивая to.
// Сделайте два варианта решения.
// Используя setInterval.
// Используя рекурсивный setTimeout.


function printNumbers(from, to) {

    let timerId = setInterval(show, 2000);

    function show() {
        if (from == to) clearInterval(timerId);
        alert(from);
        return from++;
    }
}

printNumbers(2, 5);

function printNumbers(from, to) {

    setTimeout(show, 2000);

    function show() {
        alert(from);
        if (from < to) setTimeout(show, 2000);
        return from++;
    }
}

function printNumbers(from, to) {

    setTimeout(function show() {
        alert(from);
        if (from < to) setTimeout(show, 2000);
        return from++;
    }, 2000);
}

printNumbers(2, 5);

//*перебор вариантов рекурсия РАЗНЫХ ЗАНЧЕНИЙ
//*входящее значение МАССИВ

function pern(lst) {
    //let lst = Array.from(lsttt);//* либо деламем массив

    let result = [];
    if (lst.length === 1) return lst;

    lst.forEach(item => {

        let temp = pern(lst.filter(subItem => subItem != item));
        temp = temp.map(_set => {
            return [item, ..._set]
        });
        result = [...result, ...temp]
    });

    return result
}

//*перебор вариантов рекурсия ЗАНЧЕНИЯ могут быть ОДИНАКОВЫМИ
//*входящее значение МАССИВ
function pern(lst) {
    let result = []

    if (lst.length === 1) return [lst];

    lst.forEach((item, ind) => {

        let temp = pern(lst.filter((subItem, z) => {
            if (z != ind) return subItem;
        }));
        temp = temp.map(_set => [item, ..._set]);
        result = [...result, ...temp]
    });

    return result
}

//*Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
// *После этого должен работать такой код:

// function f() {
//   alert("Hello!");
// }

// f.defer(1000); // выведет "Hello!" через 1 секунду*/


Function.prototype.defer = function (ms) {

    setTimeout(this, ms);
}

//* Напишите функцию sum, которая бы работала следующим образом:
// *   sum(1)(2)(3) == 6; // 1 + 2 + 3

function sum(a) {

    let allSum = a;

    function func(b) {
        allSum += b;
        return func;
    }

    func.toString = function () {
        return allSum;
    }

    return func;

}

//alert(sum(1)(2)(3));

//* мы вызываем debounce, это гарантирует, что все остальные вызовы будут
//*  игнорироваться в течение ms.

function log(x) {
    console.log(x)
}

function debounce(func, ms) {

    let timer = true;

    return function () {

        if (!timer) return;
        func.apply(this, arguments);
        timer = false;
        setTimeout(() => timer = true, ms);
    }
}

let func = debounce(log, 2000);

// func.js(3);
// func.js(4);
// setTimeout(() => func.js(5), 2500)


//* Тормозящий (throttling) декоратор
//*Отличие от debounce – если проигнорированный вызов является последним во
//*время «задержки», то он выполняется в конце.

function throttle(func, ms) {

    let value = 0;
    let timer = true;

    function wrapper() {

        value = arguments;

        if (!timer) return;

        func.apply(this, arguments);
        timer = false;


        setTimeout(() => {
            timer = true;
            if (value) {
                wrapper.apply(this, value);
                value = null;
            }
        }, ms);
    }

    return wrapper;
}


/*let f2000 = throttle(log, 2000);*/

// f2000(2);
// f2000(3);
// f2000(4);
// f2000(5);
// f2000(6);







