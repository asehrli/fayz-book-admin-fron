import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import './Quiz.css'
import NavBar from "../../components/NavBar";
import {Button, Container, Table} from "reactstrap";
import {DELETE, GET, POST, PUT} from "../api/API";


function Quiz(props) {
    // constants
    const [items, setItems] = useState([])
    const location = useLocation()
    const BASE_PATH = '/quiz';
    const GET_PATH = location.pathname
    const bookId = +GET_PATH.substring(GET_PATH.lastIndexOf('/') + 1)
    const [modalTitle, setModalTitle] = useState('Add Quiz')
    const [dNone, setDNone] = useState('d-none')
    const [book, setBook] = useState({})

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [rightAnswer, setRightAnswer] = useState('')
    const [wrongAnswer1, setWrongAnswer1] = useState('')
    const [wrongAnswer2, setWrongAnswer2] = useState('')
    const [wrongAnswer3, setWrongAnswer3] = useState('')
    const [id, setId] = useState(-1)

    // functions
    const setNameValue = (e) => setName(e.target.value)
    const setPriceValue = (e) => setPrice(e.target.value)
    const setRightAnswerValue = (e) => setRightAnswer(e.target.value)
    const setWrongAnswer1Value = (e) => setWrongAnswer1(e.target.value)
    const setWrongAnswer2Value = (e) => setWrongAnswer2(e.target.value)
    const setWrongAnswer3Value = (e) => setWrongAnswer3(e.target.value)

    const showAddModal = () => {
        setName('')
        setPrice('')
        setRightAnswer('')
        setWrongAnswer1('')
        setWrongAnswer2('')
        setWrongAnswer3('')

        setModalTitle('Add Section')
        setDNone('')
        setId(-1)
    }
    const closeModal = () => setDNone('d-none')

    // api
    const showAll = () => {
        GET(GET_PATH).then(res => {
            setItems(res.data)
            console.log(res.data)
        })

        GET('/book/' + bookId).then(res => setBook(res.data))
    }

    const save = () => {
        if (id === -1) {
            POST(BASE_PATH, {
                name: name,
                price: price,
                bookId: bookId,
                answerList: [
                    {
                        name: rightAnswer,
                        correct: true,
                    },
                    {
                        name: wrongAnswer1,
                        correct: false
                    },
                    {
                        name: wrongAnswer2,
                        correct: false
                    },
                    {
                        name: wrongAnswer3,
                        correct: false
                    }
                ]
            }).then(res => {
                items.push(res.data)
                setItems(items)
                showAll()
            }).catch(err => console.log(err))
        } else {
            let putObj = {
                name: name,
                price: price,
                bookId: bookId,
                answerList: [
                    {
                        name: rightAnswer,
                        correct: true,
                    },
                    {
                        name: wrongAnswer1,
                        correct: false
                    },
                    {
                        name: wrongAnswer2,
                        correct: false
                    },
                    {
                        name: wrongAnswer3,
                        correct: false
                    }
                ]
            }
            console.log(putObj)
            PUT(BASE_PATH + '/' + id, putObj).then(res => {
                console.log('AA')
                showAll()
            }).catch(err => {
                console.log(err)
            })
        }

        closeModal()
    }

    useEffect(showAll, []);


    const showEditModal = (item) => {
        console.log(item)
        setName(item.name);
        setPrice(item.price)

        let rai = -1;
        let index = -1;
        for (let i of item.answerList) {
            index++;
            if (i?.correct) {
                setRightAnswer(i.name)
                rai = index;
            }
        }

        if (rai === 0) {
            setWrongAnswer1(item.answerList[1].name)
            setWrongAnswer2(item.answerList[2].name)
            setWrongAnswer3(item.answerList[3].name)
        }

        if (rai === 1) {
            setWrongAnswer1(item.answerList[0].name)
            setWrongAnswer2(item.answerList[2].name)
            setWrongAnswer3(item.answerList[3].name)
        }

        if (rai === 2) {
            setWrongAnswer1(item.answerList[1].name)
            setWrongAnswer2(item.answerList[0].name)
            setWrongAnswer3(item.answerList[3].name)
        }

        if (rai === 3) {
            setWrongAnswer1(item.answerList[1].name)
            setWrongAnswer2(item.answerList[2].name)
            setWrongAnswer3(item.answerList[0].name)
        }


        setModalTitle('Edit Quiz')
        setId(item.id)
        setDNone('')
    };

    const remove = (item) => {
        DELETE(BASE_PATH.concat(`/${item.id}`))
            .then(res => showAll())
    }

    return (
        <>
            <NavBar title={'Quiz Page'}/>

            <div className={'my-modal ' + dNone}>
                <Container className={'container shadow p-5 rounded-5 w-50'}>
                    <h1 className="title text-success text-center">{modalTitle}</h1>
                    <form className={'d-grid gap-2'}>
                        <br/>
                        <label className={'w-50 d-grid mx-auto gap-2'}>
                            <input value={id} type="text" hidden/>
                            <input placeholder={'name'} value={name} className={'form-control'} type="text"
                                   onChange={setNameValue}/>
                            <input placeholder={'price'} value={price} className={'form-control'} type="number"
                                   onChange={setPriceValue}/>

                            <input placeholder={'right answer'} value={rightAnswer} className={'form-control'}
                                   type="text"
                                   onChange={setRightAnswerValue}/>
                            <input placeholder={'wrong answer'} value={wrongAnswer1} className={'form-control'}
                                   type="text"
                                   onChange={setWrongAnswer1Value}/>
                            <input placeholder={'wrong answer'} value={wrongAnswer2} className={'form-control'}
                                   type="text"
                                   onChange={setWrongAnswer2Value}/>
                            <input placeholder={'wrong answer'} value={wrongAnswer3} className={'form-control'}
                                   type="text"
                                   onChange={setWrongAnswer3Value}/>

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
                <Button color={'success'} onClick={showAddModal} className={'save-btn my-2 shadow-5-strong'}>
                    Add Quiz</Button>
                <Table className={'table table-hover table-striped'}>
                    <thead>
                    <tr>
                        <th>Id / Index</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th className={'w-25'}>Answers</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item, index) => <tr>
                        <td>{item.id + ' / ' + (index + 1)}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td><select className={'form-control'}>
                            {item.answerList?.map(item => <option>{item.name} {item.correct ? '✅' : '❌'}</option>)}
                        </select></td>
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

export default Quiz;