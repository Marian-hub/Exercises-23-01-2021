import { Component } from 'react'
import axios from 'axios'
import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap'
class Imports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            importi: [],
            data: '',
            motivo: '',
            importo: ''
        }
        this.renderImporti.bind(this)
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state.guests,
            [e.target.name]: value
        })

    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { data, motivo, importo } = this.state
        axios.post("http://localhost:4000/nuovoImporto", {
            "data": data,
            "motivo": motivo,
            "importo": importo
        }).catch(err => {
            return err
        }).then(reponse => {
            this.getImporti()
            this.renderImporti()
        })
    }
    getImporti = async () => {
        await axios.get("http://localhost:4000/getImporti")
            .then(response => {
                console.log(response.data[0].data)
                this.setState({
                    importi: response.data
                })
            }).catch(err => {
                if (err) {
                    return err;
                }
            })
    }
    componentDidMount = async () => {
        await this.getImporti()
    }
    renderImporti() {
        const { importi } = this.state
        return importi.map((importo, index) => {
            if (importo.importo < 0) {
                return (
                    <div key={index} style={{
                        backgroundColor: 'red',
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "5%",
                        marginLeft: "5%"
                    }}>
                        <p style={{ marginLeft: "5%" }}>
                            {importo.data}
                        </p>
                        <p >
                            {importo.motivo}
                        </p>
                        <p style={{ marginRight: "5%" }}>
                            {importo.importo}
                        </p>

                    </div>

                )
            } else {
                return (
                    <div key={index} style={{
                        backgroundColor: 'green',
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: "5%",
                        marginRight: "5%"
                    }}>
                        <p style={{ marginLeft: "5%" }}>
                            {importo.data}
                        </p>
                        <p >
                            {importo.motivo}
                        </p>
                        <p style={{ marginRight: "5%" }}>
                            {importo.importo}
                        </p>

                    </div>

                )
            }

        })
    }
    getTotale() {
        const { importi } = this.state
        var totale = 0
        importi.map((importo, index) => {
            totale += parseInt(importo.importo)
        })
        if (totale <= 0) {
            return <div style={{ backgroundColor: "red", textAlign: "center" }}>TOTALE:{totale}</div>
        } else {
            return <div style={{ backgroundColor: "green", textAlign: "center" }}>TOTALE:{totale}</div>
        }

    }
    render() {
        const { data, motivo, importo } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input type="text" name="motivo" value={motivo} placeholder="motivo" onChange={this.handleChange} ></Input>
                        <Input type="text" name="data" value={data} placeholder="data" onChange={this.handleChange} ></Input>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input placeholder="Amount" type="number" name="importo" step="1" onChange={this.handleChange} />
                        <InputGroupAddon addonType="append">.00</InputGroupAddon>
                        <Button color="primary" type="submit" value="submit" style={{ margin: 0, marginRight: "50%" }} > + </Button>
                    </InputGroup>
                </form >
                <label style={{ marginLeft: "50%" }}>{this.getTotale()}</label>
                { this.renderImporti()}
            </div >
        )
    }
}

export default Imports