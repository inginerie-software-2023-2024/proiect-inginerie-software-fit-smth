import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SidebarMenu from '../../components/SidebarMenu.jsx';
import '../../css/CalculatorCalories.css';


const CaloriesCalculator = () => {
    const [foodList, setFoodList] = useState([])
    const [userList, setUserList] = useState([])
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(null)
    const [mealType, setMealType] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3001/food").then((response) => {
            if (response.data.Status === 'Error') {
                setFoodList([])
            }
            else {
                setFoodList(response.data)
            }
        })
    }, [])

    const handleSearch = useCallback(() => {
        axios.get(`http://localhost:3001/food?searchKey=${search}`).then((response) => {
            if (response.data.Status === 'Error') {
                setFoodList([])
            } else {
                setFoodList(response.data)
            }
        });
    }, [search]);


    function handleFoodToList(selectedFood) {
        if (userList.findIndex(food => food.id === selectedFood.id) === -1) {
            setUserList(prevList => [...prevList, { ...selectedFood, q: 100 }]);
        }
    }

    function handleDeleteFood(foodToRemove) {
        setUserList(prevList => prevList.filter(food => food.id !== foodToRemove.id));
    }


    const handleCalculate = () => {
        let quantity = 0;
        let calories = 0;
        let carbs = 0;
        let fat = 0;
        let protein = 0;

        for (let i of userList) {
            quantity += +i.q
            calories += +i.calories
            carbs += +i.carbs
            fat += +i.fat
            protein += +i.protein
        }
        setResult({ q: quantity, cal: calories, carbs: carbs, fat: fat, protein: protein })
    }

    const saveResult = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const currentDate = date + "/" + month + "/" + year;

        const val = {
            username: localStorage.getItem('currentUser').slice(1, -1),
            date: currentDate,
            food: [...userList],
            meal_type: mealType
        }

        axios.post('http://localhost:3001/food/addMeal', val).then((response) => {
            if (response.data.Status === 'Error') {
                console.log('error');
            }
            else {
                console.log('success');
                setUserList([])
                setResult(null)
            }
        });
    }

    const FoodItem = ({ food, index, handleFoodToList }) => (
        <div className='food-item' onClick={() => handleFoodToList(food)} key={food.id}>
            <strong>{food.name}</strong>
            <span>{food.calories} kcal</span>
            <span>{food.fat} gr</span>
            <span>{food.carbs} gr</span>
            <span>{food.protein} g</span>
        </div>
    );

    const UserFoodItem = ({ food, index, setUserList, userList, handleDeleteFood }) => (
        <div className='food-item-selected' key={food.id}>
            <strong>{index + 1}. {food.name}</strong>
            <div className='abc'>
                <div className="form-group">
                    <input type="number" className="form-control" value={food.q}
                        onChange={e => {
                            const updatedList = userList.map(item =>
                                item.id === food.id ? { ...item, q: e.target.value } : item
                            );
                            setUserList(updatedList);
                        }} />
                </div>
                <div className="dlt-btn" onClick={() => handleDeleteFood(food)}>
                    <i className="bi bi-trash-fill"></i>
                </div>
            </div>
        </div>
    );

    const FoodList = ({ foodList, handleFoodToList }) => (
        <div className="search-result">
            <div className="food-item header">
                <strong>Food</strong>
                <span>Calories</span>
                <span>Fat</span>
                <span>Carbs</span>
                <span>Protein</span>
            </div>
            {foodList.map((food, index) => (
                <FoodItem food={food} index={index} handleFoodToList={handleFoodToList} key={food.id} />
            ))}
        </div>
    );

    const UserFoodList = ({ userList, setUserList, handleDeleteFood }) => (
        <div className="search-result">
            {userList.length ? userList.map((food, index) => (
                <UserFoodItem
                    food={food}
                    index={index}
                    setUserList={setUserList}
                    userList={userList}
                    handleDeleteFood={handleDeleteFood}
                    key={food.id} />
            )) : <p>Nothing selected!</p>}
        </div>
    );

    const ResultList = ({ result }) => (
        <ul>
            {Object.entries(result).map(([key, value]) => key !== 'q' && (
                <li key={key}>
                    <strong>{value.toFixed(2)} {key}</strong>
                </li>
            ))}
        </ul>
    );

    const MealTypeSelector = ({ mealType, setMealType }) => (
        <div className="meal-type-select">
            <strong>Select meal type:</strong>
            <div className="btn-group" role="group">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                    <button
                        key={type}
                        type="button"
                        className={`btn ${mealType === type ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={() => setMealType(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
    
    
    const formatNutritionValue = (value) => parseFloat(value).toFixed(2);

    const CalculationResult = ({ result, saveResult, mealType, setMealType }) => (
        result ? (
            <div className='result'>
                <strong>The result:</strong>
                <p>You've eaten <strong>{formatNutritionValue(result.q)} grams</strong> today, which means:</p>
                <ResultList result={result} />
                <div className="save-btn" onClick={saveResult}>
                    <button className='btn btn-warning'>Save result</button>
                </div>
                <MealTypeSelector mealType={mealType} setMealType={setMealType} />
            </div>
        ) : <span></span>
    );

    return (
        <section>
            <div className="row">
                <div className="sidebar">
                    <SidebarMenu />
                </div>
                <div className="all-rows">
                    <div className='row content'>
                        <div className="col col-md-6">
                            <SearchBar
                                search={search}
                                setSearch={setSearch}
                                handleSearch={() => handleSearch()} />
                            <FoodList
                                foodList={foodList}
                                handleFoodToList={handleFoodToList} />
                        </div>
                        <div className="col col-md-6 food-list">
                            <h4>Eating list</h4>
                            <p>(in grams)</p>
                            <UserFoodList
                                userList={userList}
                                setUserList={setUserList}
                                handleDeleteFood={handleDeleteFood} />
                        </div>
                    </div>
                    <div className="row final-result">
                        <div className="btn" onClick={handleCalculate}>
                            <button className='btn btn-success'>Calculate</button>
                        </div>
                        <CalculationResult
                            result={result}
                            saveResult={saveResult}
                            mealType={mealType}
                            setMealType={setMealType}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}

const SearchBar = React.memo(({ search, setSearch, handleSearch }) => {
    const handleInputChange = (e) => setSearch(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for food"
                    aria-label="Search for food"
                    aria-describedby="search-addon"
                    value={search}
                    onChange={handleInputChange}
                />
                <button className="input-group-text" id="search-addon" type="submit">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </form>
    );
});

export default CaloriesCalculator;
