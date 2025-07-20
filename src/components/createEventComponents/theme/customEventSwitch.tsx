"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Flex, Text } from "@chakra-ui/react";
import { CustomSwitch } from "../../shared"; 


export default function CustomEventSwitch(
    {
        name,
        label,
        value,
        title,
        setValue
    }: {
        name: string,
        value: any,
        label?: string,
        title?: string
        setValue: (name: string, value: string) => void,
        errors?: any,
        touched?: any,
    }
) {

    const { secondaryBackgroundColor } = useCustomTheme()

    console.log(value); 

    const clickHandler = (item: any) => {
        if(name === "affiliates[0].affiliateType") {
            
            if(value === true) {
                setValue(name, "")
                setValue("affiliates[0].percent", "")
            } else {
                setValue(name, "pr")
            }
        } else {
            setValue(name, item)
        }
    }

    return (
        <Flex flexDir={"column"} w={"full"} gap={"0.5"} >
            {label && (
                <Text fontSize={"14px"} fontWeight={"medium"} >{label}</Text>
            )}
            <Flex w={"full"} h={"45px"} rounded={"32px"} bgColor={secondaryBackgroundColor} px={"3"} justifyContent={"space-between"} alignItems={"center"}  >
                <Text fontSize={"14px"} >{title ?? "Show"}</Text>
                <CustomSwitch checked={value} setChecked={clickHandler} />
            </Flex>
        </Flex>
    )
}