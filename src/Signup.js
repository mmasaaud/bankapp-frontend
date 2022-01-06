import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Login.css";
import { render } from "@testing-library/react";
import {useNavigate} from "react-router-dom"
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Signup() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [signUpsuccessful, setSignUpsuccessful] = useState(false)

    const url = process.env.REACT_APP_API_URL

    function validateForm(){
        return userName.length > 0 && password.length > 0;
    }

    function handleSubmit(event){
        const username = event.target.username.value;
        const pass = event.target.password.value;
        const Email = event.target.email.value;
        const Name = event.target.name.value;

        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: username, password: pass, email: Email, name: Name})
        }

        fetch(`${url}/signup`, requestOption)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (response.status != 201){
                const error = response.status
                return Promise.reject(error)
            }
            if (response.status == 201){
                setSignUpsuccessful(true)
                setUserName("");
                setEmail("")
                setPassword("")
                setName("")
            }
            
        })
        .catch(error => {
            setError(error)
            setSignUpsuccessful(false)
        })
        event.preventDefault();
    }
    {
        let message;

        if (signUpsuccessful){
            message = <Alert variant="success">Sign up successfull</Alert>
        }
        if (error == 400){
            message = <Alert variant="danger">Username already taken</Alert>
        }
    
    return(
        <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        autoFocus
                        type="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                        </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    
                <ButtonGroup className="me-5">
                    <Button className="mb-3" variant="primary" type="submit" disabled={!validateForm()}>
                        Sign up
                    </Button>
                </ButtonGroup>
                <Link to="/">
                    <ButtonGroup>
                        <Button className="mb-3" variant="primary">
                            Login
                        </Button>
                    </ButtonGroup>
                </Link>
                {message}
                </Form>
                
            </div>
    )
    }
}

export default Signup;