import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function CopyRightText(props: Props) {
    const {} = props

    const date = new Date()     

    return (
        <>Chasescroll Llc ©️ {date.getFullYear()}. All rights reserved.</>
    )
}

export default CopyRightText
