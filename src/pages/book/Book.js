import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Book.css'
import NavBar from "../../components/NavBar";
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {DELETE, GET, PATCH, POST, PUT} from "../api/API";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Book() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // constants
    const [items, setItems] = useState([])
    const BASE_PATH = '/book'
    const [title, setTitle] = useState('')
    const [titleErr, setTitleErr] = useState('')
    const [author, setAuthor] = useState('')
    const [authorErr, setAuthorErr] = useState('')
    const [id, setId] = useState(-1)
    const [modalTitle, setModalTitle] = useState('Add Book')
    const [dNone, setDNone] = useState('d-none')
    const navigate = useNavigate();

    const notify = () => toast("Wow so easy!");

    // functions
    const setTitleValue = (e) => {
        setTitleErr('')
        setTitle(e.target.value)
    }
    const setAuthorValue = (e) => {
        setAuthorErr('')
        setAuthor(e.target.value)
    }
    const showAddModal = () => {
        setTitle('')
        setAuthor('')
        setModalTitle('Kitob qo\'shish')
        setDNone('')
        setId(-1)
        setTitleErr('')
        setAuthorErr('')
        toggle()
    }
    const closeModal = () => toggle()

    // api
    const showAll = () => {
        GET(BASE_PATH).then(res => {
            setItems(res.data)
        }).catch(err => {
            navigateLoginIfForbidden(err)
            toast(err.message)
        })
    }

    const navigateLoginIfForbidden = (err) => {
        if (err.response.status === 403) {
            navigate('/login')
        }
    }

    const save = () => {
        if (id === -1) {
            POST(BASE_PATH, {title: title, author: author}).then(res => {
                items.push(res.data)
                setItems(items)
                closeModal()
            }).catch(err => {
                navigateLoginIfForbidden(err)

                if (err.response.status === 400) {
                    for (let myErr of err.response.data.errors) {
                        console.log(myErr)
                        if (myErr.field === 'author') {
                            setAuthorErr(myErr.msg)
                        }
                        if (myErr.field === 'title') {
                            setTitleErr(myErr.msg)
                        }
                    }
                } else {
                    toast(err.message)
                }
            })
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
        }).catch(err => {
            navigateLoginIfForbidden(err)

            if (err.response.status === 400) {
                for (let myErr of err.response.data.errors) {
                    console.log(myErr)
                    if (myErr.field === 'author') {
                        setAuthorErr(myErr.msg)
                    }
                    if (myErr.field === 'title') {
                        setTitleErr(myErr.msg)
                    }
                }
            } else {
                toast(err.message)
            }
        })
    }


    const changeActivity = (item) => {
        PATCH(BASE_PATH + '/change-activity/' + item.id, {})
            .then(res => {
                showAll()
            })
            .catch(err => {
                navigateLoginIfForbidden(err)
                toast(err.message)
            })
    }

    const showEditModal = (item) => {
        setTitle(item.title.substring(0, item.title.indexOf('(')));
        setAuthor(item.title.substring(item.title.indexOf('(') + 1, item.title.lastIndexOf(')')))
        setModalTitle(`Kitobni tahrirlash`)
        setId(item.id)
        setDNone('')
        toggle()
    };

    const remove = (item) => {
        DELETE(BASE_PATH.concat(`/${item.id}`))
            .then(res => showAll())
            .catch(err => {
                navigateLoginIfForbidden(err)
                toast(err.response.data.errors[0].msg)
            })
    }

    return (
        <>
            <NavBar title={'Kitoblar'}/>
            <ToastContainer/>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <label className={'w-50 d-grid mx-auto gap-2'}>
                        <input value={id} type="text" hidden/>
                        <div className="inp-gr">
                            <i className={'text-danger ' + (titleErr === '' ? ' d-none' : '')}>{titleErr}</i>
                            <input placeholder={'nomi'} value={title} className={'form-control'} type="text"
                                   onChange={setTitleValue}/>
                        </div>
                        <div className="inp-gr">
                            <i className={'text-danger' + (authorErr === '' ? ' d-none' : '')}>{authorErr}</i>
                            <input placeholder={'muallif'} value={author} className={'form-control'} type="text"
                                   onChange={setAuthorValue}/>
                        </div>
                    </label>
                </ModalBody>
                <ModalFooter>
                    <br/>
                    <div className="actions d-flex justify-content-center mx-auto gap-5">
                        <Button onClick={save} color={'primary'} className={'save-btn'}>Save</Button>
                        <Button onClick={toggle} color={'danger'}
                                className={'cls-btn'}>Close</Button>
                    </div>
                </ModalFooter>
            </Modal>


            <div className={'p-5 w-100'}>
                <Button color={'info'} onClick={showAddModal}
                        className={'save-btn my-2 shadow-5-strong'}>Add
                    Book</Button>
                <Table className={'table bg-light table-hover table-striped text-dark'}>
                    <thead>
                    <tr>
                        <th>Id / Index</th>
                        <th>Nomi</th>
                        <th>Aktivligi</th>
                        <th>Bo'lim va Testlar</th>
                        <th>Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item, index) => <tr>
                        <td>{item.id + ' / ' + (index + 1)}</td>
                        <td>{item.title}</td>
                        <td>
                            <div className="form-check form-switch">
                                {<input className="form-check-input shadow"
                                        type="checkbox" checked={item.isActive}
                                        onClick={() => changeActivity(item)}
                                        id="flexSwitchCheckDefault"/>}
                            </div>
                        </td>
                        <td>
                            <Col className={'d-flex  justify-content-start gap-5'}>
                                <Link className={'border-bottom'} to={`/section/by-book-id/${item.id}`}>Sections</Link>
                                <Link className={'border-bottom'} to={`/quiz/by-book-id/${item.id}`}>Quiz</Link>

                            </Col>
                        </td>
                        <td className={'d-flex gap-3'}>
                            <Button onClick={() => showEditModal(item)} color={'warning'}>Edit</Button>
                            <Button onClick={() => remove(item)} color={'danger'}>Delete</Button>
                        </td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Book;