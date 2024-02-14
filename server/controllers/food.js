import db from '../database.js';

export const getFood = (req, res) => {
    let search = null;
    if(req.query) {
        if(req.query.searchKey)
            search = req.query.searchKey
    }
    if(search) {
        const query = "SELECT * FROM alimente WHERE name like ? ";
        search = '%' + search + '%'
        db.query(query, [search], (err, data) => {
            if (err) {
                return res.json(err)
            }
            if (data.length == 0) {
                return res.json({ Status: "Error", Error: "No food in database!" });
            }
            else return res.json(data)
        })
    }
    else {
        const query = "SELECT * FROM alimente";
        db.query(query, (err, data) => {
            if (err) {
                return res.json(err)
            }
            if (data.length == 0) {
                return res.json({ Status: "Error", Error: "No article in database!" });
            }
            else return res.json(data)
        })
    }
}