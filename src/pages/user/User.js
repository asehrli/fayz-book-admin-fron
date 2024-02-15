import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import NavBar from "../../components/NavBar";
import {Table} from "reactstrap";
import {GET} from "../api/API";
import {toast} from "react-toastify";


function User() {

    const navigate = useNavigate()
    const navigateLoginIfForbidden = (err) => {
        if (err.response.status === 403) {
            navigate('/login')
        }
    }

    // constants
    const [items, setItems] = useState([])

    // api
    const showAll = () => {
        GET('/users')
            .then(res => {
                setItems(res.data)
            }).catch(err => {
            navigateLoginIfForbidden(err)
            if (err.response.status === 400)
                toast(err.response.data.errors)
            else
                toast(err.message)
        })
    }


    useEffect(showAll, []);


    return (
        <>
            <NavBar title={'Book Page'}/>

            <div className={'p-5 w-100'}>
                <Table className={'table table-hover table-striped bg-light'}>
                    <thead>
                    <tr>
                        <th>Id / Index</th>
                        <th>Full name</th>
                        <th>Phone number</th>
                        <th>Age</th>
                        <th>Teacher name</th>
                        <th>School</th>
                        <th>Class number</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item, index) => <tr>
                        <td>{item.chatId + ' / ' + (index + 1)}</td>
                        <td><Link to={'/users/' + item.chatId}>{item.firstName} {item.lastName}</Link></td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.age}</td>
                        <td>{item.teacherName}</td>
                        <td>{item.school}</td>
                        <td>{item.classNumber}</td>
                        <td>{item.address.city + ', ' + item.address.region.name}</td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default User;