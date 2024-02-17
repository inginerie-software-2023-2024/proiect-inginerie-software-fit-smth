import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarMenu from '../../components/SidebarMenu.jsx';
import '../../css/CalculatorCalories.css';


const CaloriesCalculator = () => {
    const [foodList, setFoodList] = useState([])
    const [userList, setUserList] = useState([])
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(null)

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

    const handleSearch = (event) => {
        axios.get(`http://localhost:3001/food?searchKey=${search}`).then((response) => {
            if (response.data.Status === 'Error') {
                setFoodList([])
            }
            else {
                setFoodList(response.data)
            }
        });
    }

    function handleFoodToList(value) {
        if (userList.map(i => i.id).indexOf(value.id) === -1) {
            setUserList([...userList, { ...value, q: 100 }])
        }
    }

    function handleDeleteFood(value) {
        setUserList(userList.filter(i => i.id !== value.id))
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
            food: [...userList]
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

    const SearchBar = ({ search, setSearch, handleSearch }) => {
        const handleInputChange = (e) => {
            setSearch(e.target.value);
        };
    
        const handleSubmit = (e) => {
            e.preventDefault(); // Prevents the default form submission behavior
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
                        value={search} // Controlled component
                        onChange={handleInputChange} // Updates state on change
                    />
                    <button className="input-group-text" id="search-addon" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </form>
        );
    };
    

    const FoodList = ({ foodList, handleFoodToList }) => (
        <div className="search-result">
            {foodList.map(food => (
                <div className='food-item' onClick={() => handleFoodToList(food)} key={food.id}>
                    <strong>{food.name}</strong>
                    <span>{food.calories} cal</span>
                </div>
            ))}
        </div>
    );

    const UserFoodList = ({ userList, setUserList, handleDeleteFood }) => (
        <div className="search-result">
            {userList.length ? userList.map(food => (
                <div className='food-item-selected' key={food.id}>
                    <strong>{food.name}</strong>
                    <div className='abc'>
                        <div className="form-group">
                            <input type="number" className="form-control" value={food.q}
                                onChange={e => {
                                    food.q = e.target.value;
                                    setUserList([...userList]);
                                }} />
                        </div>
                        <div className="dlt-btn" onClick={() => handleDeleteFood(food)}>
                            <i className="bi bi-trash-fill"></i>
                        </div>
                    </div>
                </div>
            )) : <p>Nothing!</p>}
        </div>
    );

    const CalculationResult = ({ result, saveResult }) => (
        result ? (
            <div className='result'>
                <strong>The result:</strong>
                <p>You ate <strong>{result.q} grams</strong> today, which means:</p>
                <ul>
                    <li><strong>{result.cal} calories</strong></li>
                    <li><strong>{result.carbs} carbs</strong></li>
                    <li><strong>{result.fat} fat</strong></li>
                    <li><strong>{result.protein} protein</strong></li>
                </ul>
                <div className="save-btn" onClick={saveResult}>
                    <button className='btn btn-warning'>Save result</button>
                </div>
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
                            <SearchBar search={search} setSearch={setSearch} handleSearch={() => handleSearch()} />
                            <FoodList foodList={foodList} handleFoodToList={handleFoodToList} />
                        </div>
                        <div className="col col-md-6 food-list">
                            <h4>What you ate:</h4>
                            <p>(Quantity is in )</p>
                            <UserFoodList userList={userList} setUserList={setUserList} handleDeleteFood={handleDeleteFood} />
                        </div>
                    </div>
                    <div className="row final-result">
                        <div className="btn" onClick={handleCalculate}>
                            <button className='btn btn-success'>Calculate</button>
                        </div>
                        <CalculationResult result={result} saveResult={saveResult} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CaloriesCalculator;
