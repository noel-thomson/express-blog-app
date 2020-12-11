const speak = () => {
  console.log('hello, ninjas');
};

speak();

// Global Object

// console.log(global);

setTimeout(() => {
  console.log('cleared');
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log('repeat until...');
}, 1000);

console.log(__dirname);
console.log(__filename);
