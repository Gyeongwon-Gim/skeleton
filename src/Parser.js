import { wrapBacktick, wrapBacktickExpression } from "./utils/backtick.js";
import Validator from "./Validator.js";

class Parser {
    static cols(cols) {
        Validator.checkCols(cols);

        cols = cols.map((e) => wrapBacktick(e));
        const colsStr = cols.join(", ");
        return `(${colsStr})`;
    }

    static into(into) {
        Validator.checkInto(into);
        return wrapBacktick(into);
    }

    static set(set) {
        /*
			1. 객체인지 문자열(서브쿼리)인지 확인한다.
			2. 객체일 경우
				ex) { name: "lee", age: 25 }
				2-1. 각각의 속성을 "key = value" 꼴로 만들어 배열에 담는다.
					ex) ["name = lee", "age = 25"]
				2-2. 배열을 ", "로 구분한 문자열로 만든다.
					ex) "name = l, age = 25"
			3. 문자열일 경우 그대로 리턴한다.
		*/
    }

    static values(values) {
        Validator.checkValues(values);

        const rows = values.map((row) => {
            const rowString = row
                .map((value) => {
                    return typeof value === "string" ? `\`${value}\`` : value;
                })
                .join(", ");
            return `${rowString}`;
        });

        return rows.join(",");
    }

    static from(from) {
        Validator.checkFrom(from);
        return wrapBacktick(from.join(", "));
    }

    static distinct(distinct) {
        Validator.checkDistinct(distinct);

        if (distinct) return "DISTINCT";
        else return "";
    }

    static join(joins) {
        Validator.checkJoins(joins);

        let result = [];
        for (const { type, from, on } of joins) {
            const joinStatement = [];
            joinStatement.push(`${type} JOIN`);
            joinStatement.push(Parser.from([from]));
            joinStatement.push(`ON ${wrapBacktickExpression(on)}`);
            result.push(joinStatement.join(" "));
        }
        return result.join("\n");
    }
    static orderBy(orderBy) {
        Validator.checkOrderBy(orderBy);

        const columnsWithOrder = orderBy.cols.map((col, index) => {
            const order = orderBy.order[index];
            return `\`${col}\` ${order}`;
        });

        return `ORDER BY ${columnsWithOrder.join(", ")}`;
    }

    static groupBy(groupBy) {
        Validator.checkGroupBy(groupBy);
        // 1. groupBy.cols 배열의 각 컬럼명을 백틱으로 이스케이프하고 콤마로 구분한다 ex) `category`, `author`
        let cols = groupBy.cols.map((col) => `\`${col}\``).join(", ");

        // 2. groupBy.having 문자열이 존재하면 HAVING 키워드와 함께 추가한다.
        let having = groupBy.having ? ` HAVING ${groupBy.having}` : "";

        // 3. 1번의 결과와 2번의 결과를 통해 문자열을 조합하여 반환한다. ex) GROUP BY `category`, `author` HAVING COUNT(*) > 1
        return `GROUP BY ${cols}${having}`;
    }

    static where(where) {
        Validator.checkWhere(where);
        // 식별자(컬럼명, 테이블명) 백틱으로 감싸기
        return where ? `WHERE ${where}` : "";
    }

    static limit(limit) {
        Validator.checkLimit(limit);

        if (limit) {
            const { base, offset } = limit;
            if (typeof base === "number" && typeof offset === "number") {
                return `LIMIT ${base}, ${offset}`;
            } else if (typeof base === "number") {
                return `LIMIT ${base}`;
            }
        }
        return ""; // limit가 없을 경우 빈 문자열 반환
    }
}

export default Parser;
