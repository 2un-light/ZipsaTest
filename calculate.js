/**
 * Simple, safe Calculator factory
 * - 입력값 검사 (숫자 여부)
 * - 로그 온/오프 옵션
 * - 연산 이력 저장 (getHistory / clearHistory)
 * - 체이닝 API 지원 (chain)
 */
function createCalculator({ enableLog = true } = {}) {
  const history = [];

  const safeNumber = (v) => {
    if (typeof v !== "number" || Number.isNaN(v)) {
      throw new TypeError(`Invalid number: ${v}`);
    }
    return v;
  };

  const record = (op, a, b, result) => {
    const entry = { op, a, b, result, time: new Date().toISOString() };
    history.push(entry);
    if (enableLog) {
      console.log(`📌 [${entry.time}] ${a} ${op} ${b} = ${result}`);
    }
    return result;
  };

  const add = (a, b) => record("+", safeNumber(a), safeNumber(b), a + b);
  const subtract = (a, b) => record("-", safeNumber(a), safeNumber(b), a - b);
  const multiply = (a, b) => record("*", safeNumber(a), safeNumber(b), a * b);
  const divide = (a, b) => {
    safeNumber(a);
    safeNumber(b);
    if (b === 0) {
      const res = Infinity;
      // 기록은 남기되 경고 출력
      if (enableLog) console.warn("⚠️ divide by zero → Infinity");
      return record("/", a, b, res);
    }
    return record("/", a, b, a / b);
  };

  // 체이닝 지원: chain(start).add(1).multiply(2).value()
  const chain = (start = 0) => {
    let acc = safeNumber(start);
    const chainObj = {
      add: (v) => { acc = add(acc, v); return chainObj; },
      subtract: (v) => { acc = subtract(acc, v); return chainObj; },
      multiply: (v) => { acc = multiply(acc, v); return chainObj; },
      divide: (v) => { acc = divide(acc, v); return chainObj; },
      value: () => acc,
    };
    return chainObj;
  };

  return {
    // operations
    add, subtract, multiply, divide,

    // history & config
    getHistory: () => [...history],
    clearHistory: () => { history.length = 0; },

    // logging toggle at runtime
    enableLogging: () => { enableLog = true; },
    disableLogging: () => { enableLog = false; },

    // chain helper
    chain,
  };
}

/* =========================
   사용 예시
   ========================= */
const calc = createCalculator({ enableLog: true });

calc.add(3, 2);            // 로그 + 결과 기록
calc.subtract(10, 4);
calc.multiply(5, 3);
calc.divide(12, 3);

// divide by zero -> Infinity 경고 + 기록
calc.divide(9, 0);

// 체이닝 예시
const result = calc.chain(2).add(3).multiply(4).divide(2).value(); // ((2+3)*4)/2 = 10
console.log("chain result:", result);

// 이력 확인
console.log("history:", calc.getHistory());

// 로깅 끄기
calc.disableLogging();
calc.add(1, 1); // 콘솔에 로그 안뜸, 이력엔 남음
