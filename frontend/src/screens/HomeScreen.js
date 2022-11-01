import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import products from '../products.js'
import Product from '../components/Product'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js'
const HomeScreen = () => {


    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())

        // const fetchProducts = async () => {
        //     const { data } = await axios.get("api/products")
        //     setProducts(data);

        // }
        // fetchProducts();


    }, [dispatch]);


    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}

                </Row>
            }

        </>
    )
}

export default HomeScreen;