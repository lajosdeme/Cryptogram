import { Component } from 'react'
import { Header } from 'semantic-ui-react'

export default class HeaderView extends Component {
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <Header as="h1">Cryptogram</Header>
                <p>Create NFT-s from your Instagram posts which you can truly own or trade.</p>
            </div>
        )
    }
}