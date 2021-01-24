import { Component } from 'react'
import axios from 'axios'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: undefined,
            pathToImage: undefined
        }
    }
    handleFileChange = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    handleSubmit = () => {
        const { selectedFile, pathToImage } = this.state
        axios.post("http://localhost:4000/uploadImage", {
            "file": selectedFile
        }).then(response => {
            console.log(response)
            this.setState({
                pathToImage: response.data.path
            })
        }).catch(err => {
            if (err) { return err }
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileChange}>Choose Image</input>
                    <input type="submit" >Upload Image</input>
                </form>
                <img src={this.state.pathToImage}></img>
            </div>
        )
    }
}