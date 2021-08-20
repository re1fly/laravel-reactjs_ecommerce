import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

function Products() {

    return (
        <>
            <Container fluid>
                <Card className="text-white card-home">
                    <Card.Img
                        className="card-product-home"
                        src="https://images.unsplash.com/photo-1475293831741-1b69e67acb72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
                        alt="Card image"/>
                    <Card.Img
                        className="card-product-home"
                        src="https://images.unsplash.com/photo-1515363435484-5d26011ad7b5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=david-gavi-HPVRnFeplbQ-unsplash.jpg"
                        alt="Card image"/>
                    <Card.ImgOverlay>
                        <Card.Title className="text-white"><h3>Look at the man with nice drips !</h3></Card.Title>
                        <Card.Text>
                            <NavLink className="text-white" to="/admin/men-products">
                                See All Men Product
                                <i className="fas fa-arrow-right mr-1"></i>
                            </NavLink>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
                <Card className="text-white card-home">
                    <Card.Img
                        className="card-product-home"
                        src="https://images.unsplash.com/photo-1490225421893-2908ffad8593?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
                        alt="Card image"/>
                    <Card.Img
                        className="card-product-home"
                        src="https://images.unsplash.com/photo-1617372591452-9adad3e8070e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=jose-mizrahi-OBbrmyAh-KI-unsplash.jpg"
                        alt="Card image"/>
                    <Card.ImgOverlay>
                        <Card.Title className="text-white"><h3>I think u need SportZ </h3></Card.Title>
                        <Card.Text>
                            <NavLink className="text-white" to="/admin/women-products">
                                See All Women Product
                                <i className="fas fa-arrow-right mr-1"></i>
                            </NavLink>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
                <Card className="text-white card-home">
                    <Card.Img
                        className="card-product-home"
                        src="https://images.unsplash.com/photo-1490326149782-dd42fa59bd9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGtpZHMlMjBzcG9ydHN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Card image"/>
                    <Card.Img
                        className="card-product-home"
                        src="https://images.unsplash.com/photo-1601992991989-3b710b759094?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        alt="Card image"/>
                    <Card.ImgOverlay>
                        <Card.Title className="text-white"><h3>Kids need us for being super cool !</h3></Card.Title>
                        <Card.Text>
                            <NavLink className="text-white" to="/admin/kid-products">
                                See All Kids Product
                                <i className="fas fa-arrow-right mr-1"></i>
                            </NavLink>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </Container>
        </>
    )
}

export default Products;
