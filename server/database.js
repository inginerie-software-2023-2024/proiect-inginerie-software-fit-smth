import mysql from "mysql2"

// const db = mysql.createConnection({
//     database: "isdb",
//     host: "localhost",
//     user: "root",
//     password: "mysql123"
// })

const db = mysql.createConnection({
    database: "mdsdb",
    host: "127.0.0.1",
    user: "root",
    password: "dulumanandrada"
})

db.connect((err) => {
    if(err){
         console.log('Error in DB connection' + JSON.stringify(err,undefined,2) );
    }
    else{
         console.log('DB Connected successfully' )
    }
})

export default db;