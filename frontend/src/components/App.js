import { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            cognome: '',
            codiceFiscale: '',
            dataNascita: ''
        }
    }
    handleSubmit = (e) => {
        const { nome, cognome, dataNascita, codiceFiscale } = this.state
        if (nome !== '' && cognome !== '' && dataNascita !== '' && codiceFiscale !== '') {
            axios.post("http://localhost:4000/login", this.state, (err) => {
                if (err) return err
            }).then(response => {
                console.log(response)
            })
        }
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({
            ...this.state,
            [e.traget.name]: value
        })
    }
    render() {
        const { nome, cognome, dataNascita, codiceFiscale } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="nome" placeholder="nome" value={nome} onChange={this.handleChange} />
                <input type="text" name="cognome" placeholder="cognome" value={cognome} onChange={this.handleChange} />
                <input type="text" name="codiceFiscale" placeholder="codiceFiscale" value={dataNascita} onChange={this.handleChange} />
                <input type="text" name="dataNascita" placeholder="dataNascita" value={codiceFiscale} onChange={this.handleChange} />
                <Button type="submit" color="success">Submit</Button>
            </form>
        )
    }
}
export default App