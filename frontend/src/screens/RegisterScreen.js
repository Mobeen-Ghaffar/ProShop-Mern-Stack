import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer';
const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegister = useSelector(state => state.userRegister);

    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        console.log(userInfo);
        if (userInfo) {
            // navigate.push(redirect);
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setMessage("Password don't match")
        }
        else {
            /// DISPATCH REGISTER
            dispatch(register(name, email, password));
        }


    }

    return <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message >{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId='confirmpassword'>
                <Form.Label>Password </Form.Label>
                <Form.Control type='password' placeholder='Enter confirm password' value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign In
            </Button>


        </Form>

        <Row className='py-3'>
            <Col> Have An Account
                ?<Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
            </Col>
        </Row>
    </FormContainer>

}

export default RegisterScreen