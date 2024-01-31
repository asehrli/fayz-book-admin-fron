import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import NavBar from "../../components/NavBar";
import {Container, Table} from "reactstrap";
import {GET} from "../api/API";
import './User.css'


function User() {

    const location = useLocation();
    const userId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

    // constants
    const [user, setUser] = useState([])

    // api
    const showAll = () => {
        GET('/users/' + userId).then(res => {
            setUser(res.data)
        })
    }


    useEffect(showAll, []);


    return (
        <>
            <NavBar title={user.firstName + ' ' + user.lastName}/>
            <Container className={'border d-flex align-items-center shadow p-5 rounded-pill'}>
                <div className="header d-flex gap-5 align-items-center">
                    <img className={'user-logo'} src={require('./user.png')} alt=""/>
                    <div className="info">
                        <h1 className={'text-center text-success'}>{user.firstName + ' ' + user.lastName}</h1>
                        <h3>{user.phoneNumber}</h3>
                    </div>
                </div>
                <div className="more-info px-5 gap-3">
                    <h4 className={'d-flex justify-content-between gap-5 w-25 mx-auto'}>
                        <b>Age: </b><i>{user.age}</i></h4>
                    <h4 className={'d-flex justify-content-between gap-5 w-25 mx-auto'}>
                        <b>School: </b><i>{user.school}</i></h4>
                    <h4 className={'d-flex justify-content-between gap-5 w-25 mx-auto'}>
                        <b>Class: </b><i>{user.classNumber}</i></h4>
                    <h4 className={'d-flex justify-content-between gap-5 w-25 mx-auto'}>
                        <b>Teacher: </b><i>{user.teacherName}</i></h4>
                </div>
            </Container>
            <div className="user p-5 m-5 w-50 mx-auto text-white">
                <br/></div>
        </>
    );
}

export default User;