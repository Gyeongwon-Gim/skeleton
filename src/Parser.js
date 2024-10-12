import { wrapBacktick } from "./utils/backtick.js";
import Validator from "./Validator.js";

class Parser {
    static cols(cols) {
        Validator.checkCols(cols);
        if (cols.length === 0) return "*";
        else {
            cols = cols.map((e) => wrapBacktick(e));
            const colsStr = cols.join(", ");
            return colsStr;
        }
    }

    static into(into) {
        Validator.checkInto(into);
        return wrapBacktick(into);
    }

    static set(set) {
        Validator.checkSet(set);

        const setArray = Object.entries(set).map(([key, value]) => {
            const escapeKey = wrapBacktick(key);
            const excapeValue = typeof value === "string" ? `'${value}'` : value;
            return `${escapeKey} = ${excapeValue}`;
        });
        return setArray.join(", ");
    }

    static values(values) {
        Validator.checkValues(values);

        const rows = values.map((row) => {
            const rowString = row
                .map((value) => {
                    return typeof value === "string" ? `'${value}'` : value;
                })
                .join(", ");
            return `(${rowString})`;
        });
        return rows.join(", ");
    }

    static from(from) {
        Validator.checkFrom(from);
        from = from.map((e) => wrapBacktick(e));
        const fromStr = from.join(", ");
        return `${fromStr}`;
    }

    static distinct(distinct) {
        Validator.checkDistinct(distinct);

        return distinct;
    }

    static join(joins) {
        Validator.checkJoins(joins);

        let result = [];
        for (const { type, from, on } of joins) {
            const joinStatement = [];
            joinStatement.push(`${type} JOIN`);
            joinStatement.push(wrapBacktick(from));
            joinStatement.push(`ON ${wrapBacktick(on)}`);
            result.push(joinStatement.join(" "));
        }
        return result.join("\n");
    }

    static orderBy(orderBy) {
        Validator.checkOrderBy(orderBy);

        const columnsWithOrder = orderBy.cols.map((col, index) => {
            const order = orderBy.order[index];
            return `${wrapBacktick(col)} ${order}`;
        });

        return columnsWithOrder.join(", ");
    }

    static groupBy(groupBy) {
        Validator.checkGroupBy(groupBy);

        const cols = Parser.cols(groupBy.cols);

        return `${cols}`;
    }

    static where(where) {
        Validator.checkWhere(where);
        // 식별자(컬럼명, 테이블명) 백틱으로 감싸기
        return where ? wrapBacktick(where) : "";
    }

    static limit(limit) {
        Validator.checkLimit(limit);
        if (!limit) {
            return "";
        }
        const { base, offset } = limit;

        // 3. offset이 숫자일 경우와 없을 경우 처리
        if (typeof offset === "number" && !Number.isNaN(offset)) {
            return `${offset}, ${base}`;
        } else {
            return base;
        }
    }

    static having(having) {
        Validator.checkHaving(having);

        return having ? wrapBacktick(having) : "";
    }
}

export default Parser;
