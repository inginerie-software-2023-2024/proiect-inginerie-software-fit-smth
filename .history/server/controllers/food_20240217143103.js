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
    const { username, date, food } = req.body;

    // Log the start of the process
    console.log(`Starting to add meals for username: ${username} on date: ${date}`);

    // Convert each db.query call to a promise to manage asynchronously
    const mealPromises = food.map(foodItem => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?, ?, ?, ?)";
            console.log(`Attempting to add meal:`, foodItem);
            db.query(query, [username, date, foodItem.id, foodItem.q], (err, data) => {
                if (err) {
                    console.error("Meal error for item:", foodItem, err);
                    reject(err);
                } else {
                    console.log(`Successfully added meal:`, foodItem);
                    resolve(data);
                }
            });
        });
    });

    try {
        // Wait for all meal insertions to complete
        await Promise.all(mealPromises);
        console.log("All meals successfully added.");
        res.json({ Status: "Success" });
    } catch (error) {
        // If any insertion fails, log and respond with an error
        console.error("An error occurred while adding meals:", error);
        res.status(500).json({ Status: "Error", Error: "Failed to add meal." });
    }
};


export const getUserMeals = (req, res) => {
    const username = req.params.username;

    // Log the incoming request for debugging
    console.log("Fetching meals for username:", username);

    const query = "SELECT um.*, a.* from user_meals um, alimente a where um.username = ? and a.id = um.idalimente ORDER BY um.date DESC";

    db.query(query, [username], (err, data) => {
        // Log any error that occurs during the query execution
        if (err) {
            console.error("Error fetching user meals:", err);
            return res.json(err);
        }

        // Log when no data is found
        if (data.length == 0) {
            console.log("No meals found in the database for username:", username);
            return res.json({ Status: "Error", Error: "No meals in database!" });
        }

        // Log the data returned by the query for debugging
        console.log(`Meals found for username ${username}:`, data);

        return res.json(data);
    });
};
