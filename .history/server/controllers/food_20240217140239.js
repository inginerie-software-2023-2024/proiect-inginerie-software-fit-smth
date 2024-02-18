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

function queryPromise(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


export const addUserMeal = async (req, res) => {
    const { username, date, food } = req.body;

    try {
        // Start a transaction manually
        await queryPromise('START TRANSACTION', []);

        // Map each food item insert to a promise
        const insertPromises = food.map(foodItem => {
            const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?, ?, ?, ?)";
            return queryPromise(query, [username, date, foodItem.id, foodItem.q]);
        });

        // Wait for all promises (inserts) to resolve
        await Promise.all(insertPromises);

        // If all inserts succeed, commit the transaction
        await queryPromise('COMMIT', []);
        res.json({ Status: "Success" });
    } catch (err) {
        // If any insert fails, rollback the transaction
        await queryPromise('ROLLBACK', []);
        console.error("Meal insertion error:", err);
        res.status(500).json({ Status: "Error", Error: "Failed to add meal." });
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