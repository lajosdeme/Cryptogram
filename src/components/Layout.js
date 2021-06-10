import React from 'react'
import HeaderView from './HeaderView'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Footer from './Footer'

const Layout = (props) => {
    return(
        <Container>
            <HeaderView />
                {props.children}
            <Footer/>
        </Container>
    )
}
export default Layout