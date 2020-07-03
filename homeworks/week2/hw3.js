function reverse(str) {
    var array = str.split("")
    var newArray = []
    for (var i = 0; i < str.length; i++){
       newArray.push(array.pop()) 
    }
    console.log(newArray.join(""))
}
reverse('hello');
