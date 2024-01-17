import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import {NavLink, useNavigate} from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
import { Link } from 'react-router-dom';
import "../css/Articles.css"

const Articles = () => {

    const navigate = useNavigate();
    const [articlesList, setArticlesList] = useState([]);
    const [values, setValues] = useState({
        searchKeyWords: "",
    });

    useEffect(() => {
        axios.get("http://localhost:3001/articles/getArticles").then((response) => {
            setArticlesList(response.data)
            console.log(response.data);
        });
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
                    <div className='row all-articles'>
                        {
                            articlesList.map(article => (
                                <div className="col col-md-4">
                                    <div className='card article-card'>
                                        <div className="image">

                                        </div>
                                        <div className="text">
                                            <h4>{ article.title }</h4>
                                            <h6>{ article.description }</h6>
                                            <p>{ article.username }</p>
                                            <p>{ article.date }</p>
                                            <p className='see-more'> 
                                                <Link to={`/articles/${article.id}`}>
                                                    see article <i class="bi bi-arrow-right-short"></i>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='row add-button'>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Articles;