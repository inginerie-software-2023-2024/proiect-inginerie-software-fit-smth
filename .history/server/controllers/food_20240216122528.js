import db from '../database.js';

export const getFood = (req, res) => {
    let search = null;
    if(req.query && req.query.searchKey)
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

export const addUserMeal = (req, res) => {
    const username = req.body.username
    const date = req.body.date
    for(let food of req.body.food) {
        try {
            const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?,?,?,?)";
            db.query(query, [username, date, food.id, food.q], (err, data) => {
                if (err) {
                    console.log("Meal error")
                }
                else {
                    console.log("Meal has been created")
                }
            })
        }catch(err) {
            return res.json(err);
        }
    }
    return res.json({ Status: "Success" });
}

export const getUserMeals = (req, res) => {
    const username = req.params.username
    const query = "SELECT um.*, a.* from user_meals um, alimente a where um.username = ? and a.id = um.idalimente ORDER BY um.date DESC"
    db.query(query, [username], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data.length == 0) {
            return res.json({ Status: "Error", Error: "No meals in database!" });
        }
        else return res.json(data)
    })
}