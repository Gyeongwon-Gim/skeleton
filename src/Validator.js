import { ErrorMessage } from "./Error.js";

class Validator {
    /**
     * 배열의 원소가 어떤 타입인지 반환하는 함수
     * @param {any[]} arr
     * @returns {string[]}
     */
    static arrayTypeof(arr) {
        const types = new Set();
        arr.forEach((e) => {
            types.add(typeof e);
        });
        return [...types];
    }

    /**
     * 인수로 전달한 배열이 특정 타입인지 확인하는 변수
     * @param {any[]} arr
     * @param {string} type
     * @returns {boolean}
     */
    static isArrayTypeof(arr, type) {
        const types = Validator.arrayTypeof(arr);
        return types.every((t) => t === type);
    }

    static checkCols(cols) {
        // cols가 배열이면서 원소가 string 타입인지 확인
        const isArray = Array.isArray(cols);
        if (!isArray) throw TypeError(ErrorMessage.cols);
        const isStringArray = Validator.isArrayTypeof(cols, "string");
        if (!isStringArray) throw TypeError(ErrorMessage.cols);
    }

    static checkInto(into) {
        const isString = typeof into === "string";
        if (!isString) throw TypeError(ErrorMessage.into);
    }

    static checkDistinct(distinct) {
        const isBoolean = typeof distinct === "boolean";
        if (!isBoolean) throw TypeError(ErrorMessage.distinct);
    }

    static checkJoins(joins) {
        const isArray = Array.isArray(joins);
        if (!isArray) {
            throw TypeError(ErrorMessage.join.array);
        }
        joins.forEach((join) => {
            Validator.checkJoin(join);
        });
    }

    static checkJoin(join) {
        const hasValidProperty =
            Object.prototype.hasOwnProperty.call(join, "type") &&
            Object.prototype.hasOwnProperty.call(join, "from") &&
            Object.prototype.hasOwnProperty.call(join, "on") &&
            Object.keys(join).length === 3;
        const validJoinTypes = ["LEFT", "RIGHT", "SELF", "INNER", "OUTER", "FULL"];
        const isValidJoinType = validJoinTypes.includes(join.type);

        if (!hasValidProperty) throw TypeError(ErrorMessage.join.property);
        if (!isValidJoinType) throw TypeError(ErrorMessage.join.type);
    }

    /**
     *
     * @param {(number | string | boolean | Date)[][]} values
     */
    static checkValues(values) {
        // 2차원 배열인지 확인
        const isArrayValues = Array.isArray(values);
        if (!isArrayValues) throw TypeError(ErrorMessage.values.twoDimensionArray);
        const isArrayValue = values.every((value) => Array.isArray(value));
        if (!isArrayValue) throw TypeError(ErrorMessage.values.array);
        // 원소의 타입 체크
        const validTypes = ["number", "string", "boolean"];
        const isValidTypes = values.every((value) => {
            return value.every((data) => {
                const isDate = data instanceof Date;
                const isValidType = validTypes.includes(typeof data) || isDate;
                return isValidType;
            });
        });
        if (!isValidTypes) throw TypeError(ErrorMessage.values.type);
    }

    static checkFrom(from) {
        const isArray = Array.isArray(from);
        if (!isArray) throw TypeError(ErrorMessage.from);
        const isString = from.every((table) => typeof table === "string");
        if (!isString) throw TypeError(ErrorMessage.from);
    }

    static checkOrderBy(orderBy) {
        // 1. orderBy 가 유효한 속성을 갖고 있는지 확인
        const hasValidProperty =
            Object.prototype.hasOwnProperty.call(orderBy, "cols") &&
            Object.prototype.hasOwnProperty.call(orderBy, "order") &&
            Object.keys(orderBy).length === 2;
        if (!hasValidProperty) throw TypeError(ErrorMessage.orderBy.property);
        // 2. orderBy.cols 가 배열인지 확인
        const colsIsArray = Array.isArray(orderBy.cols);
        if (!colsIsArray) throw TypeError(ErrorMessage.orderBy.cols);
        // 3. orderBy.cols 의 원소가 전부 string 이거나 전부 number 타입인지 확인
        const isStringCols = orderBy.cols.every((col) => typeof col === "string");
        const isNumberCols = orderBy.cols.every(
            (col) => typeof col === "number" && !Number.isNaN(col),
        );
        if (!isStringCols && !isNumberCols) throw TypeError(ErrorMessage.orderBy.cols);
        // 4. orderBy.order 가 배열인지 확인
        const orderIsArray = Array.isArray(orderBy.order);
        if (!orderIsArray) throw TypeError(ErrorMessage.orderBy.order);
        // 5. orderBy.order 배열의 원소가 "ASC" 또는 "DESC" 인지 확인
        const isASCOrDESC = orderBy.order.every((o) => o === "ASC" || o === "DESC");
        if (!isASCOrDESC) throw TypeError(ErrorMessage.orderBy.order);
    }

    static checkGroupBy(groupBy) {
        // 1. groupBy가 유효한 속성을 갖고 있는지 확인
        const hasValidProperty =
            Object.prototype.hasOwnProperty.call(groupBy, "cols") &&
            Object.prototype.hasOwnProperty.call(groupBy, "having") &&
            Object.keys(groupBy).length === 2;
        if (!hasValidProperty) throw TypeError(ErrorMessage.groupBy.property);
        // 2. groupBy.cols 가 배열인지 확인
        const colsIsArray = Array.isArray(groupBy.cols);
        if (!colsIsArray) throw TypeError(ErrorMessage.groupBy.cols);
        // 3. groupBy.cols 배열의 원소가 전부 string 타입인지 확인
        const isStringCols = groupBy.cols.every((col) => typeof col === "string");
        if (!isStringCols) throw TypeError(ErrorMessage.groupBy.cols);
        // 4. groupBy.having 이 string 타입인지 확인
        const isStringHaving = typeof groupBy.having === "string";
        if (!isStringHaving) throw TypeError(ErrorMessage.groupBy.having);
    }

    static checkWhere(where) {
        // 1. where 이 string 타입인지 확인
        const isStringWhere = typeof where === "string";
        if (!isStringWhere) throw TypeError(ErrorMessage.where);
    }

    static checkLimit(limit) {
        // 1. limit 이 유효한 속성을 갖고 있는지 확인
        const hasValidProperty =
            Object.prototype.hasOwnProperty.call(limit, "base") &&
            Object.prototype.hasOwnProperty.call(limit, "offset") &&
            Object.keys(limit).length === 2;
        if (!hasValidProperty) throw TypeError(ErrorMessage.limit.property);
        // 2. limit.base 가 number 타입인지 확인
        const isNumberBase = typeof limit.base === "number" && !Number.isNaN(limit.base);
        if (!isNumberBase) throw TypeError(ErrorMessage.limit.base);
        // 3. limit.offset 이 number 타입인지 확인
        const isNumberOffset = typeof limit.offset === "number" && !Number.isNaN(limit.offset);
        if (!isNumberOffset) throw TypeError(ErrorMessage.limit.offset);
    }
}

export default Validator;
