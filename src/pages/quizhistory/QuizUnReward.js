import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import {Button, Container} from "reactstrap";
import './QuizHistory.css'
import {GET, POST} from "../api/API";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function QuizHistoryUnReward() {

    const navigate = useNavigate()
    const navigateLoginIfForbidden = (err) => {
        if (err.response.status === 403) {
            navigate('/login')
        }
    }

    const [quizHistories, setQuizHistories] = useState([])

    useEffect(() => {
        showAll()
    }, []);

    const showAll = () => {
        GET("/quiz-history?rewarded=false")
            .then(res => {
                setQuizHistories(res.data)
            }).catch(err => {
            navigateLoginIfForbidden(err)
            if (err.response.status === 400)
                toast(err.response.data.errors)
            else
                toast(err.message)
        })
    }

    const reward = (id) => {
        POST('/reward/' + id, {})
            .then(res => {
                console.log(res.data)
                showAll()
            }).catch(err => {
            navigateLoginIfForbidden(err)
            if (err.response.status === 400)
                toast(err.response.data.errors)
            else
                toast(err.message)
        })
    }

    return (
        <>
            <NavBar title={'Quiz History'}/>
            <ToastContainer/>
            <div className={'p-5 w-100'}>
                {quizHistories.map((item, index) =>
                    <table className={'table table-secondary shadow table-striped table-hover'}>
                        <thead>
                        <tr>
                            <th>Num</th>
                            <th>User</th>
                            {/*<th>Phone</th>*/}
                            <th className={'w-25'}>Book</th>
                            <th>Correct Answer</th>
                            <th>Number of question</th>
                            <th>Total price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    to={'/users/' + item.userDTO.chatId}>{item.userDTO.firstName} {item.userDTO.lastName}</Link>
                            </td>
                            {/*<td>{item.userDTO.phoneNumber}</td>*/}
                            <td>{item.bookDTO.title.length > 36 ? item.bookDTO.title.substring(0, 33) + '...' : item.bookDTO.title}</td>
                            <td>{item.correctAnswer}</td>
                            <td>{item.numberOfQuestion}</td>
                            <td>{item.totalPrice}</td>
                            <td>
                                <Button color={'success'} onClick={() => reward(item.id)}>Reward</Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default QuizHistoryUnReward;