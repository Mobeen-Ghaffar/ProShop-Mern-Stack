import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message';
// import Loader from '../components/Loader';
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
const PaymentScreen = () => {



    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const navigate = useNavigate();
    if (!shippingAddress) {
        navigate('/shipping')

    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({ paymentMethod }));
        navigate('/placeorder');

    }
    return <FormContainer>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method </Form.Label>

                <Col>
                    <Row>
                        <Form.Check type="radio" label='Paypal or Credit Card' id='Paypal'
                            name='paymentMethod' value='Paypal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Row>
                    {/* <Row>
                        <Form.Check type="radio" label='Stripe' id='Stripe'
                            name='paymentMethod' value='Stripe' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Row> */}

                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>


        </Form>
    </FormContainer>
}

export default PaymentScreen;