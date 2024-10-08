/**
 * "books.category_id" -> "\`books\`.\`category_id\`"
 * @param {string} identifiers
 * @returns {string}
 */
export function wrapBacktick(identifiers) {
    // identifiers가 객체일 경우 { key : value } => key
    return identifiers
        .split(".")
        .map((id) => `\`${id}\``)
        .join(".");
}

/**
 * "books.category_id = category.id" -> "\`books\`.\`category_id\` = \`category\`.\`id\`"
 * @param {string} expression
 * @returns {string}
 */
export function wrapBacktickExpression(expression) {
    const regex = /(=|>|<|>=|<=|!=|\+|-|\*|\/|\bAND\b|\bOR\b|\|\||&&|\bLIKE\b|\bBETWEEN\b)/i;
    // 정규식을 이용해 연산자를 기준으로 분리
    return expression
        .split(regex)
        .map((token) => {
            // 토큰이 연산자가 아닐 경우
            if (!regex.test(token)) {
                return wrapBacktick(token.trim());
            }
            return token;
        })
        .join(" ");
}
