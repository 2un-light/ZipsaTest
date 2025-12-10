function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("0으로는 나눌 수 없습니다!");
  }
  return a / b;
}

// 사용 예시
console.log(add(3, 2));       // 5
console.log(subtract(5, 1));  // 4
console.log(multiply(4, 3));  // 12
console.log(divide(10, 2));   // 5
