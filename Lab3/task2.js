function sum() {

    if (Array.isArray(this) === false)
        return false;
    var res = 0;
    for (var i = 0; i < this.length; i++){

        if (typeof this[i] === "number")
            res += this[i];
    }
    return res;
}

console.log(sum.call([5, 5, 5, 5, 5, 5, 5, 5, 5]));