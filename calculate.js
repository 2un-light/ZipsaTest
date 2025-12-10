// 사칙연산 모듈
const Calculator = {
  log(result) {
    console.log(`📌 결과: ${result}`);
    return result; // 체이닝 가능하도록 반환
  },

  add: (a, b) => Calculator.log(a + b),

  subtract: (a, b) => Calculator.log(a - b),

  multiply: (a, b) => Calculator.log(a * b),

  divide: (a, b) => {
    if (b === 0) {
      console.warn("⚠️ 0으로 나누려고 했습니다. Infinity 반환!");
      return Infinity;
    }
    return Calculator.log(a / b);
  },
};

// 사용 예시
Calculator.add(3, 2);       // 📌 결과: 5
Calculator.subtract(10, 4); // 📌 결과: 6
Calculator.multiply(5, 3);  // 📌 결과: 15
Calculator.divide(9, 0);    // ⚠️ ... Infinity
Calculator.divide(12, 3);   // 📌 결과: 4
