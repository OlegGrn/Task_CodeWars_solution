
function doTest(str: string){
    const reg =/^[A-Za-z\d](?=.*[a-z])[A-Za-z\d]{5,}$/ ;

    console.log(str.match(reg))

    return reg.test(str)
}

console.log(doTest("8l5S3KHS27"))