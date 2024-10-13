import { insert, remove, select, update } from "../CRUD.js";
import { JOIN } from "../consts/Join.js";

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

    // console.log("results", results);
    // console.log("expected", expected);
    console.log(`remove: ${isPass}`);
}

function selectTest() {
    // given
    const inputs = [
        {
            cols: [],
            from: ["books"],
        },
        {
            cols: ["title", "price"],
            from: ["books"],
        },
        {
            cols: [],
            from: ["books"],
            where: "title = '어린왕자들' AND price > 10000",
        },
        {
            cols: ["title", "price"],
            from: ["books"],
            distinct: true,
        },
        {
            cols: ["categories.name"],
            from: ["books"],
            where: "books.id = 3",
            join: [
                {
                    type: JOIN.LEFT,
                    from: "categories",
                    on: "books.category_id = categories.id",
                },
            ],
        },
        {
            cols: ["title", "price"],
            from: ["books"],
            orderBy: {
                cols: ["title", "price"],
                order: ["ASC", "DESC"],
            },
        },
        {
            cols: [],
            from: ["books"],
            where: "title = '어린왕자들' AND price > 10000",
            limit: {
                base: 10,
            },
        },
        {
            cols: [],
            from: ["books"],
            where: "title = '어린왕자들' AND price > 10000",
            limit: {
                base: 10,
                offset: 5,
            },
        },
        {
            cols: ["category_id", "COUNT(CONCAT(id, name))"],
            from: ["books"],
            groupBy: {
                cols: ["category_id"],
            },
            having: "cnt >= 7",
        },
    ];
    // when
    const results = inputs.map((input) => select(input));
    // then
    const expected = [
        "SELECT * FROM `books`",
        "SELECT `title`, `price` FROM `books`",
        "SELECT * FROM `books` WHERE `title` = '어린왕자들' AND `price` > 10000",
        "SELECT DISTINCT `title`, `price` FROM `books`",
        "SELECT `categories`.`name` FROM `books` LEFT JOIN `categories` ON `books`.`category_id` = `categories`.`id` WHERE `books`.`id` = 3",
        "SELECT `title`, `price` FROM `books` ORDER BY `title` ASC, `price` DESC",
        "SELECT * FROM `books` WHERE `title` = '어린왕자들' AND `price` > 10000 LIMIT 10",
        "SELECT * FROM `books` WHERE `title` = '어린왕자들' AND `price` > 10000 LIMIT 5, 10",
        "SELECT `category_id`, COUNT(CONCAT(`id`, `name`)) FROM `books` GROUP BY `category_id` HAVING `cnt` >= 7",
    ];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    // console.log("results", results);
    // console.log("expected", expected);
    console.log(`select: ${isPass}`);
}

function insertTest() {
    // given
    const inputs = [
        {
            cols: ["name", "age", "email"],
            into: "users",
            values: [
                ["John", 30, "john@example.com"],
                ["Alice", 25, "alice@example.com"],
            ],
        },
        {
            cols: ["product", "price"],
            into: "products",
            values: [["Book", 10]],
        },
    ];

    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = insert(input);
        } catch (e) {
            result = e;
        }
        return result;
    });

    // then
    const expected = [
        "INSERT INTO `users` (`name`, `age`, `email`) VALUES ('John', 30, 'john@example.com'), ('Alice', 25, 'alice@example.com')",
        "INSERT INTO `products` (`product`, `price`) VALUES ('Book', 10)",
    ];

    const isPass = results.every((result, i) => result === expected[i]);

    // console.log("results", results);
    // console.log("expected", expected);
    console.log(`insert: ${isPass}`);
}

function updateTest() {
    // given
    const inputs = [
        {
            from: ["users"], // 업데이트할 테이블
            set: { name: "John", age: 28 }, // 수정할 필드와 값
            where: "id = 1", // 조건
            orderBy: { cols: ["name"], order: ["ASC"] }, // 정렬 조건
            limit: { base: 1 }, // 제한
        },
        {
            from: ["products"], // 업데이트할 테이블
            set: { price: 20 }, // 수정할 필드와 값
            where: "product = 'Book'", // 조건
        },
    ];

    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = update(input);
        } catch (e) {
            result = e;
        }
        return result;
    });

    // then
    const expected = [
        "UPDATE `users` SET `name` = 'John', `age` = 28 WHERE `id` = 1 ORDER BY `name` ASC LIMIT 1",
        "UPDATE `products` SET `price` = 20 WHERE `product` = 'Book'",
    ];

    const isPass = results.every((result, i) => result === expected[i]);

    // console.log("results", results);
    // console.log("expected", expected);
    console.log(`update: ${isPass}`);
}

selectTest();
removeTest();
insertTest();
updateTest();
