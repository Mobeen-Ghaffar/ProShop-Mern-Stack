import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        console.log(userInfo);
        if (!userInfo) {
            // navigate.push(redirect);
            navigate('/login');
        }
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(user.name);
                setEmail(user.email);
            }

        }
    }, [dispatch, navigate, userInfo, user])
    const submitHandler = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setMessage("Password don't match")
        }
        else {
            /// DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }


    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {success && <Message variant='success'>Profile Updated</Message>}
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
                    Update
                </Button>


            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>

}

export default ProfileScreen