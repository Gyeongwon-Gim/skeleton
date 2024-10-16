import { wrapIdentifier, wrapBacktick } from "../lib/utils/backtick.js";

function wrapIdentifierTest() {
    // given
    const inputs = ["t1.col1", "db1.t1.col1", "col1", "t1.*"];

    // when
    const results = inputs.map((input) => wrapIdentifier(input));

    // then
    const expected = ["`t1`.`col1`", "`db1`.`t1`.`col1`", "`col1`", "`t1`.*"];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`wrapIdentifier : ${isPass}`);
}

function wrapBacktickTest() {
    // given
    const inputs = [
        "books.category_id = category.id AND books.price > 10",
        "books.title LIKE 'Harry Potter'",
        "COUNT(CONCAT(t1.name, t2.name))",
        "`my name`.`first name`.`last name`",
        "COUNT(*)",
        "(SELECT COUNT(*) FROM `likes` WHERE `book_id` = `books`.`id`) AS likes",
        "LEFT JOIN categories ON books.category_id = categories.category_id",
    ];

    // when
    const results = inputs.map((input) => wrapBacktick(input));

    // then
    const expected = [
        "`books`.`category_id` = `category`.`id` AND `books`.`price` > 10",
        "`books`.`title` LIKE 'Harry Potter'",
        "COUNT(CONCAT(`t1`.`name`, `t2`.`name`))",
        "`my name`.`first name`.`last name`",
        "COUNT(*)",
        "(SELECT COUNT(*) FROM `likes` WHERE `book_id` = `books`.`id`) AS `likes`",
        "LEFT JOIN `categories` ON `books`.`category_id` = `categories`.`category_id`",
    ];

    // 결과와 기대값 출력
    // console.log("Results:", results);
    // console.log("Expected:", expected);

    const isPass = results.every((result, i) => result === expected[i]);
    console.log(`wrapBacktickExpression : ${isPass}`);
}

wrapIdentifierTest();
wrapBacktickTest();
