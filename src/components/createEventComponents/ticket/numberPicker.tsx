
"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Flex, HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function NumberPicker(
    {
        setValue,
        value,
        name
    }: {
        value: any
        setValue: (name: string, value: any) => void,
        errors?: any,
        touched?: any,
        name: string
    }
) {

    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
        headerTextColor
    } = useCustomTheme()

    const [ number, setNumber ] = useState(1)

    const changeHandlerAdd = () => {
        setNumber(number+1)
        setValue(name, number+1)
    }

    const changeHandlerRomove = () => {
        setNumber(number-1)
        setValue(name, number-1)
    }

    console.log(value);

    useEffect(() => {
        if(value) {
            setNumber(value)
        }
    }, [])
    

    return (
        <Flex bgColor={secondaryBackgroundColor} w={"full"} py={"2"} rounded={"full"} justifyContent={"center"} gap={"3"} alignItems={"center"} >
            <IconButton onClick={()=> changeHandlerRomove()} bgColor={mainBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                <LuMinus />
            </IconButton>
            {number}
            <IconButton onClick={()=> changeHandlerAdd()} bgColor={mainBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                <LuPlus />
            </IconButton>  
        </Flex>
    )
}