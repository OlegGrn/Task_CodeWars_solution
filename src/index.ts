function cakes(recipe: any, available: any) {
    let result: number = Infinity

    for (let key in recipe) {
        if (!(key in available)) {
            result = 0;
            break
        }
        let candidate: number = Math.floor(available[key] / recipe[key])
        result = Math.min(candidate, result)

    }
    return result
}