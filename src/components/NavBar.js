import React, {useState} from 'react';
import {Button} from "reactstrap";
import './NavBar.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.min.css'

function NavBar(props) {

    const navigator = useNavigate();

    const [mc, setMc] = useState('close')
    let f = true;

    const logout = () => {
        localStorage.clear()
        navigator('/login')
    }

    return (
        <div className={'my-navbar'}>
            <header
                className={'px-5 w-100 d-flex justify-content-between align-items-center'}>
                <div className="logo d-flex justify-content-start  align-items-center gap-3">
                    <img src={require("./book2.png")} alt="logo"/>
                    <h2 className={'text-primary'}>{props.title}</h2>
                </div>
                <div className="info d-flex gap-2">
                    <Button color={'primary'}
                            onClick={logout}>Logout</Button>
                </div>
            </header>
            <menu className={'p-0 m-0 position-fixed shadow'}>
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

                            lines[1].classList.add('line-cls')
                            lines[2].classList.add('line-cls')

                        } else {
                            menu.style.left = '-15rem'
                            lines[0].style.height = '.3rem'
                            lines[1].style.transform = ''
                            lines[2].style.transform = ''

                            lines[1].classList.remove('line-cls')
                            lines[2].classList.remove('line-cls')

                        }
                    }}>
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                    </div>
                </div>
                <ul className={'m-0 p-0 d-grid links '}>
                    <Link className={'menu-link d-flex align-items-center w-100 ps-4'} to='/book'><span>Books</span></Link>
                    <Link className={'menu-link d-flex align-items-center w-100 ps-4'} to='/story/scored'><span>Scored</span> Story</Link>
                    <Link className={'menu-link d-flex align-items-center w-100 ps-4'} to='/story/unscored'><span>Un</span> Scored</Link>
                    <Link className={'menu-link d-flex align-items-center w-100 ps-4'} to='/quiz-history/rewarded'><span>Rewarded</span></Link>
                    <Link className={'menu-link d-flex align-items-center w-100 ps-4'} to='/quiz-history/un-rewarded'><span>Un</span> rewarded</Link>
                    <Link className={'menu-link d-flex align-items-center w-100 ps-4'} to='/users'><span>Users</span></Link>
                </ul>
            </menu>
        </div>
    );
}

export default NavBar;