
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions.js'
import { ORDER_PAY_RESET } from '../constants/orderContants.js'
const OrderScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const orderId = params.id;

    const [sdkready, setSkdReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    console.log(order);



    const orderPay = useSelector(state => state.orderPay);
    const { success: successPay, loading: loadingPay } = orderPay;



    // console.log(order.orderItems);
    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }
    // order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))


    const navigate = useNavigate();
    useEffect(() => {

        const addPayPalScript = async () => {
            // axios
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`

            script.async = true;
            script.onload = () => {
                setSkdReady(true);
            }
            document.body.appendChild(script)
        }

        addPayPalScript();

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {

        }
        // dispatch, orderId, successPay
    }, [dispatch, order, orderId, successPay])


    const successPaymentHandlder = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }


    return loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order :{order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                            </p>
                            {order.isDeliver ? (<Message variant='success'>Delivered on {order.isDeliver}</Message>)
                                : (<Message variant='danger'>Not Delivered</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}</Message>)
                                : (<Message variant='danger'>Not Paid</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>


                            {order.orderItems.length === 0 ? <Message> Order is emtpy</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>

                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>

                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty}x${item.price}=${
                                                            item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader></Loader>}
                                    {!sdkready ? <Loader></Loader> :
                                        (
                                            <PayPalButton amount={order.totalPrice}
                                                onSuccess={successPaymentHandlder}
                                            ></PayPalButton>
                                        )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen