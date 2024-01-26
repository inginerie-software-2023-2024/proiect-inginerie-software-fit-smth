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
    const [thisArticleComments, setThisArticleComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/articles/${id}`).then((response) => {
            if(response.data && response.data.length == 1){
                setThisArticle(response.data[0])
            }
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/articles/articleComments/${id}`).then((response) => {
            if(response.data.Status == 'Error'){
                setThisArticleComments([])
            }
            else
            {
                setThisArticleComments(response.data)
            }
        });
    }, []);

    const handleAddComment = (event) => {
    }

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
                        <div className='user-details'>
                            <h4>{ thisArticle?.username }</h4>
                            <h4>{ thisArticle?.date }</h4>
                        </div>
                        <div className='description'>
                            <p>{ thisArticle?.description }</p>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: thisArticle?.content}}></div>
                    </div>
                    <div className="comments">
                        <h5>Comentarii</h5>
                        {
                            thisArticleComments?.map(comment => (
                                <div className="comment">
                                    <h6><strong>{ comment?.username }</strong></h6>
                                    <h6 className='date'>{ comment?.date?.slice(0,10) }</h6>
                                    <p>{ comment?.content }</p>
                                </div>
                            )) 
                        }
                    </div>
                    <div className='row add-button'>
                        <button type="button" class="btn btn-success"
                            onClick = {handleAddComment} >
                            <i class="bi bi-chat-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ArticleDetails;