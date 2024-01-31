import Login from "./pages/login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Book from "./pages/book/Book";
import Section from "./pages/section/Section";
import Quiz from "./pages/quiz/Quiz";
import StoryScored from "./pages/story/StoryScored";
import StoryUnscored from "./pages/story/StoryUnscored";
import QuizHistoryReward from "./pages/quizhistory/QuizHistoryReward";
import QuizUnReward from "./pages/quizhistory/QuizUnReward";
import User from "./pages/user/User";
import OneUser from "./pages/user/OneUser";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/book' element={<Book/>}/>
                <Route path='/section/by-book-id/:bookId' element={<Section/>}/>
                <Route path='/quiz/by-book-id/:bookId' element={<Quiz/>}/>
                <Route path="/story/scored" element={<StoryScored/>}/>
                <Route path="/story/unscored" element={<StoryUnscored/>}/>
                <Route path="/quiz-history/rewarded" element={<QuizHistoryReward/>}/>
                <Route path="/quiz-history/un-rewarded" element={<QuizUnReward/>}/>
                <Route path="/users" element={<User/>}/>
                <Route path="/users/:userId" element={<OneUser/>}/>
                {/*<Route path="/post2" element={<PostPageLoad/>}/>*/}
                {/*<Route path="/login" element={<Login/>}/>*/}
                {/*<Route path="/cabinet" element={<Cabinet/>}/>*/}
                {/*<Route path="/book/:id" element={<OneBookDetail/>}/>*/}
                {/*<Route path="*" element={<NotFound404/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
