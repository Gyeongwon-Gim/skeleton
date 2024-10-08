class Parser {
    static cols(cols) {
        /*
			1. 배열의 각 원소 양쪽을 백틱(`)으로 감싼다.
			2. 배열을 콤마(,)로 구분한 문자열로 만든다.
			3. 문자열을 괄호로 감싼다.
		*/
    }

    static into(into) {
        return into;
    }

    static set(set) {
        /*
			1. 객체인지 문자열(서브쿼리)인지 확인한다.
			2. 객체일 경우
				ex) { name: "lee", age: 25 }
				2-1. 각각의 속성을 "key = value" 꼴로 만들어 배열에 담는다.
					ex) ["name = lee", "age = 25"]
				2-2. 배열을 ", "로 구분한 문자열로 만든다.
					ex) "name = l, age = 25"
			3. 문자열일 경우 그대로 리턴한다.
		*/
    }

    static values(values) {
        /*
			1. 각 행의 값을 괄호로 감싸고, 값들을 콤마로 구분한다.
				ex)  ('Alice', 'alice@mail.com`, 30)
			2. 각 행을 콤마로 구분하여 하나의 문자열로 만든다.
			  ex) ('Alice', 'alice@mail.com', 30), ('Kim', 'kim@mail.com', 25)
		*/
    }

    static from(from) {
        /*
			1. 배열인지 문자열(서브쿼리)인지 확인한다.
			2. 배열일 경우
				ex) ["books", "categories"]
				2-1. 배열을 ", "로 구분한 문자열로 만든다.
					ex) "books, categories"
			3. 문자열일 경우 그대로 리턴한다.
		*/
    }

    static distinct(distinct) {
        /*
		   1. distinct의 불리언 값을 조사한다.
		   2-1. 만약 값이 true면 DISTINCT 키워드를 반환한다.
		   2-2. 만약 값이 false면 빈 문자열을 반환한다.
	   */
    }

    static join(join) {
        /*
			1. join 배열 순회
				1-1. join[i].type + " JOIN" 문자열 생성
				1-2. 2번에서 생성된 문자열 + " " + join[i].table
				1-3. 3번에서 생성된 문자열 + " ON" + join[i].on
			2. join 배열을 " "로 구분하여 하나의 문자열로 합친다.
		*/
    }
    static orderBy(orderBy) {
        /*
			1. orderBy.cols 배열의 각 컬럼명을 백틱으로 이스케이프한다.
			2. orderBy.order 배열의 각 순서를 가져와서 컬럼명과 매칭시켜준다 		
			3. 각 컬렴명과 정렬 순서를 결합하고, 콤마로 구분하여 하나의 문자열로 만든다.
				ex) 입력 
							cols : ["name" , "age"]
							order : ["ASC", "DESC"]
						출력 
						 `name` ASC, `age` DESC
		*/
    }

    static groupBy(groupBy) {
        // 1. groupBy.cols 배열의 각 컬럼명을 백틱으로 이스케이프하고 콤마로 구분한다 ex) `category`, `author`
        let cols = Array.isArray(groupBy.cols)
            ? groupBy.cols.map((col) => `\`${col}\``).join(', ')
            : `\`${groupBy.cols}\``;
        
        // 2. groupBy.having 문자열이 존재하면 HAVING 키워드와 함께 추가한다.
        let having = groupBy.having ? ` HAVING ${groupBy.having}` : '';

        // 3. 1번의 결과와 2번의 결과를 통해 문자열을 조합하여 반환한다. ex) GROUP BY `category`, `author` HAVING COUNT(*) > 1
        return `GROUP BY ${cols}${having}`;
    }

    static where(where) {
        // 식별자(컬럼명, 테이블명) 백틱으로 감싸기
        return where ? `WHERE ${where}` : "";
    }

    static limit(limit) {
        // 1. limit 값이 존재하면 LIMIT 구문을 반환하고, 없으면 빈 문자열을 반환합니다.
        // limit 객체에는 base와 offset 값이 있을 수 있습니다.
        if (limit) {
            const { base, offset } = limit;
            if (typeof base === 'number' && typeof offset === 'number') {
                return `LIMIT ${base}, ${offset}`;
            } else if (typeof base === 'number') {
                return `LIMIT ${base}`;
            }
        }
        return ''; // limit가 없을 경우 빈 문자열 반환
    }

}

export default Parser;
