import React, {useEffect, useState} from 'react';
import {
    Card,
    Container,
} from "react-bootstrap";
import TableProduct from "./TableProduct";
import CreateProduct from "./CreateProduct";


function AdminPanel() {

    return (
        <>
            <Container className="text-white" fluid>
                <h2 className="text-black">Control Product</h2>
                <Card className="text-white">
                    <TableProduct/>
                </Card>
            </Container>
        </>
    );
}

export default AdminPanel;
