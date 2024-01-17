import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import SidebarMenu from '../components/SidebarMenu'
import "../css/ArticleDetails.css";
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const { id } = useParams();
    const [thisArticle, setThisArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/articles/${id}`).then((response) => {
            if(response.data && response.data.length == 1){
                setThisArticle(response.data[0])
            }
        });
    }, []);

    return (
        <section>
            <div className='row'>
                <div className='sidebar'>
                    <SidebarMenu />
                </div>
                <div className='content-article'>
                    <div className="cover"></div>
                    <div className="text">
                        <h1 className='title'>{ thisArticle?.title }</h1>
                        <div className='description'>
                            <p>{ thisArticle?.description }</p>
                        </div>
                        <div className='user-details'>
                            <h4>{ thisArticle?.username }</h4>
                            <h4>{ thisArticle?.date }</h4>
                        </div>
                        <p>{ thisArticle?.content }</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ArticleDetails;