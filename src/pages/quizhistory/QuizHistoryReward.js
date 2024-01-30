import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import {Button, Container} from "reactstrap";
import './QuizHistory.css'
import {GET} from "../api/API";

function QuizHistoryReward() {
    const [quizHistories, setQuizHistories] = useState([
        // {
        //     id: 0,
        //     body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut autem culpa debitis inventore iusto laborum nam nemo, porro ratione repudiandae sequi tenetur veritatis voluptatem voluptatibus. Eveniet ex Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut autem culpa debitis inventore iusto laborum nam nemo, porro ratione repudiandae sequi tenetur veritatis voluptatem voluptatibus. Eveniet    facilis libero veritatis. Enim ex maxime nam neque perferendis sit voluptate! Nihil.",
        //     // score: null,
        //     sectionDTO: {
        //         id: 0,
        //         name: 'lanati section',
        //         book: {
        //             id: 0,
        //             title: 'jin ursin book da author yo`q aldama blin',
        //             isActive: true
        //         }
        //     },
        //     userDTO: {
        //         id: 0,
        //         chatId: 1,
        //         firstName: 'Firstname',
        //         lastName: 'Lastname',
        //         phoneNumber: '+998 77 777 77 77',
        //         age: 20,
        //         teacherName: 'Alisher',
        //         school: 43,
        //         classNumber: 99
        //     }
        // }
    ])

    useEffect(() => {
        showAll()
    }, []);

    const showAll = () => {
        GET("/quiz-history?rewarded=true")
            .then(res => {
                setQuizHistories(res.data)
            }).catch(err => console.log(err))
    }

    return (
        <>
            <NavBar title={'Quiz History'}/>
            <Container className={'container p-5 rounded-5'}>
                {quizHistories.map(item =>
                    <div className="story my-5">
                        <div
                            className="story-header p-2 bg-success text-white d-flex align-items-center justify-content-around">
                            <div className="story-user gap-4">
                                <h5><b>Name: </b>{item.userDTO.firstName} {item.userDTO.lastName}</h5>
                                <h5><b>Phone: </b>{item.userDTO.phoneNumber}</h5>
                            </div>
                            <div className="story-book">
                                <h5><b>Book: </b>{item.bookDTO.title}</h5>
                            </div>
                        </div>
                        <div className="story-body p-2 text-dark fs-5">
                            correct answer count {item.correctAnswer} OF {item.numberOfQuestion} questions
                            <br/>
                            <b>Total price: </b>{item.totalPrice}
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
}

export default QuizHistoryReward;