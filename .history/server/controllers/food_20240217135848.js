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

export const addUserMeal = (req, res) => {
    const { username, date, food } = req.body;

    // Check if the food array is present and not empty
    if (!Array.isArray(food) || food.length === 0) {
        return res.status(400).json({ Status: "Error", Error: "No food data provided." });
    }

    const insertFoodMeal = (foodItem, callback) => {
        const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?, ?, ?, ?)";
        db.query(query, [username, date, foodItem.id, foodItem.q], (err, data) => {
            callback(err, data);
        });
    };

    // Use a helper function to process each food item
    let hasErrorOccurred = false;
    food.forEach(foodItem => {
        if (hasErrorOccurred) return; // Stop processing if an error has occurred

        insertFoodMeal(foodItem, (err, data) => {
            if (err) {
                console.log("Meal insertion error:", err);
                hasErrorOccurred = true;
                // Send an error response and stop processing further
                return res.status(500).json({ Status: "Error", Error: "Failed to add meal." });
            }
        });
    });

    // If no error occurred, send a success response
    if (!hasErrorOccurred) {
        console.log("All meals have been added successfully.");
        return res.json({ Status: "Success" });
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