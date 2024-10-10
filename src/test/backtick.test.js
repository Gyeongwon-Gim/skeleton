import { wrapBacktick, wrapBacktickExpression } from "../utils/backtick.js";

function wrapBacktickTest() {}

function wrapBacktickExpressionTest() {
    // given
    const inputs = ["price > 10", "name LIKE Herry Potter"];

    // when
    const results = inputs.map((input) => wrapBacktickExpression(input));

    // then
    const expected = ["`price` > 10", "name LIKE 'Herry Potter'"];
    const isPass = results.every((result, i) => result === expected[i]);
    console.log(`wrapBacktickExpression : ${isPass}`);
}

wrapBacktickExpressionTest();
