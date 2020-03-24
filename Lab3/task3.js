const object1 = {
    name: 'Boris',
    weight: 15
};

const object2 = {
    name: 'Boris',
    weight: 15
};

const object3 = {
    name: 'Rex',
    weight: 20,
};

function isEquivalent(object1, object2) {
    var props1 = Object.getOwnPropertyNames(object1);
    var props2 = Object.getOwnPropertyNames(object2);

    if (props1.length !== props2.length) {
        return false;
    }
    
    for (var i = 0; i < props1.length; i++) {
        var propName = props1[i];

        if (object1[propName] !== object2[propName]) {
            return false;
        }
    }

    return true;
}

console.log(isEquivalent(object1, object2));
console.log(isEquivalent(object1, object3));

