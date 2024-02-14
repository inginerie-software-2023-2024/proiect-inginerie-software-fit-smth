import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarMenu from '../../components/SidebarMenu.jsx';
import '../../css/CalculatorCalories.css';


const CaloriesCalculator = () => {
    const [foodList, setFoodList] = useState([])
    const [userList, setUserList] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/food").then((response) => {
            if(response.data.Status === 'Error')
            {
                setFoodList([])
            }
            else {
                setFoodList(response.data)
            }
        })
    }, [])

    const handleSearch = (event) => {
        axios.get(`http://localhost:3001/food?searchKey=${search}`).then((response) => {
            if(response.data.Status === 'Error')
            {
                setFoodList([])
            }
            else {
                setFoodList(response.data)
            }
        });
    }

    function handleFoodToList(value) {
        if(userList.map(i => i.id).indexOf(value.id) === -1){
            setUserList([...userList, {...value, q: 100}])
        }
    }

    return (
        <section>
            <div className="row">
                <div className="sidebar">
                    <SidebarMenu />
                </div>
                <div className="all-rows">
                    <div className='row content'>
                        <div className="col col-md-6">
                            <form>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" 
                                        placeholder="Search for food" 
                                        aria-label="Recipient's username" aria-describedby="basic-addon2" 
                                        onChange = {e => setSearch(e.target.value)}/>
                                    <span className="input-group-text" id="basic-addon2" 
                                        onClick = {handleSearch} >
                                        <i className="bi bi-search"></i>
                                    </span>
                                </div>
                            </form>
                            <div className="search-result">
                                {
                                    foodList.map(food => 
                                        (
                                            <div className='food-item' onClick={() => handleFoodToList(food)} key={food.id}>
                                                <strong>{ food.name }</strong>
                                                <span>{ food.calories } cal</span>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="col col-md-6 food-list">
                            <h4>What you ate:</h4>
                            <p color='#556970'>(Quantity is in grams)</p>
                            <div className="search-result">
                                {
                                    userList.length ? userList.map(food => 
                                        (
                                            <div className='food-item-selected' key={food.id}>
                                                <strong>{ food.name }</strong>
                                                <div className='abc'>
                                                    <div className="form-group">
                                                        <input type="number"  className="form-control" value={food.q} onChange = {(e) => {food.q = e.target.value; setUserList([...userList])}}/>
                                                    </div>
                                                    <div className="dlt-btn">
                                                        <i class="bi bi-trash-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                    :
                                    <p>Nothing!</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row final-result">
                        <div className="btn">
                            <button className='btn btn-success'>Calculeaza</button>
                        </div>
                        <p>raspunsul final</p>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default CaloriesCalculator