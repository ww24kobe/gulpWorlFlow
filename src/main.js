let a = 100;
class Person {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}

let obj = new Person('小白')

var foo = (a, b) => a + b;

console.log(foo(10, 30)); // 40