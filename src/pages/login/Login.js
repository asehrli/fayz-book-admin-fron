import React, {useState} from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Container} from "reactstrap";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {POST} from "../api/API";
import {BASE_URL} from "../config/Auth";

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const login = () => {
        POST('/api/auth/login', {
            username: username,
            password: password
        }).then(res => {
            localStorage.setItem('access-token', res.data.accessToken)
            localStorage.setItem('refresh-token', res.data.refreshToken)
            navigate('/book')
        }).catch(err => console.error(err));
    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                         class="img-fluid" alt="Sample image"/>
                </MDBCol>

                <MDBCol col='4' md='4' className={'ms-5 d-flex justify-content-center align-items-center'}>
                    <Container>

                        <MDBInput onChange={(ev) => setUsername(ev.target.value)} wrapperClass='mb-4' label='Username'
                                  id='formControlLg' type='text' size="lg"/>
                        <MDBInput onChange={(ev) => setPassword(ev.target.value)} wrapperClass='mb-4' label='Password'
                                  id='formControlLg' type='password' size="lg"/>

                        <div className='text-center d-flex justify-content-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 mx-auto px-5 login-btn" onClick={login} size='lg'>Login</MDBBtn>
                        </div>
                    </Container>
                </MDBCol>

            </MDBRow>

            <br/>
            <div
                className="d-none d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary rounded-5">

                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>

                <div>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{color: 'white'}}>
                        <MDBIcon fab icon='facebook-f' size="md"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{color: 'white'}}>
                        <MDBIcon fab icon='twitter' size="md"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{color: 'white'}}>
                        <MDBIcon fab icon='google' size="md"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{color: 'white'}}>
                        <MDBIcon fab icon='linkedin-in' size="md"/>
                    </MDBBtn>

                </div>

            </div>

        </MDBContainer>
    );
}

export default Login;