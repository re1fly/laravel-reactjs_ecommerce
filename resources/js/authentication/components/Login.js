import react, {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

export default function Login(props) {
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: "",
        msg: "",
        isLoading: false,
        redirect: false,
        errMsgEmail: "",
        errMsgPwd: "",
        errMsg: ""
    })

    const handleChange = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
        setDataLogin(prevState => ({
            ...prevState,
            isLoading: true
        }))
        axios.post("http://localhost:8000/api/signin", {email: dataLogin.email, password: dataLogin.password})
            .then((response) => {
                console.log(response)
                setDataLogin(prevState => ({
                    ...prevState,
                    isLoading: false
                }))
                if (response.data.success === true) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userData", JSON.stringify(response.data.data))
                    setDataLogin(prevState => ({
                        ...prevState,
                        msg: response.data.message,
                        redirect: true
                    }))
                }
                if (response.data.success === undefined) {
                    setDataLogin(prevState => ({
                        ...prevState,
                        errMsgEmail: response.data.validation_error.email,
                        errMsgPwd: response.data.validation_error.password,
                    }))
                    setTimeout(() => {
                        setDataLogin(prevState => ({
                            ...prevState,
                            errMsgEmail: "",
                            errMsgPwd: "",
                        }))
                    }, 200)
                } else if (response.data.success === false) {
                    setDataLogin(prevState => ({
                        ...prevState,
                        errMsg: response.data.message
                    }))
                    setTimeout(() => {
                        setDataLogin(prevState => ({
                            ...prevState,
                            errMsg: ""
                        }))
                    })
                }
            }).catch((error) => {
            alert(error);
        })
    }

    if (dataLogin.redirect) {
        return <Redirect to="/welcome"/>
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
        return <Redirect to="/welcome"/>
    }

    return (
        <div>
            <Form className="containers">
                <FormGroup>
                    <Label for="email">Email id</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={dataLogin.email}
                        onChange={handleChange}
                    />
                    <span className="text-danger">{dataLogin.msg}</span>
                    <span className="text-danger">{dataLogin.errMsgEmail}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={dataLogin.password}
                        onChange={handleChange}
                    />
                    <span className="text-danger">{dataLogin.errMsgPwd}</span>
                </FormGroup>
                <p className="text-danger">{dataLogin.errMsg}</p>
                <Button
                    className="text-center mb-4"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Sign In
                    {dataLogin.isLoading ? (
                        <span
                            className="spinner-border spinner-border-sm ml-5"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        <span/>
                    )}
                </Button>
            </Form>
        </div>
    )
}
