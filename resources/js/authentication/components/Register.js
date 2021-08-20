import React, {useState} from "react";
import axios from "axios";
import "../assets/css/main.css";
import {Link} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

export default function Register(props) {
    const [registerData, setRegisterData] = useState(
        {
            name: "",
            email: "",
            phone: "",
            password: "",
            isLoading: "",
        }
    );
    const [message, setMessage] = useState("")

    const handleOnChange = (e, key) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setRegisterData(prevState => ({
            ...prevState,
            isLoading: true
        }))
        axios.post("http://localhost:8000/api/signup", registerData).then(response => {
            setRegisterData(prevState => ({
                ...prevState,
                name: "",
                email: "",
                phone: "",
                password: "",
                isLoading: false
            }))
            setMessage(response.data.message)

            setTimeout(() => {
                setMessage(response.data.message)
            }, 2000)

            if (response.data.success === false) {
                setMessage(response.data.message)
                setTimeout(() => {
                    setMessage("")
                }, 2000)
            }
        });
    }
    return (
        <div>
            <Form className="containers shadow">
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="name"
                        name="name"
                        placeholder="Enter name"
                        value={registerData.name}
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email id</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={registerData.email}
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone Number</Label>
                    <Input
                        type="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={registerData.phone}
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={registerData.password}
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <p className="text-white">{message}</p>
                <Button
                    className="text-center mb-4"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Sign Up
                    {registerData.isLoading ? (
                        <span
                            className="spinner-border spinner-border-sm ml-5"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        <span/>
                    )}
                </Button>
                <br/>
                <Link to="/sign-in" className="text-white mt-4 ml-5">I'm already member</Link>
            </Form>
        </div>
    );
}
