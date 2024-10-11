import { insert, remove, select, update } from "../CRUD.js";

function removeTest() {
    //given
    const inputs = [
        {
            type: "delete",
            from: ["users"],
            where: "age < 18",
        },
        {
            type: "delete",
            from: ["products"],
            where: "price < 10",
        },
        {
            type: "delete",
            from: ["employees"],
            where: "position = 'intern'",
        },
    ];
    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = remove(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
    //then
    const expected = [
        "DELETE FROM `users` WHERE `age` < 18",
        "DELETE FROM `products` WHERE `price` < 10",
        "DELETE FROM `employees` WHERE `position` = 'intern'",
    ];
    const isPass = results.every((result, i) => result === expected[i]);
    console.log("results", results);
    console.log("expected", expected);
    console.log(`removeTest: ${isPass}`);
}

function selectTest() {
    // given
    const inputs = [
        {
            cols: [],
            from: ["books"],
        },
    ];
    // when
    const results = inputs.map((input) => select(input));
    // then
    const expected = ["SELECT * FROM `books`"];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(results);
    console.log(`select: ${isPass}`);
}

// selectTest();
removeTest();
