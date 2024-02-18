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

export const addUserMeal = async (req, res) => {
    const username = req.body.username;
    const date = req.body.date;
    const foods = req.body.food;

    try {
        await db.beginTransaction();
        for (let food of foods) {
            const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?, ?, ?, ?)";
            await db.query(query, [username, date, food.id, food.q]);
        }
        await db.commit();
        return res.json({ Status: "Success" });
    } catch (err) {
        await db.rollback();
        console.error("Meal insertion error:", err);
        return res.status(500).json({ Status: "Error", Error: "Failed to add meal" });
    }
};

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