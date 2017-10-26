const z = 6;
const currentIndex = 6;

const aVariable = 6;

const number = 6;

function factorial(num) {
  return num > 2 ? num * factorial(num - 1) : num > 1 ? num * 2 : num;
}

function dosmthing() {
  const number1 = add(3, 6);
  const number2 = add(4, 5);
}

function add(x, y) {
  return x + y;
}

factorial(number);


const arr = [6,3,8,4,5,1];

const doubledArr = arr.map(item => item*2);
const filteredArr = arr.filter(item => item > 3); // [6,8,4,5]
const sum = arr.reduce((sum, item) => sum+item, 0); // 27
const number6 = arr.find(item => item === 6);