import { wrapBacktick, wrapBacktickExpression } from "../utils/backtick.js";

function wrapBacktickTest() {}

function wrapBacktickExpressionTest() {
    // given
    const inputs = ["price > 10", "name LIKE 'Herry Potter'", "COUNT(*) > 1"];

    // when
    const results = inputs.map((input) => wrapBacktickExpression(input));

    // then
    const expected = ["`price` > 10", "`name` LIKE 'Herry Potter'", "COUNT(*) > 1"];

    // 결과와 기대값 출력
    console.log("Results:", results);
    console.log("Expected:", expected);

    const isPass = results.every((result, i) => result === expected[i]);
    console.log(`wrapBacktickExpression : ${isPass}`);
}

wrapBacktickExpressionTest();
