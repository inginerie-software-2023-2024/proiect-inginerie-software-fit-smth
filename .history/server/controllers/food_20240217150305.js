const db = require('../database');

export const getFood = (req, res) => {
  const searchKey = req.query.searchKey; 
  const searchTerm = searchKey ? `%${searchKey}%` : null;

  const query = searchTerm 
    ? "SELECT * FROM alimente WHERE name LIKE ?" 
    : "SELECT * FROM alimente";

  db.query(query, searchTerm ? [searchTerm] : [], (err, data) => {
    if (err) {
      return res.status(500).json({ Status: "Error", Error: err.message });  // Send a slightly more informative error
    } 

    return res.json(data.length === 0 
      ? { Status: "Error", Error: "No food in database!" }
      : data
    ); 
  });
};

export const addUserMeal = (req, res) => {
  const { username, date, food } = req.body;

  console.log(`Adding meals for user: ${username} on date: ${date}`);

  let errorsOccurred = false; 
  let attempts = food.length;

  const insertFoodItem = (index) => { // Create a helper function
    if (index >= food.length) { // Base case when all items are processed
      if (!errorsOccurred) {
        console.log(`All meal items successfully processed for user: ${username}`);
        res.json({ Status: "Success" });
      }
      return; // Finished 
    }

    const foodItem = food[index];
    const query = "INSERT INTO user_meals (username, date, idalimente, grame) VALUES (?, ?, ?, ?)";

    db.query(query, [username, date, foodItem.id, foodItem.q], (err, result) => {
      if (err) {
        console.error("Meal insertion error:", err);
        errorsOccurred = true;
        res.status(500).json({ Status: "Error", Error: "Failed to add meal" }); 
      } else {
        console.log(`Meal item successfully added for user: ${username}`, foodItem);
        insertFoodItem(index + 1); // Process the next item 
      }
    });
  };

  insertFoodItem(0); // Initiate processing
};

export const getUserMeals = (req, res) => {
  const username = req.params.username;

  console.log("Fetching meals for username:", username);

  const query = "SELECT um.*, a.* from user_meals um, alimente a where um.username = ? and a.id = um.idalimente ORDER BY um.date DESC";

  db.query(query, [username], (err, data) => {
    if (err) {
      console.error("Error fetching user meals:", err);
      return res.status(500).json({ Status: "Error", Error: err.message });
    }

    console.log(`Meals found for username ${username}:`, data);
    return res.json(data.length === 0 
      ? { Status: "Error", Error: "No meals in database!" }
      : data
    );
  });
};
