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
        const types = this.arrayTypeof(arr);
        return types.every((t) => t === type);
    }
}

export default Validator;
