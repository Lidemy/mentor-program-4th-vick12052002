function capitalize(str) {
    var newStr = str.split("")
    if (/[a-z]/.test(newStr[0])) {
        var oneUp = newStr[0].toUpperCase()
        newStr.splice(0, 1, oneUp)
        let res = newStr.join("")
        return res
    }
    else {
        return str
    }
}

console.log(capitalize('hello'));
