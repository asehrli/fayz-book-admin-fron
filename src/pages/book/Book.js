import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './Book.css'
import NavBar from "../../components/NavBar";
import {Button, Col, Container, Table} from "reactstrap";
import {DELETE, GET, PATCH, POST, PUT} from "../api/API";


function Book() {
    // constants
    const [items, setItems] = useState([])
    const BASE_PATH = '/book'
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [id, setId] = useState(-1)
    const [modalTitle, setModalTitle] = useState('Add Book')
    const [dNone, setDNone] = useState('d-none')

    // functions
    const setTitleValue = (e) => setTitle(e.target.value)
    const setAuthorValue = (e) => setAuthor(e.target.value)
    const showAddModal = () => {
        setTitle('')
        setAuthor('')
        setModalTitle('Add Book')
        setDNone('')
        setId(-1)
    }
    const closeModal = () => setDNone('d-none')

    // api
    const showAll = () => {
        GET(BASE_PATH).then(res => {
            setItems(res.data)
        })
    }

    const save = () => {
        if (id === -1) {
            POST(BASE_PATH, {title: title, author: author}).then(res => {
                items.push(res.data)
                setItems(items)
                closeModal()
            }).catch(err => console.log(err))
        } else {
            edit()
        }
    }

    useEffect(showAll, []);

    const edit = () => {
        PUT(BASE_PATH + '/' + id, {
            title: title,
            author: author
        }).then(res => {
            showAll()
            closeModal()
        })
    }


    const changeActivity = (item) => {
        PATCH(BASE_PATH + '/change-activity/' + item.id, {})
            .then(res => {
                if (res.data) {
                    item.isActive = !item.isActive;
                    setItems(items)
                }
            })
    }

    const showEditModal = (item) => {
        setTitle(item.title.substring(0, item.title.indexOf('(')));
        setAuthor(item.title.substring(item.title.indexOf('(') + 1, item.title.lastIndexOf(')')))
        setModalTitle('Edit Book')
        setId(item.id)
        setDNone('')
    };

    const remove = (item) => {
        DELETE(BASE_PATH.concat(`/${item.id}`))
            .then(res => showAll())
    }

    return (
        <>
            <NavBar title={'Book Page'}/>

            <div className={'my-modal ' + dNone}>
                <Container className={'container shadow p-5 rounded-5 w-50'}>
                    <h1 className="title text-success text-center">{modalTitle}</h1>
                    <form className={'d-grid gap-2'}>
                        <br/>
                        <label className={'w-50 d-grid mx-auto gap-2'}>
                            <input value={id} type="text" hidden/>
                            <input placeholder={'title'} value={title} className={'form-control'} type="text"
                                   onChange={setTitleValue}/>
                            <input placeholder={'author'} value={author} className={'form-control'} type="text"
                                   onChange={setAuthorValue}/>
                        </label>
                        <br/>
                        <div className="actions d-flex justify-content-center gap-5">
                            <Button onClick={save} color={'success'} className={'save-btn'}>Save</Button>
                            <Button onClick={closeModal} type={'button'} color={'danger'}
                                    className={'cls-btn'}>Close</Button>
                        </div>
                    </form>
                </Container>
            </div>

            <Container className={'container'}>
                <Button color={'success'} onClick={showAddModal} className={'save-btn my-2 shadow-5-strong'}>Add
                    Book</Button>
                <Table className={'table table-hover table-striped'}>
                    <thead>
                    <tr>
                        <th>Id / Index</th>
                        <th>Title</th>
                        <th>Activity</th>
                        <th>Change Content</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item, index) => <tr>
                        <td>{item.id + ' / ' + (index + 1)}</td>
                        <td>{item.title}</td>
                        <td>
                            <div className="form-check form-switch">
                                {item.isActive ? <input className="form-check-input shadow"
                                                        type="checkbox" checked
                                                        onClick={() => changeActivity(item)}
                                                        id="flexSwitchCheckDefault"/> :
                                    <input className="form-check-input shadow"
                                           type="checkbox"
                                           onClick={() => changeActivity(item)}
                                           id="flexSwitchCheckDefault"/>}
                            </div>
                        </td>
                        <td>
                            <Col className={'d-flex justify-content-start gap-5'}>
                                <Link to={`/section/by-book-id/${item.id}`}>Sections</Link>
                                <Link to={`/quiz/by-book-id/${item.id}`}>Quiz</Link>

                            </Col>
                        </td>
                        <td className={'d-flex gap-3'}>
                            <Button onClick={() => showEditModal(item)} color={'warning'}>Edit</Button>
                            <Button onClick={() => remove(item)} color={'danger'}>Delete</Button>
                        </td>
                    </tr>)}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default Book;