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
    const operators = /(=|>|<|>=|<=|!=|\+|-|\*|\/|\bAND\b|\bOR\b|\|\||&&|\bLIKE\b|\bBETWEEN\b)/i;
    const stringLiteral = /^['"].*['"]$/;  // 작은따옴표 또는 큰따옴표로 감싸진 문자열

    return expression
        .split(operators)
        .map((token) => {
            // 토큰이 연산자일 경우 그대로 반환
            if (operators.test(token)) {
                return token;
            }

            // 토큰이 문자열 리터럴일 경우 백틱으로 감싸지 않음
            if (stringLiteral.test(token.trim())) {
                return token.trim();
            }

            // 그 외의 경우 백틱으로 감싼다 (테이블명, 컬럼명 등)
            return wrapBacktick(token.trim());
        })
        .join(" ");
}