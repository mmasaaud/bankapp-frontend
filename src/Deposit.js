import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./Deposit.css"
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useState } from "react";

function Deposit() {
    const [accountNumber, setAccountNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")
    const [depositFlag, setDepositFlag] = useState(false)

    function handleDeposit(event){
        // const accountNumber = event.target.accountNumber.value;
        // const amount = event.target.amount.value;
        console.log(accountNumber, amount)
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: amount})
        }
        fetch(`http://127.0.0.1:8080/deposit/${accountNumber}`, requestOption)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if(!response.ok){
                const error = response.status
                return Promise.reject(error)
            }

            setAccountNumber("");
            setAmount("")
            setDepositFlag(true)

        }).catch(error => {
            setError(error)
            setAccountNumber("")
            setAmount("")
            setDepositFlag(false)
        })
    event.preventDefault();
    }
    let error_message;
    if (error){
        error_message = <Alert variant="danger">Deposit Unsuccessful</Alert>
    }
    if (depositFlag){
        error_message = <Alert variant="success">Deposit successful</Alert>
    }
    return(
        <div className="Deposit">
            <Form onSubmit={handleDeposit}>
                <Form.Group as={Row} className="mb-3" controlId="accountNumber">
                    <Form.Label column sm="2">
                        Account Number
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                        type="number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="amount">
                    <Form.Label column sm="2">
                        Amount
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}>
                        </Form.Control>
                    </Col>
                </Form.Group>
                
                <ButtonGroup>
                    <Button className="mb-3 buton" variant="primary" type="submit">
                    Deposit
                    </Button>
                </ButtonGroup>
                {error_message}
            </Form>
        </div>
      
    )
}

export default Deposit;