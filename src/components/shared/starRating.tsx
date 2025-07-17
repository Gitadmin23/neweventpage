"use client"
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function StarRating({ rate }: {rate: number}) {
    return (
        <Flex flexDir={"row"} gap={"1"} >
            {[1, 2, 3, 4, 5]?.map((itemNumb) => {
                return (
                    <Flex key={itemNumb} >
                        {(itemNumb > rate) ? (
                            <FaStar color="#D5D6DE" size={"15px"} />
                        ) : (
                            <FaStar color='#FBBD08' size={"15px"} />
                        )}
                    </Flex>
                )
            })}
        </Flex>
    )
}
