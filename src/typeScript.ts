
function cuckoo(inputTime: string, chimes: number){

    let arr: string[] = inputTime.match(/\d{2}/g) || [];
    let [hours, min] = arr.map(i => +i);

    min = min % 15 ? Math.ceil(min/15) * 15: min;

    while (chimes > 0){
        if(min === 0 || min === 60){
            hours = min === 60? (hours === 12? 1: ++hours) : hours;
            chimes -= hours;
            min = chimes > 0? 15: 0
        } else {
            chimes--;
            min = chimes > 0? min + 15: min;
        }
    }
    let newHours: string = hours.toString().padStart(2, "0")
    let newMin: string = min.toString().padStart(2, "0")

    return (newHours + ":" + newMin)
}

console.log(
    cuckoo("03:38", 19)
)





