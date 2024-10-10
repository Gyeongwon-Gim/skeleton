import { insert, remove, select, update } from "../CRUD.js";

function removeTest() {
    //given
    const inputs = [
        {
            type: "delete",
            from: ["users"],
            where: "age< 18",
        },
        {
            type: "delete",
            from: ["products"],
            where: "price < 10",
        },
        {
            type: "delete",
            from: ["employees"],
            where: "position = intern",
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
        "DELETE FROM `employees` WHERE `position` = `intern`",
    ];
    const isPass = results.every((result, i) => result === expected[i]);
    console.log("results", results);
    console.log("expected", expected);
    console.log(`deleteTest: ${isPass}`);
}

removeTest();
