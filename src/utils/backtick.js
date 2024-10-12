const pattern = {
    operators: /(\bAND\b|\bOR\b|\bLIKE\b|\bBETWEEN\b)/i,
    selectExpr: /(\w+\.\w+|\w+)/g,
    identifier: /(\w+)/g,
    digit: /\b\d+\b/,
    string: /('\s*.*?\s*'|"\s*.*?\s*")/,
    func: /\w+\((\s*.*\s*)\)/,
};

export function wrapIdentifier(identifier) {
    return identifier.replace(pattern.identifier, "`$1`");
}

export function recurseFuncBracket(func) {
    return func.replace(pattern.func, (match, p1) => {
        return match.replace(p1, wrapBacktickExpression(p1));
    });
}
/**
 * "books.category_id = category.id" -> "\`books\`.\`category_id\` = \`category\`.\`id\`"
 * @param {string} expression
 * @returns {string}
 */
export function wrapBacktickExpression(expression) {
    return expression.replace(
        /('\s*.*?\s*'|"\s*.*?\s*"|\bAND\b|\bOR\b|\bLIKE\b|\bBETWEEN\b|\w+\(\s*.*\s*\)|\d+|\w+\.\w+|\w+)/g,
        (match, p1) => {
            if (pattern.string.test(p1)) return p1;
            else if (pattern.operators.test(p1)) return p1;
            else if (pattern.func.test(p1)) return recurseFuncBracket(p1);
            else if (pattern.digit.test(p1)) return p1;
            else return wrapIdentifier(p1);
        },
    );
}
