import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {
    Button,
    Card,
    Container, Form,
} from "react-bootstrap";


function AdminPanel() {
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [image, setImage] = useState();

    const changeCategory = (event) => {
        const data = event.target.value
        setCategory(data);
    }

    const changeSubCategory = (event) => {
        const data = event.target.value
        setSubCategory(data);
    }

    const changeGender = (event) => {
        const data = event.target.value
        setGender(data);
    }

    const changeName = (event) => {
        const data = event.target.value
        setName(data)
    }

    const changePrice = (event) => {
        const data = event.target.value
        setPrice(data)
    }

    const changeImage = (e) => {
        // // const dataImage = URL.createObjectURL(image)
        setImage(e.target.files[0])
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const dataImage = new FormData();
        dataImage.append('images', image);

        const data = {
            'category': category,
            'sub_category': subCategory,
            'gender': gender,
            'product_name': name,
            'price': price,
            'product_image': dataImage
        }

        console.log(data);
        axios.post('http://localhost:8000/api/upload-clothes', dataImage).then(response => {
            console.log(response)
            if (response.success === false) {
                swal({
                    title: "Done!",
                    text: "Product was successfully added.",
                    icon: "success",
                })
                setTimeout(() => {
                    setCategory("");
                    setSubCategory("");
                    setName("");
                    setPrice("");
                    setImage("");
                }, 2000);
            } else {
                swal({
                    title: "Error!",
                    icon: "error",
                    dangerMode: true,
                })
            }
        })
    }
    return (
        <>
            <Container fluid>
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">
                            Products clothes
                        </Card.Title>
                    </Card.Header>
                    <Form className="input-custom" onSubmit={handleSubmit}>
                        <Form.Group className="pb-3">
                            <Form.Label>
                                Select Gender
                            </Form.Label>
                            <Form.Control as="select" onChange={changeGender}>
                                <option defaultValue disabled selected>Pick Clothes for Gender</option>
                                <option value="men">Men</option>
                                <option value="Women">Women</option>
                                <option value="kids">Kids</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pb-3">
                            <Form.Label>
                                Select Category
                            </Form.Label>
                            <Form.Control as="select" onChange={changeCategory}>
                                <option defaultValue disabled selected>Pick category of clothes</option>
                                <option value="top">Tops</option>
                                <option value="bottom">Bottoms</option>
                                <option value="accessories">Accessories</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pb-3">
                            <Form.Label>
                                Select Sub Category
                            </Form.Label>
                            <Form.Control as="select" onChange={changeSubCategory}>
                                <option defaultValue disabled selected>Pick sub category of clothes</option>
                                <option value="tshirt">T-Shirts</option>
                                <option value="jersey">Jerseys</option>
                                <option value="jacket">Jackets</option>
                                <option value="sweater">Sweaters</option>
                                <option value="hoodie">Hoodies</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pb-3">
                            <Form.Label>
                                Product Name
                            </Form.Label>
                            <Form.Control value={name} onChange={changeName}/>
                        </Form.Group>
                        <Form.File className="pb-3">
                            <Form.File.Label>
                                Pick display products
                            </Form.File.Label><br/>
                            <Form.File.Input onChange={changeImage}/>
                        </Form.File>
                        <Form.Group className="pb-3">
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Form.Control value={price} type="number" onChange={changePrice}/>
                        </Form.Group>
                        <Button variant="primary"
                                type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default AdminPanel;
