import React, {useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import SidebarMenu from '../components/SidebarMenu'
import "../css/ArticleDetails.css";
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState("");
    const [thisArticle, setThisArticle] = useState(null);
    const [thisArticleComments, setThisArticleComments] = useState([]);
    const [values, setValues] = useState({
        content: null,
        username: null,
        id_article: null,
        date: null
    });
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/articles/${id}`).then((response) => {
            if(response.data && response.data.length === 1){
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
        setValues(null)
        setShow(true)
    }

    const closeAddComment = (event) => {
        setShow(false)
        setValues(null)
    }

    const submitAddComment = (event) => {
        values.username = localStorage.getItem('currentUser').slice(1, -1);
        values.id_article = thisArticle.id
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today. getDate();
        const currentDate = month + "/" + date + "/" + year;
        values.date = currentDate;
        closeAddComment();
        axios.post('http://localhost:3001/articles/addComment', values)
        .then(res => {
            if(res.data.Status === 'Success'){
                navigate(`/articles/${id}`);
            }
            else{
                setError(res.data.Error)
            }
            axios.get(`http://localhost:3001/articles/articleComments/${id}`).then((response) => {
                if(response.data.Status === 'Error'){
                    setThisArticleComments([])
                }
                else
                    {
                        setThisArticleComments(response.data)
                    }
                })
        })
        .catch(err => console.log(err))
    }

    const deleteArticle = (event) => {
        axios.delete(`http://localhost:3001/articles/deleteArticle/${thisArticle.id}`)
        .then(res => {
            if(res.data.Status === 'Success'){
                navigate(`/articles`);
            }
            else{
                setError(res.data.Error)
            }
            navigate(`/articles`);
        })
        .catch(err => console.log(err))
    }

    const deleteComment = (comment) => {
        console.log(comment);
        axios.delete(`http://localhost:3001/articles/deleteComment/${comment.id}`)
        .then(res => {
            if(res.data.Status === 'Success'){
                navigate(`/articles/${thisArticle.id}`);
            }
            else{
                setError(res.data.Error)
            }
            axios.get(`http://localhost:3001/articles/articleComments/${id}`).then((response) => {
                if(response.data.Status === 'Error'){
                    setThisArticleComments([])
                }
                else
                    {
                        setThisArticleComments(response.data)
                    }
                })
            navigate(`/articles/${thisArticle.id}`);
        })
        .catch(err => console.log(err))
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
                            <section>
                                <h4>{ thisArticle?.username }</h4>
                                <h4>{ thisArticle?.date }</h4>
                            </section>
                            {
                                thisArticle?.username === localStorage?.getItem('currentUser')?.slice(1,-1) ?
                                (
                                    <button type="button" class="btn btn-danger"
                                        onClick = {deleteArticle} >
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                )
                                :
                                (
                                    <section></section>
                                )
                            }
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
                                    <div className='top-user'>
                                        <section>
                                            <h6><strong>{ comment?.username }</strong></h6>
                                            <h6 className='date'>{ comment?.date?.slice(0,10) }</h6>
                                        </section>
                                        {
                                            comment?.username === localStorage?.getItem('currentUser')?.slice(1,-1) ?
                                            (
                                                <button type="button" class="btn btn-danger"
                                                    onClick = {() => deleteComment(comment)} >
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            )
                                            :
                                            (
                                                <section></section>
                                            )
                                        }
                                    </div>
                                    <p>{ comment?.content }</p>
                                </div>
                            )) 
                        }
                    </div>
                    {
                        show ? 
                        (
                            <div className='row add-button'>
                                <div className="add-comment">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="txtarea-comment"
                                    onChange = {e => setValues({...values, content: e.target.value})}></textarea>
                                </div>
                                <div className="buttons">
                                    <button type="button" class="btn btn-danger"
                                        onClick = {closeAddComment} >
                                        <i class="bi bi-x-circle-fill"></i>
                                    </button>
                                    <button type="button" class="btn btn-success"
                                        onClick = {submitAddComment} >
                                        <i class="bi bi-arrow-right-circle-fill"></i>
                                    </button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className='row add-button-end'>
                                <button type="button" class="btn btn-success"
                                    onClick = {handleAddComment} >
                                    <i class="bi bi-chat-fill"></i>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default ArticleDetails;