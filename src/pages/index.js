//require('dotenv').config()
import {Component} from 'react'
import { Button, Container, Divider, Input, Image, Loader, Embed } from 'semantic-ui-react'
import Layout from '../components/Layout'
import abi from '../abi'
import Converter from '../services/conv'
import Web3 from "web3";

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            web3: null,
            web3socket: null,
            postId: "",
            cryptogram: null,
            ipfsHash: "",
            loading: false
        }
    }
    componentDidMount() {
        const contractAddress = process.env.CONTRACT_ADDR
console.log(process.env.INFURA_WEBSOCKET_URL)
        window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const web3socket = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_WEBSOCKET_URL))

        const cryptogram = new web3.eth.Contract(abi, contractAddress)
        const cryptogramSocket = new web3socket.eth.Contract(abi, contractAddress)
        this.setState({web3: web3, web3socket: web3socket, cryptogram: cryptogram})

        cryptogramSocket.events.NFTCreated().on("data", event => {
            this.setState({loading: false})
        })
    }

    inputChanged(e) {
        this.setState({postId: e.target.value})
    }

    tokenIdChanged(e) {
        this.setState({tokenId: e.target.value})
    }

    async createNFT(e) {
        const postId = this.state.postId
        const cryptogram = this.state.cryptogram
        const web3 = this.state.web3

        const accounts = await web3.eth.getAccounts()

        this.setState({loading: true})

        await cryptogram.methods.saveIgImgToIpfs(postId).send({
            from: accounts[0]
        }).then(result => {
            console.log(result)
        }).catch(err => {
            this.setState({loading: false})
            console.log(err)
        })
    }

    async showNFT(e) {
        const cryptogram = this.state.cryptogram

        const totalSupply = await cryptogram.methods.totalSupply().call()
        const multihash = await cryptogram.methods.getMultihashByTokenId(this.state.tokenId).call()
        console.log("supply: ", totalSupply)

        const ipfsHash = Converter.main.multihashToBase58(multihash)
        this.setState({ipfsHash: ipfsHash})
    }

    render() {
        return(
            <Layout>
                <Loader active={this.state.loading}/>
                <div style={{textAlign: "center"}}>
                    <Container style={{paddingTop: "50px"}}>
                        <Input onChange={this.inputChanged.bind(this)} placeholder="Paste in the post id..." />
                        <Button onClick={this.createNFT.bind(this)} color="google plus">Let's go!</Button>
                    </Container>
                    <Container style={{paddingTop: "50px"}}>
                        <Divider/>
                        <Button onClick={this.showNFT.bind(this)} basic color="red">Enter the token id to get your NFT.</Button>
                        <Input onChange={this.tokenIdChanged.bind(this)} placeholder="Token id..." />
                        <Embed autoplay={true} active={true} url={this.state != null && this.state.ipfsHash != undefined ? `http://127.0.0.1:8081/ipfs/${this.state.ipfsHash}` : ""}/>
                    </Container>
                </div>
            </Layout>
        )
    }
}