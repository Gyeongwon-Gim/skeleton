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
        const isValidProperty =
            Object.prototype.hasOwnProperty.call(join, "type") &&
            Object.prototype.hasOwnProperty.call(join, "from") &&
            Object.prototype.hasOwnProperty.call(join, "on") &&
            Object.keys(join).length === 3;
        const validJoinTypes = ["LEFT", "RIGHT", "SELF", "INNER", "OUTER", "FULL"];
        const isValidJoinType = validJoinTypes.includes(join.type);

        if (!isValidProperty) throw TypeError(ErrorMessage.join.property);
        if (!isValidJoinType) throw TypeError(ErrorMessage.join.type);
    }
}

export default Validator;
