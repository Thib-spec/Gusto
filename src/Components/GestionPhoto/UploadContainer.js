import React from 'react'
import styled from 'styled-components'
import Uploader from './Uploader'

const Container = styled.div`
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin: 0 auto;
`

const UploadContainer = () => {
    return (
        <Container>
            <Uploader />
        </Container>
    )
}

export default UploadContainer;