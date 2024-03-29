import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import './Section.css'
import NavBar from "../../components/NavBar";
import {Button, Container, Table} from "reactstrap";
import {DELETE, GET, POST, PUT} from "../api/API";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Section(props) {


    const navigate = useNavigate()
    const navigateLoginIfForbidden = (err) => {
        if (err.response.status === 403) {
            navigate('/login')
        }
    }

    // constants
    const [items, setItems] = useState([])
    const location = useLocation()
    const BASE_PATH = '/section';
    const GET_PATH = location.pathname
    const bookId = +GET_PATH.substring(GET_PATH.lastIndexOf('/') + 1)
    const [name, setName] = useState('')
    const [id, setId] = useState(-1)
    const [modalTitle, setModalTitle] = useState('Add Book')
    const [dNone, setDNone] = useState('d-none')
    const [book, setBook] = useState({})

    // functions
    const setNameValue = (e) => setName(e.target.value)
    const showAddModal = () => {
        setName('')
        setModalTitle('Add Section')
        setDNone('')
        setId(-1)
    }
    const closeModal = () => setDNone('d-none')

    // api
    const showAll = () => {
        GET(GET_PATH).then(res => {
            setItems(res.data)
        }).catch(err => {
                navigateLoginIfForbidden(err)
            if (err.response.status === 400) {
                for (const errEl of err.response.data.errors) {
                    toast(`${errEl.field} ${errEl.msg}`)
                }
            } else
                toast(err.message)
            }
        )

        GET('/book/' + bookId).then(res => setBook(res.data))
            .catch(err => {
                    navigateLoginIfForbidden(err)
                    if (err.response.status === 400) {
                        for (const errEl of err.response.data.errors) {
                            toast(`${errEl.field} ${errEl.msg}`)
                        }
                    } else
                        toast(err.message)
                }
            )
    }

    const save = () => {
        if (id === -1) {
            POST(BASE_PATH, {name: name, bookId: bookId}).then(res => {
                items.push(res.data)
                setItems(items)
                showAll()
            }).catch(err => {
                    navigateLoginIfForbidden(err)
                    if (err.response.status === 400) {
                        for (const errEl of err.response.data.errors) {
                            toast(`${errEl.field} ${errEl.msg}`)
                        }
                    } else
                        toast(err.message)
                }
            )
        } else {
            PUT(BASE_PATH + '/' + id, {name: name, bookId: bookId})
                .then(res => {
                    showAll()
                }).catch(err => {
                    navigateLoginIfForbidden(err)
                    if (err.response.status === 400) {
                        for (const errEl of err.response.data.errors) {
                            toast(`${errEl.field} ${errEl.msg}`)
                        }
                    } else
                        toast(err.message)
                }
            )
        }

        closeModal()
    }

    useEffect(showAll, []);


    const showEditModal = (item) => {
        setName(item.name);
        setModalTitle('Edit Book')
        setId(item.id)
        setDNone('')
    };

    const remove = (item) => {
        DELETE(BASE_PATH.concat(`/${item.id}`))
            .then(res => showAll())
            .catch(err => {
                    navigateLoginIfForbidden(err)
                    if (err.response.status === 400) {
                        for (const errEl of err.response.data.errors) {
                            toast(`${errEl.field} ${errEl.msg}`)
                        }
                    } else
                        toast(err.message)
                }
            )
    }

    return (
        <>
            <NavBar title={'Section Page'}/>
            <ToastContainer/>
            <div className={'my-modal ' + dNone}>
                <Container className={'container shadow p-5 rounded-5 w-50'}>
                    <h1 className="title text-success text-center">{modalTitle}</h1>
                    <form className={'d-grid gap-2'}>
                        <br/>
                        <label className={'w-50 d-grid mx-auto gap-2'}>
                            <input value={id} type="text" hidden/>
                            <input placeholder={'name'} value={name} className={'form-control'} type="text"
                                   onChange={setNameValue}/>
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
                <p><b>Book: </b>{book.title}</p>
                <Button color={'success'} onClick={showAddModal} className={'save-btn my-2 shadow-5-strong'}>Add
                    Section</Button>
                <Table className={'table table-hover table-striped'}>
                    <thead>
                    <tr>
                        <th>Id / Index</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item, index) => <tr>
                        <td>{item.id + ' / ' + (index + 1)}</td>
                        <td>{item.name}</td>
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

export default Section;