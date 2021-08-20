import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {Button} from "reactstrap";

export default function Home() {
    const [navigate, setNavigate] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        setNavigate(true)
    }

    const user = JSON.parse(localStorage.getItem("userData"));
    if (navigate) {
        return <Redirect to="/" push={true}/>
    }

    return (
        <div className="container  border">
            <h3> HomePage</h3>
            <div className="row">
                <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
                    <h5> Welcome, {user.first_name} </h5> You have Logged in
                    successfully.
                </div>
                <div className="col-xl-3 col-sm-12 col-md-3">
                    <Button
                        className="btn btn-primary text-right"
                        onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
