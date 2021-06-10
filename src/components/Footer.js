
import React from 'react'
import {Container, Header} from 'semantic-ui-react'
import styles from './Footer.module.css'

const Footer = () => {
    return(
        <div className={styles.footer}>
            <Container>
                <Header as="h5" textAlign="center">Cryptogram {new Date().getFullYear()}© </Header>
            </Container>
        </div>
    )
}

export default Footer