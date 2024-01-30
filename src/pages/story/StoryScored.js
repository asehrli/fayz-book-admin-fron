import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import {Button, Container} from "reactstrap";
import {POST, PUT} from "../api/API";
import {Checkbox} from "@mui/material";
import {Link} from "react-router-dom";
import vb from './psy.mp4'
import './AAA.css'

function StoryScored() {
    const [stories, setStories] = useState([
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

    const [score, setScore] = useState(-1)

    useEffect(() => {
        showAll()
    }, []);

    const showAll = () => {
        POST(BASE_PATH + '?read=' + true, {})
            .then(res => {
                setStories(res.data)
            })
            .catch(err => console.log(err))
    }

    const giveBall = (storyId) => {
        PUT("/story/" + storyId + '?score=' + score)
            .then(res => {
                showAll()
                console.log(res)
            }).catch(err => console.log(err))
    }

    const BASE_PATH = '/story'

    const unscored = (id) => {
        PUT("/story/unscored/" + id)
            .then(res => {
                showAll()
            }).catch(err => console.log(err))
    };
    return (
        <>
            <NavBar title={'Stories'}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <video width="100%" height="100%" src={vb} type="video/mp4" loop muted controls autoPlay>
            </video>
            <Container className={'container p-5 rounded-5'}>
                <div className={'hhh d-flex justify-content-between align-items-center'}>
                <h1 className={'text-success'}>Scored</h1>
                    <Link to={'/story/unscored'}>To Unscored</Link>
                </div>
                {stories.map(story =>
                    <div className="story my-5">
                        <div
                            className="story-header p-2 bg-success text-white d-flex align-items-center justify-content-around">
                            <div className="story-user d-flex gap-4">
                                {/*{JSON.stringify(story.userDTO)}*/}
                                <h5>{story.userDTO.firstName}</h5>
                                <h5>{story.userDTO.lastName}</h5>
                                <h5>{story.userDTO.phoneNumber}</h5>
                            </div>
                            <div className="story-book">
                                <h5><b>Section: </b>{story.sectionDTO.name}</h5>
                                <h5><b>Book: </b>{story.sectionDTO.book.title}</h5>
                            </div>
                        </div>
                        <div className="story-body p-2 text-dark fs-5">
                            {story.body}
                            {/*<br/>*/}
                            {/*{story.score ? 'A' : 'B'}*/}
                        </div>
                        <div className="story-footer p-2 d-flex justify-content-end gap-3">
                            <Button color={'secondary'}
                                    onClick={() => unscored(story.id)}>Unscored</Button>
                            <input type="text"
                                   onChange={(e) => setScore(e.target.value)}
                                   defaultValue={story.score}
                                   className={'form-control w-auto'}
                                   placeholder={'enter score'}/>
                            <Button color={'success'} onClick={() => giveBall(story.id)}>Save
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
}

export default StoryScored;