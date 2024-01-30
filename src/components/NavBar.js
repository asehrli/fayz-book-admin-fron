import React from 'react';
import {Button} from "reactstrap";
import './NavBar.css'
import {Link, Route, useLocation, useNavigate} from "react-router-dom";
import Home from "../Home";
import Login from "../pages/login/Login";
import Book from "../pages/book/Book";
import Section from "../pages/section/Section";
import Quiz from "../pages/quiz/Quiz";
import StoryScored from "../pages/story/StoryScored";
import StoryUnscored from "../pages/story/StoryUnscored";
import QuizHistoryReward from "../pages/quizhistory/QuizHistoryReward";
import QuizUnReward from "../pages/quizhistory/QuizUnReward";

function NavBar(props) {

    const navigator = useNavigate();
    const localtion = useLocation();

    const logout = () => {
        localStorage.clear()
        navigator('/login')
    }

    return (
        <div>
            <header className={'px-5 w-100 border d-flex justify-content-between align-items-center'}>
                <div className="logo d-flex justify-content-start  align-items-center gap-3">
                    <img src={require("./book.png")} alt="logo"/>
                    <h2 className={'text-success'}>{props.title}</h2>
                    <ul className={'d-grid links'}>
                        <Link className={'menu-link'} to='/'>Home</Link>
                        <Link className={'menu-link'} to='/login'>Login</Link>
                        <Link className={'menu-link'} to='/book'>Books</Link>
                        <Link className={'menu-link'} to="/story/scored">Scored Story</Link>
                        <Link className={'menu-link'} to="/story/unscored">Un Scored</Link>
                        <Link className={'menu-link'} to="/quiz-history/rewarded">Rewarded</Link>
                        <Link className={'menu-link'} to="/quiz-history/un-rewarded">Un rewarded</Link>
                    </ul>
                </div>
                <div className="info d-flex gap-2">
                    <Button color={'secondary'} onClick={logout}>Logout</Button>
                </div>
            </header>
        </div>
    );
}

export default NavBar;