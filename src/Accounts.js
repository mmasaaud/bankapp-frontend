import { useState, useEffect , useMemo} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import "./Accounts.css"
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Accounts() {
    const [account, setAccount] = useState([{
    }])
    const { id } = useParams();

    const url = process.env.REACT_APP_API_URL

    // useEffect(() => {
    //         const requestOption = {
    //         method: 'GET',
    //         headers: {'Content-Type': 'application/json'}
    //     }
    //     async function getAccounts(){
    //         const res = await fetch(`http://127.0.0.1:8080/getAccountsByUser/${id}`, requestOption)
    //         const json = await res.json();
    //         setAccount(json)
    //         console.log(json)
    //     }
    //     getAccounts();
        
    // }, [])
    // const id = props.id

    useEffect(() => {
        getAccounts(id, url)
    },[]);

    function getAccounts(id, url_p){
        const requestOption = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        const url = `${url_p}/getAccountsByUser/${id}`
        fetch(url, requestOption)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            setAccount(data)
        })
    }
    function handleCreateAccount(event){
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }
        fetch(`${url}/addAccount/${id}`, requestOption)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            console.log(response)
            if (response.status == 201){
            getAccounts(id, url)
        }
        })        
    }



    function tableBody(){
        if (account.length == 0){
            return <p>No Account Found</p>
        }
        return(
            account.map((item) => {
                const code = item.code;
                const balance = item.balance
                const transaction = renderTranscation(item.operations)
                return(
                    <tr>
                        <td>{code}</td>
                        <td>{balance}</td>
                        <td>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Credit</th>
                                    <th>Debit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction}
                            </tbody>
                        </Table>
                        </td>
                    </tr>
                )
            })
        )
    }

    function renderTranscation(transaction){
        if (transaction == undefined){
            return
        }
        return(
            transaction.map((item) => {
                let deposit = null;
                let debit = null;
                if (item.typeOperation == "deposit"){
                    deposit = item.amount
                }
                if (item.typeOperation == "debit"){
                    debit = item.amount
                }
                return(
                    <tr>
                        <td>{deposit}</td>
                        <td>{debit}</td>
                    </tr>

                )
            })
        )
    }
    return (
        <div className="Account">
            <ButtonGroup className="me-5">
                    <Button className="mb-3" variant="primary" onClick={handleCreateAccount}>
                    Create Account
                    </Button>
                </ButtonGroup>
                <Link to="/deposit">
                <ButtonGroup className="me-5">
                        <Button className="mb-3" variant="primary">
                            Deposit
                        </Button>
                    </ButtonGroup>
                </Link>
                <Link to="/Withdraw">    
                    <ButtonGroup className="me-5">
                        <Button className="mb-3" variant="primary">
                            Withdraw
                        </Button>
                    </ButtonGroup>
                </Link>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th> Account number</th>
                    <th> Balance </th>
                    <th> Transactions</th>
                </tr>
            </thead>
            <tbody>
                {tableBody()}
            </tbody>

        </Table>
        </div>
        
    );
  }

  export default Accounts;