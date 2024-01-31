import React, {useState} from 'react';
import {Button} from "reactstrap";
import './NavBar.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.min.css'

function NavBar(props) {

    const navigator = useNavigate();
    const localtion = useLocation();

    const [mc, setMc] = useState('close')
    let f = true;

    const logout = () => {
        localStorage.clear()
        navigator('/login')
    }

    return (
        <div>
            <header
                className={'shadow bg-gradient px-5 w-100 border d-flex justify-content-between align-items-center'}>
                <div className="logo d-flex justify-content-start  align-items-center gap-3">
                    <img src={require("./book.png")} alt="logo"/>
                    <h2 className={'text-success'}>{props.title}</h2>
                </div>
                <div className="info d-flex gap-2">
                    <Button color={'primary'}
                            onClick={logout}>Logout</Button>
                </div>
            </header>
            <menu className={'p-0 m-0 position-fixed bg-light shadow '}>
                <div className="menu-open p-2 text-end">
                    <div className='menu-icon ' onClick={() => {
                        let menu = document.querySelector('menu')
                        let element = menu.querySelector('.menu-open');
                        let lines = element.querySelectorAll('.line')

                        if (f || menu.style.left === '-15rem') {
                            f = false;
                            menu.style.left = '0'
                            element.style.right = '-3rem'
                            lines[0].style.height = '0'
                            lines[1].style.transform = 'rotate(-45deg) translateY(.5rem)'
                            lines[2].style.transform = 'rotate(45deg) translateY(-.5rem)'
                        } else {
                            menu.style.left = '-15rem'
                            lines[0].style.height = '.3rem'
                            lines[1].style.transform = ''
                            lines[2].style.transform = ''
                        }
                    }}>
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                    </div>
                </div>
                <ul className={'m-0 p-0 d-grid links '}>
                    <Link className={'menu-link'} to='/'>Home</Link>
                    <Link className={'menu-link'} to='/login'>Login</Link>
                    <Link className={'menu-link'} to='/book'>Books</Link>
                    <Link className={'menu-link'} to="/story/scored">Scored Story</Link>
                    <Link className={'menu-link'} to="/story/unscored">Un Scored</Link>
                    <Link className={'menu-link'} to="/quiz-history/rewarded">Rewarded</Link>
                    <Link className={'menu-link'} to="/quiz-history/un-rewarded">Un rewarded</Link>
                    <Link className={'menu-link'} to="/users">Users</Link>
                </ul>
            </menu>
        </div>
    );
}

export default NavBar;