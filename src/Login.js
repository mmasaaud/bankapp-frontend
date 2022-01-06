import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Login.css";
import {useNavigate} from "react-router-dom"
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false)
    const [error, setError] = useState("")
    const [userId, setUserId] = useState("")
    const nagivate = useNavigate()

    const url = process.env.REACT_APP_API_URL
    console.log(url)

    function validateForm(){
        return userName.length > 0 && password.length > 0;
    }

    // function handleOnSignup(event){
    //     nagivate("/signup")
    // }

    function handleSubmit(event){
        
        const username = event.target.username.value;
        const pass = event.target.password.value

        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: username, password: pass})
        }
        console.log(url)
        fetch(`${url}/login`, requestOption)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                const error = response.status
                return Promise.reject(error)
            }
            setUserId(data.id)
            setIsLogged(true)
            
        }).catch(error => {
            setError(error)
            setIsLogged(false)
            setUserName("")
            setPassword("")
        })
        event.preventDefault();
    }

    // render(); 
    {
        if (isLogged){
            nagivate(`/accounts/${userId}`)
            // return(
            //     <Accounts id={userId}></Accounts>
            // )
        }
        let error_message;
        if (error == 404){
            error_message = <Alert variant="danger">User not found</Alert>
        }
        if (error == 401){
            error_message = <Alert variant="danger">Wrong password</Alert>
        }
        return (
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
                <ButtonGroup className="me-5">
                    <Button className="mb-3" variant="primary" type="submit" disabled={!validateForm()}>
                    Login
                    </Button>
                </ButtonGroup>
                <Link to="/signup">
                    <ButtonGroup>
                        <Button className="mb-3" variant="primary">
                            Sign up
                        </Button>
                    </ButtonGroup>
                </Link>
                
                {error_message}
                </Form>
                {/* <Signup></Signup> */}
            </div>
            
        );

    }

    
}
export default Login;