import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import {Button, Container} from "reactstrap";
import {POST, PUT} from "../api/API";
import './Scored.css'
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function StoryUnscored() {

    const navigate = useNavigate()
    const navigateLoginIfForbidden = (err) => {
        if (err.response.status === 403) {
            navigate('/login')
        }
    }

    const [stories, setStories] = useState()

    const navigatator = useNavigate()

    const [score, setScore] = useState(-1)
    const [dNone, setDNone] = useState('d-none')
    const [history, setHistory] = useState('')


    useEffect(() => {
        showAll()
    }, []);

    const showAll = () => {
        POST(BASE_PATH + '?read=' + false, {})
            .then(res => {
                setStories(res.data)
            })
            .catch(err => {
                navigateLoginIfForbidden(err)
                if (err.response.status === 400) {
                    for (const errEl of err.response.data.errors) {
                        toast(`${errEl.field} ${errEl.msg}`)
                    }
                } else
                    toast(err.message)
            })
    }

    const giveBall = (storyId) => {
        if (score > 0) {
            PUT("/story/" + storyId + '?score=' + score)
                .then(res => {
                    setScore(-1)
                    showAll()
                }).catch(err => {
                navigateLoginIfForbidden(err)
                if (err.response.status === 400) {
                    for (const errEl of err.response.data.errors) {
                        toast(`${errEl.field} ${errEl.msg}`)
                    }
                } else
                    toast(err.message)
            })
        }
    }

    const BASE_PATH = '/story'
    const closeModal = () => setDNone('d-none')


    return (
        <>
            <NavBar title={'Stories'}/>
            <ToastContainer/>
            <div className={'my-modal ' + dNone}>
                <div className={'shadow rounded-5 w-50'}>
                    <h1 className="title text-success text-center">History</h1>
                    <p>
                        {history}
                    </p>
                    <Button onClick={closeModal} type={'button'} color={'danger'}
                            className={'cls-btn'}>Close</Button>
                </div>
            </div>

            <div className={'w-100 p-5 rounded-5'}>
                <table className={'table table-secondary table-hover table-striped'}>
                    <thead>
                    <tr>
                        <th>Num</th>
                        <th>User</th>
                        {/*<th>Phone</th>*/}
                        <th>Book</th>
                        <th>Section</th>
                        <th>History</th>
                        <th>Action</th>
                    </tr>

                    </thead>
                    <tbody>
                    {stories?.map((story, index) => <tr>
                        <td>{index + 1}</td>
                        <td>
                            <Link
                                to={'/users/' + story.userDTO.chatId}>{story.userDTO.firstName} {story.userDTO.lastName}</Link>
                        </td>
                        {/*<td>{story.userDTO.phoneNumber}</td>*/}
                        {/*<td>{story.sectionDTO.book.title}</td>*/}
                        <td>{story.sectionDTO.book.title.length > 36 ? story.sectionDTO.book.title.substring(0, 33) + '...' : story.sectionDTO.book.title}</td>
                        <td>{story.sectionDTO.name}</td>
                        <td><Button onClick={() => {
                            setDNone('')
                            setHistory(story.body)
                        }} color={'info'} className={'m-0'}>Show_History</Button></td>
                        <td className={'d-flex m-0'}>
                            <input onChange={(e) => setScore(e.target.value)} type="number"
                                   className={'form-control rounded-0 m-0'}/>
                            <Button onClick={() => giveBall(story.id)} color={'dark'}
                                    className={'rounded-0 m-0 w-50'}>Give_Ball</Button>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default StoryUnscored;