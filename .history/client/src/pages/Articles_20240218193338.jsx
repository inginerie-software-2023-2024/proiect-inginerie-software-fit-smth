import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import { NavLink, useNavigate } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
import { Link } from 'react-router-dom';
import "../css/Articles.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const Articles = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [articlesList, setArticlesList] = useState([]);
    const [values, setValues] = useState({
        searchKeyWords: "",
        showArticleForm: true,
        title: null,
        content: null,
        description: null,
        username: localStorage.getItem('currentUser').slice(1, -1),
        date: null,
        // image: null
    });

    useEffect(() => {
        axios.get("http://localhost:3001/articles/getArticles").then((response) => {
            if (response.data.Status === 'Error') {
                setArticlesList([])
            }
            else {
                setArticlesList(response.data)
            }
        });
    }, []);

    const initForm = () => {
        values.title = null;
        values.content = null;
        values.description = null;
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const currentDate = month + "/" + date + "/" + year;
        values.date = currentDate;
        values.username = localStorage.getItem('currentUser').slice(1, -1);
    }

    const handleSearch = (event) => {
        console.log(values.searchKeyWords);
        axios.get(`http://localhost:3001/articles/getArticles?searchKey=${values.searchKeyWords}`).then((response) => {
            if (response.data.Status === 'Error') {
                setArticlesList([])
            }
            else {
                setArticlesList(response.data)
            }
        });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        initForm();
    }
    const handleShow = () => {
        initForm();
        setShow(true);
    }
    const handleSubmit = () => {
        axios.post('http://localhost:3001/articles/add', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate("/articles");
                }
                else {
                    setError(res.data.Error)
                }
                axios.get("http://localhost:3001/articles/getArticles").then((response) => {
                    if (response.data.Status === 'Error') {
                        setArticlesList([])
                    }
                    else {
                        setArticlesList(response.data)
                    }
                })
            })
            .catch(err => console.log(err))
        setShow(false);
        initForm();
    }

    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const handleProcedureContentChange = (content) => {
        values.content = content;
    };

    return (
        <section>
            <div className='row'>
                <div className='sidebar'>
                    <SidebarMenu />
                </div>
                <div className='content-articles' style={{ paddingLeft: '20px' }}>
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                                placeholder="Search for articles"
                                aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={e => setValues({ ...values, searchKeyWords: e.target.value })} />
                            <span className="input-group-text" id="basic-addon2"
                                onClick={handleSearch} >
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </form>
                    <div className='row all-articles'>
                        {
                            articlesList.map(article => (
                                <div className="col col-md-4">
                                    <div className='card article-card'>
                                        <div className="image"></div>
                                        <div className="text">
                                            <h4>{article.title}</h4>
                                            <h6>{article.description}</h6>
                                            <p>{article.username}</p>
                                            <p>{article.date}</p>
                                            <p className='see-more'>
                                                <Link to={`/articles/${article.id}`}>
                                                    see article <i className="bi bi-arrow-right-short"></i>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        {
                            values.showArticleForm ?
                                (
                                    <section>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add a new article</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form>
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control"
                                                            placeholder="Title article"
                                                            aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                            onChange={e => setValues({ ...values, title: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="form-floating">
                                                            <textarea className="form-control" placeholder="Leave a comment here" id="txtarea1"
                                                                onChange={e => setValues({ ...values, description: e.target.value })}></textarea>
                                                            <label htmlFor="floatingTextarea2">Short description</label>
                                                        </div>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <ReactQuill
                                                            theme="snow"
                                                            modules={modules}
                                                            formats={formats}
                                                            placeholder="write your content ...."
                                                            onChange={handleProcedureContentChange}
                                                            style={{ height: "300px", width: "100%" }}
                                                        >
                                                        </ReactQuill>
                                                    </div>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="success" onClick={handleSubmit}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </section>
                                )
                                :
                                (
                                    <section>
                                    </section>
                                )
                        }
                    </div>
                    <div className='row add-button'>
                        <button type="button" className="btn btn-success" onClick={handleShow}>
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Articles;
