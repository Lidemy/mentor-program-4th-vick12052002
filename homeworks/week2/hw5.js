function join(arr, concatStr) {
    var res = ""
    if(arr.length===0){
        return ""
    }
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            res += arr[i].toString()
        } else {
            res += (arr[i].toString()) + concatStr
        }
    }
    return res
}
function repeat(str, times) {
    let res = ""
    for (var i = 0; i < times; i++) {
        res += str
    }
    return res
}

console.log(join(['a'], '!'));
// console.log(repeat('a', 5));






