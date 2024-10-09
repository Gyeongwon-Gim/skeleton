import Validator from "../Validator.js";

function arrayTypeofTest() {
    // given
    const arr = [1, "2", false, "45"];
    // when
    const result = JSON.stringify(Validator.arrayTypeof(arr));
    // then
    const expected = JSON.stringify(["number", "string", "boolean"]);
    console.log(`arrayTypeof : ${result === expected}`);
}

function isArrayTypeofTest() {
    // given
    const input = [
        [[1, "a", false, "45"], "string"],
        [["name"], "string"],
    ];
    // when
    const results = input.map(([arr, type]) => Validator.isArrayTypeof(arr, type));
    // then
    const expected = [false, true];
    console.log(`checkArrayTypeof : ${results.every((result, i) => result === expected[i])}`);
}

arrayTypeofTest();
isArrayTypeofTest();
