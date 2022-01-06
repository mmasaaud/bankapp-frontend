import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./Withdraw.css"
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useState } from "react";

function Withdraw(){
    const [accountNumber, setAccountNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")
    const [withdrawFlag, setWithdrawFlag] = useState(false)

    const url = process.env.REACT_APP_API_URL;

    function handleWithdraw(event){
        console.log(accountNumber, amount)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: amount})
        }
        fetch(`${url}/debit/${accountNumber}`, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (! response.ok){
                const error = response.status
                return Promise.reject(error)
            }
            console.log(response)
            setWithdrawFlag(true)
            setAccountNumber("")
            setAmount("")
        }).catch(error => {
            setError(error)
            setAccountNumber("")
            setAmount("")
            setWithdrawFlag(false)
        })
        event.preventDefault();
    }
    let error_message;
    if (error == 400) {
        error_message = <Alert variant="danger">Withdraw Unsuccessful, Insufficient funds</Alert>
    }

    if (withdrawFlag){
        error_message = <Alert variant="success">Withdraw successful</Alert>
    }

    return(
        <div className="Withdraw">
            <Form onSubmit={handleWithdraw}>
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
                    Withdraw
                    </Button>
                </ButtonGroup>
                {error_message}
            </Form>
        </div>
    )
}
export default Withdraw;
