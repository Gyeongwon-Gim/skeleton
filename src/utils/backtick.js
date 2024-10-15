const pattern = {
    operators: /(\bAND\b|\bOR\b|\bLIKE\b|\bBETWEEN\b)/i,
    reserved:
        /(\bSELECT\b|\bDELETE\b|\bUPDATE\b|\bINSERT\b|\bFROM\b|\bWHERE\b|\bSET\b|\bVALUES\b|((LEFT|RIGHT)\sJOIN|JOIN)|\bORDER BY\b|\bLIMIT\b|\bINTO\b|\bHAVING\b|\bGROUP BY\b|\bDISTINCT\b|\bAS\b|\bINTERVAL\b|\bMONTH\b|\bDAY\b|\bYEAR\b|\bOFFSET\b|\bEXISTS\b|\bON\b|\bIN\b|\bASC\b|\bDESC\b)/i,
    identifier: /(\w+)/g,
    digit: /\b\d+\b/,
    string: /('\s*.*?\s*'|"\s*.*?\s*"|`\s*.*?\s*`)/,
    func: /\w+\((\s*.*\s*)\)/,
};

export function wrapIdentifier(identifier) {
    return identifier.replace(pattern.identifier, "`$1`");
}

export function recurseFuncBracket(func) {
    return func.replace(pattern.func, (match, p1) => {
        return match.replace(p1, wrapBacktick(p1));
    });
}
/**
 * "books.category_id = category.id" -> "\`books\`.\`category_id\` = \`category\`.\`id\`"
 * @param {string} expression
 * @returns {string}
 */
export function wrapBacktick(expression) {
    return expression.replace(
        /('\s*.*?\s*'|"\s*.*?\s*"|`\s*.*?\s*`|\w+\(\s*.*\s*\)|\d+|((LEFT|RIGHT)\sJOIN|JOIN)|\w+)/g,
        (match, p1) => {
            if (pattern.string.test(p1)) return p1;
            else if (pattern.operators.test(p1)) return p1;
            else if (pattern.reserved.test(p1)) return p1;
            else if (pattern.func.test(p1)) return recurseFuncBracket(p1);
            else if (pattern.digit.test(p1)) return p1;
            else return wrapIdentifier(p1);
        },
    );
}
