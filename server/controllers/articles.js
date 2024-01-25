import db from "../database.js";

export const getAllArticles = (req, res) => {
    let search = null;
    console.log(req.query);
    if(req.query){
        if(req.query.searchKey)
            search = req.query.searchKey
    }
    if(search){
        const query = "SELECT * from articles where title LIKE ? OR content LIKE ?"
        search = '%' + search + '%'

        db.query(query, [search, search], (err, data) => {
            if(err) {
                console.log(err);
                return res.json(err)
            }
            if(data.length == 0) {
                console.log(data);
                return res.json({Status: "Error",  Error: "No article in database!"});
            }
            else return res.json(data)
        })
    }
    else {
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
}

export const getArticle = (req, res) => {
    const articleId = req.params.id;
    const query = "SELECT * from articles where id = ?"
    db.query(query, [articleId], (err, data) => {
        if(err) {
           return res.json(err)
        }
        if(data.length == 0) {
           return res.json({Status: "Error",  Error: "No article in database with this id!"});
        }
        else return res.json(data)
    })
}

export const getArticleComments = (req, res) => {
    const articleId = req.params.id;
    const query = "SELECT * from comments where id_article = ? ORDER BY date DESC"
    db.query(query, [articleId], (err, data) => {
        if(err) {
            return res.json(err)
         }
         if(data.length == 0) {
            return res.json({Status: "Error",  Error: "No comments for this article!"});
         }
         else return res.json(data)
    })
}