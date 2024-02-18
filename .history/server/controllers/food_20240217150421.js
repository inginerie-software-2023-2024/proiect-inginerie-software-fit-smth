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

    console.log(`Adding meals for user: ${username} on date: ${date}`); // Log start

    let errorsOccurred = false;
    let attempts = food.length; // Track the number of attempts to insert food items

    food.forEach(foodItem => {
        console.log(`Processing meal item for user: ${username}`, foodItem); // Log each food item being processed

        const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?, ?, ?, ?)";
        db.query(query, [username, date, foodItem.id, foodItem.q], (err, data) => {
            attempts--; // Decrement the number of remaining attempts

            if (err) {
                console.error("Meal insertion error:", err);
                errorsOccurred = true;

                // Respond with an error on the first occurrence
                if (!res.headersSent) {
                    console.log(`Error occurred, stopping process for user: ${username}`);
                    res.status(500).json({ Status: "Error", Error: "Failed to add meal." });
                }
            } else {
                console.log(`Meal item successfully added for user: ${username}`, foodItem);

                // Check if this is the last attempt and no errors occurred
                if (attempts === 0 && !errorsOccurred && !res.headersSent) {
                    console.log(`All meal items successfully processed for user: ${username}`);
                    res.json({ Status: "Success" });
                }
            }
        });
    });
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
