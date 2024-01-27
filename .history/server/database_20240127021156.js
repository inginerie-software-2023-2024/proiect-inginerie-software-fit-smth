import mysql from "mysql2";

//Gabi
// const db = mysql.createConnection({
//     database: "isdb",
//     host: "localhost",
//     user: "root",
//     password: "mysql123"
// })

//Andrada
// const db = mysql.createConnection({
//     database: "is",
//     host: "127.0.0.1",
//     user: "root",
//     password: "dulumanandrada"
// })

//Anto
const db = mysql.createConnection({
  database: "is_fit",
  host: "localhost",
  user: "root",
  password: "IES",
});

db.connect((err) => {
  if (err) {
    console.log("Error in DB connection" + JSON.stringify(err, undefined, 2));
  } else {
    console.log("DB Connected successfully");
  }
});

export default db;
