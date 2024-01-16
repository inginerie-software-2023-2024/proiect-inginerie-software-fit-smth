import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import '../css/Login.css'
import {NavLink, useNavigate} from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
import "../css/Articles.css"

const Articles = () => {

    const navigate = useNavigate();
    const [articlesList, setArticlesList] = useState([]);
    const [values, setValues] = useState({
        searchKeyWords: "",
    });

    useEffect(() => {
        // axios.get("http://localhost:3001/articles").then((response) => {
        //     setArticlesList(response.data)
        // });
    }, []);

    const handleSearch = (event) => {
        console.log(values.searchKeyWords);
    }

    return (
        <section>
            <div className='row'>
                <div className='sidebar'>
                    <SidebarMenu />
                </div>
                <div className='content-articles'>
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" 
                                placeholder="Search for articles" 
                                aria-label="Recipient's username" aria-describedby="basic-addon2" 
                                onChange = {e => setValues({...values, searchKeyWords: e.target.value})}/>
                            <span className="input-group-text" id="basic-addon2" 
                                onClick = {handleSearch} >
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Articles;