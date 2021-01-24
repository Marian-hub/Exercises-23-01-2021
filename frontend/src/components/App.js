import { Component } from 'react';
import axios from 'axios'
import { Input, Button, InputGroupText, InputGroup, InputGroupAddon } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
        }
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        if (typeof username !== "undefined" && typeof password !== "undefined") {
            axios.post("http://localhost:4000/login", this.state)
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    return error
                })
        } else {
            alert("Either Username or Password are not specified ")
        }
    }
    render() {
        const { username, password } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>username</InputGroupText>
                    </InputGroupAddon>
                    <Input color="primary" type="text" name="username" value={username} onChange={this.handleChange}></Input>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Password</InputGroupText>
                    </InputGroupAddon>
                    <Input color="primary" type="password" name="password" value={password} onChange={this.handleChange}></Input>
                </InputGroup>
                <Button style={{ marginLeft: "50%" }} color="success" type="submit" value="submit" >SUBMIT</Button>
            </form>
        )
    }
}
export default App
