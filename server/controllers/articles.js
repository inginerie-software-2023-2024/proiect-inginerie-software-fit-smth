import db from "../database.js";

export const getAllArticles = (req, res) => {
    let search = null;
    if(req.query){
        if(req.query.searchKey)
            search = req.query.searchKey
    }
    if(search){
        const query = "SELECT * from articles where title LIKE ? OR content LIKE ? ORDER BY date DESC"
        search = '%' + search + '%'
        db.query(query, [search, search], (err, data) => {
            if(err) {
                return res.json(err)
            }
            if(data.length == 0) {
                return res.json({Status: "Error",  Error: "No article in database!"});
            }
            else return res.json(data)
        })
    }
    else {
        const query = "SELECT * from articles ORDER BY date DESC"
        
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

export const addArticle = (req, res) => {
    const query = "INSERT INTO articles (title, description, content, username, date) VALUES (?,?,?,?,?)";
    db.query(query, [req.body.title, req.body.description, req.body.content, req.body.username, req.body.date], (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            console.log("Article has been created")
            return res.status(200).json("Article has been created");
        }
    })
}

export const addArticleComment = (req, res) => {
    const query = "INSERT INTO comments (id_article, content, username, date) VALUES (?,?,?,?)";
    db.query(query, [req.body.id_article, req.body.content, req.body.username, req.body.date], (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            console.log("Comment has been created")
            return res.status(200).json("Comment has been created");
        }
    })
}
