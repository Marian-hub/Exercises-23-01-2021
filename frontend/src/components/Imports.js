import { Component } from 'react'
import axios from 'axios'
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
            console.log(reponse)
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
                    return err
                }
            })
    }
    componentDidMount = async () => {
        await this.getImporti()
    }
    renderImporti() {
        this.getImporti()
        const { importi } = this.state
        const statusImport = {

        }
        return importi.map((importo, index) => {
            if (importo.importo < 0) {
                return (
                    <div key={index} style={{
                        backgroundColor: 'red',
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <p>
                            {importo.data}
                        </p>
                        <p>
                            {importo.motivo}
                        </p>
                        <p>
                            {importo.importo}
                        </p>

                    </div>

                )
            } else {
                return (
                    <div key={index} style={{
                        backgroundColor: 'green',
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <p>
                            {importo.data}
                        </p>
                        <p>
                            {importo.motivo}
                        </p>
                        <p>
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
                    <input type="text" name="data" value={data} placeholder="data" onChange={this.handleChange} />
                    <input type="text" name="motivo" value={motivo} placeholder="motivo" onChange={this.handleChange} />
                    <input type="text" name="importo" value={importo} placeholder="importo" onChange={this.handleChange} />
                    <input type="submit" value="submit" />
                </form >
                {this.getTotale()}
                {this.renderImporti()}
            </div>
        )
    }
}

export default Imports