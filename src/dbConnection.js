import mysql from "mysql2/promise";

export async function createDatabase(host, user, password, database) {
    try {
        // MySQL 서버에 연결 (데이터베이스는 아직 연결하지 않음)
        const connection = await mysql.createConnection({
            host,
            user, // MySQL 사용자 이름
            password, // MySQL 비밀번호
            database,
        });

        // // 데이터베이스 생성 쿼리 실행
        // await connection.execute("CREATE DATABASE IF NOT EXISTS `skeleton`");
        // console.log("데이터베이스가 성공적으로 생성되었습니다.");

        // 연결 종료
        // await connection.end();
        return connection;
    } catch (err) {
        console.error("데이터베이스 생성 중 오류:", err);
    }
}
