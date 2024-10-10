/**
 * "books.category_id" -> "\`books\`.\`category_id\`"
 * @param {string} identifiers
 * @returns {string}
 */
export function wrapBacktick(identifiers) {
    return identifiers
        .split(".")
        .map((id) => {
            if (Number.isNaN(+id)) return `\`${id}\``;
            return id;
        })
        .join(".");
}

/**
 * "books.category_id = category.id" -> "\`books\`.\`category_id\` = \`category\`.\`id\`"
 * @param {string} expression
 * @returns {string}
 */
export function wrapBacktickExpression(expression) {
    const operators = /(=|>|<|>=|<=|!=|\+|-|\/|\bAND\b|\bOR\b|\|\||&&|\bLIKE\b|\bBETWEEN\b)/i;
    const stringLiteral = /['"].*['"]/; // 작은따옴표 또는 큰따옴표로 감싸진 문자열
    const asteriskInFunction = /\b\w+\(\s*\*\s*\)/; // 함수 안에 '*'가 있는 패턴 COUNT(*)
    const multiplyAsterisk = /\*/; // 곱하기 연산자

    const tokens = expression.match(/(\w+\(\s*\*\s*\)|\*|['"].*['"]|[^\s]+|[\s]+)/g); // (함수 안의 * | 그냥 * | 따옴표로 감싸진 문자열 | 문자열 | 공백)을 기준으로 토큰화
    // 정규식을 이용해 연산자를 기준으로 분리
    return tokens
        .map((token) => {
            // 함수 안의 *인 경우 그대로 반환
            if (asteriskInFunction.test(token)) {
                return token;
            }

            // 토큰이 연산자인 경우 그대로 반환
            if (operators.test(token) || multiplyAsterisk.test(token)) {
                return token;
            }

            // 토큰이 문자열 리터럴일 경우 백틱으로 감싸지 않음
            if (stringLiteral.test(token)) {
                return token;
            }

            // 토큰이 space 문자일 경우 빈 문자열 반환
            if (token === " ") {
                return " ";
            }
            // 연산자가 아닌 경우 백틱 처리
            return wrapBacktick(token.trim());
        })
        .join("");
}
