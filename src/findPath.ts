/*const a: string[] = ["b", "c"];
const b: string[] = ["d", "e"];
const c: string[] = ["f", "g"];
const d: string[] = ["h", "i"];
const e: string[] = ["j", "k"];
const f: string[] = ["l", "m"];
const g: string[] = ["n", "o"];*/

interface IData {
    a: ["b", "c", "p"],
    b: ["d", "e", "q"],
    c: ["f", "g"],
    d: ["h", "i"],
    e: ["j", "k"],
    f: ["l", "m"],
    g: ["n", "o"],
}

const data: IData = {
    a: ["b", "c", "p"],
    b: ["d", "e", "q"],
    c: ["f", "g"],
    d: ["h", "i"],
    e: ["j", "k"],
    f: ["l", "m"],
    g: ["n", "o"],
}

// a => m  a,c,f,m
async function another(str: string, base: IData) {
    // @ts-ignore
    return base[str]
}

async function getPath({from, to, data, func}: {
    from: string
    to: string,
    data: IData,
    func: any
}) {
    //создаем очередь с началом пути внутри
    let queue: string[] = [from];
    //создаем объект пройденного пути
    let passedPath: any = {};
    let isFindEnd: string | undefined = undefined;


    while (queue.length > 0) {
        //выходим из цикла если закончилась
        if (queue.length === 0) break
        //получаем первый город из очереди
        let firstInQueue: string | undefined = queue.shift()

        //получаем первый набор городов из базы
        let cities: string[] | undefined = await func(firstInQueue, data);

        // проверяем на конечный путь каждый город в массиве
        isFindEnd = cities?.find(city => {
            if (firstInQueue !== undefined) {
                //закидываем в пройденный путь контрольную точку
                passedPath[firstInQueue] = passedPath[firstInQueue]
                    ? passedPath[firstInQueue] + "," + city
                    : city;
                //закидываем в очередь город
                queue.push(city)
            }
            // возвращаем результат проверки
            return city.localeCompare(to) === 0
        })
        //выходим из цикла если нашли конечную точку
        if (isFindEnd) {
            break
        }
    }

    if (isFindEnd) {
        //в результат помещаем конечную точку
        let result: string[] = [to];
        let currentPoint: string = to;
        while (currentPoint !== from) {
            //функция ищет какой ключ в passedPath содержит currentPoint и возвращает его
            //перезаписываем найденным ключом currentPoint
            currentPoint = searchPoint(passedPath, currentPoint)
            //найденный ключ закидываем начало результата
            result.unshift(currentPoint)
        }
        return result
    } else return "нет пути"
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
function searchPoint(path: any, point: string): string {
    let reg = new RegExp(`\\b${point}\\b`)
    for (let key in path) {
        if (reg.test(path[key])) {
            return key
        }
    }
}








