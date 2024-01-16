import db from "../database.js";

export const getAllArticles = (req, res) => {
    const query = "SELECT * from articles"
    
    db.query(query, (err, data) => {
        if(err) {
           return res.json(err)
        }
        if(data.length == 0) {
           return res.json({Status: "Error",  Error: "No article in database!"});
        }
        else return res.json(data)
    })
}
