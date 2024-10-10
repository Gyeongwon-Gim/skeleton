import Parser from "../Parser.js";
import { ErrorMessage } from "../Error.js";

function colsTest() {
    // given
    const inputs = [["name", "age"], ["name", 123], "name"];
    // when
    const results = inputs.map((cols) => {
        let result;
        try {
            result = Parser.cols(cols);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        "(`name`, `age`)",
        new TypeError(ErrorMessage.cols),
        new TypeError(ErrorMessage.cols),
    ];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`cols : ${isPass}`);
}

function joinTest() {
    // given
    const inputs = [
        [
            {
                type: "INNER",
                from: "orders",
                on: "customers.customer_id = orders.customer_id",
            },
            {
                type: "OUTER",
                from: "order_items",
                on: "orders.order_id = order_items.order_id",
            },
            {
                type: "FULL",
                from: "products",
                on: "order_items.product_id = products.product_id",
            },
        ],
        [
            {
                type: "INNER",
                from: "orders",
            },
        ],
        [
            {
                type: "SOMTHING",
                from: "orders",
                on: "customers.customer_id = orders.customer_id",
            },
        ],
        "JOIN",
    ];
    // when
    const results = inputs.map((join) => {
        let result;
        try {
            result = Parser.join(join);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
        `INNER JOIN \`orders\` ON \`customers\`.\`customer_id\` = \`orders\`.\`customer_id\`
OUTER JOIN \`order_items\` ON \`orders\`.\`order_id\` = \`order_items\`.\`order_id\`
FULL JOIN \`products\` ON \`order_items\`.\`product_id\` = \`products\`.\`product_id\``,
        new TypeError(ErrorMessage.join.property),
        new TypeError(ErrorMessage.join.type),
        new TypeError(ErrorMessage.join.array),
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`join : ${isPass}`);
}

function distinctTest() {
    // given
    const inputs = [true, false, "true"];
    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.distinct(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = ["DISTINCT", "", new TypeError(ErrorMessage.distinct)];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`distinct : ${isPass}`);
}

function intoTest() {
    // given
    const input = ["books", 123];
    // when
    const results = input.map((e) => {
        let result;
        try {
            result = Parser.into(e);
        } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = ["`books`", new TypeError(ErrorMessage.into)];
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
    console.log(`into : ${isPass}`);
}

function fromTest() {
    // given
    const inputs = [["books", "categories"], "books", ["books", 123], 123];

    // when
    const results = inputs.map((from) => {
        let result;
        try {
            result = Parser.from(from);
        } catch (e) {
          result = e;
      }
      return result;
  });
  // then
    const expected = [
        "books, categories", // 정상 처리
        "books", // 정상처리
        new TypeError("배열의 원소 타입은 문자형이어야 합니다"),
        new TypeError("매개변수의 타입이 배열이나 문자 형태여야 합니다."),
    ];

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
          return result === expected[i];
        }
    });
      console.log(`from: ${isPass}`);
}
function whereTest() {
    // given
    const inputs = [
        "books.category_id = category.id AND books.price > 10",
        "books.title LIKE 'Harry Potter'",
    ];
    
    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.where(input);
        } catch (e) {
            result = e;
        }
        return result;
    });
  
    // then
    const expected = [
        "WHERE `books`.`category_id` = `category`.`id` AND `books`.`price` > 10",
        "WHERE `books`.`title` LIKE 'Harry Potter'",
        
    ];

    // 출력해서 확인
    console.log("Results:", results);
    console.log("Expected:", expected);

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.toString() === expected[i].toString();
       } else {
        return result === expected[i];
        }
    });
    console.log(`where: ${isPass}`);
}

function valuesTest() {
    // given
    const inputs = [
        [
            ["Alice", "alice@gmail.com", 30],
            ["Bob", "bob@gmail.com", 25],
        ],
        ["Alice", "alice@gmail.com", 30],
        // 123,
    ];

    // when
    const results = inputs.map((values) => {
        let result;
        try {
            result = Parser.values(values);
        } catch (e) {
          result = e;
        }
        return result;
    });
    // then
    const expected = [
        "('Alice', 'alice@gmail.com', 30), ('Bob', 'bob@gmail.com', 25)",
        "('Alice', 'alice@gmail.com', 30)",
        // 123,
    ]; // 정상처리

    console.log(results);
}

function groupByTest() {
    // given
    const inputs = [
        { cols: ["category", "author"], having: "COUNT(*) > 1" },
        { cols: ["author"], having: "COUNT(*) = 1" },
        { cols: ["category"] },
        "invalid"  // 올바르지 않은 입력
    ];

    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.groupBy(input);
        } catch (e) {
          result = e;
        }
        return result;
    });
    // then
    const expected = [
        "GROUP BY (`category`, `author`) HAVING COUNT(*) > 1",
        "GROUP BY (`author`) HAVING COUNT(*) = 1",
        "GROUP BY (`category`)",
        new TypeError("cols는 string[] 타입이어야 합니다.")  
    ];

    // 결과와 기대값 출력
    console.log("Results:", results);
    console.log("Expected:", expected);

    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });

    console.log(`groupBy : ${isPass}`);
}

function orderByTest() {
    // given
    const inputs = [
        { cols: ["name", "age"], order: ["ASC", "DESC"] },
        { cols: ["name", 123], order: ["ASC", "DESC"] },
    ];
    // when
    const results = inputs.map((input) => {
        let result;
        try {
            result = Parser.orderBy(input);
         } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
       "ORDER BY `name` ASC, `age` DESC",
        new TypeError("컬럼명은 모두 문자형이어야 함니다"),
    ];
    const isPass = results.every((result, i) => {
          if (result instanceof TypeError) {
              return result.message === expected[i].message;
          } else {
              return result === expected[i];
          }
      });
     // console.log(results);
    console.log(`orderBy: ${isPass}`);
}

function limitTest() {
    // given
    const inputs = [
        { base: 10, offset: 20 },  // 정상
        { base: 5 },  // 정상
        { base: "invalid", offset: 20 },  // base가 유효하지 않음
        123  // 잘못된 형식
    ];

    // when
    const results = inputs.map((limit) => {
        let result;
        try {
            result = Parser.limit(limit);
         } catch (e) {
            result = e;
        }
        return result;
    });
    // then
    const expected = [
      "LIMIT 10, 20",  // 정상적인 출력
        "LIMIT 5",  // 정상적인 출력
        new TypeError("base 값은 숫자여야 합니다."),  // 에러 메시지
        new TypeError("limit는 객체여야 하며 base와 offset 값을 포함해야 합니다.")  // 에러 메시지
    ];

    // 결과와 기대값 비교 및 출력
    const isPass = results.every((result, i) => {
        if (result instanceof TypeError) {
            return result.message === expected[i].message;
        } else {
            return result === expected[i];
        }
    });
      console.log(`limit : ${isPass}`);
}

whereTest();
groupByTest();
limitTest();
colsTest();
joinTest();
distinctTest();
intoTest();
