
"use client"
import useCustomTheme from "@/hooks/useTheme";
import { Flex, HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function NumberPicker(
    {
        setValue,
        value,
        name
    }: {
        value: string
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

    const changeHandler = (item: any) => { 
        setValue(name, item)
    }

    return (
        <Flex bgColor={secondaryBackgroundColor} w={"full"} py={"2"} rounded={"full"} justifyContent={"center"} alignItems={"center"} > 
            <NumberInput.Root
                value={value}
                onValueChange={({ value }) => {
                    changeHandler(value)
                }} unstyled spinOnPress={false}>
                <HStack gap="2">
                    <NumberInput.DecrementTrigger asChild>
                        <IconButton bgColor={mainBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                            <LuMinus />
                        </IconButton>
                    </NumberInput.DecrementTrigger>
                    <NumberInput.ValueText onChange={(e) => changeHandler(e)} textAlign="center" fontSize="lg" minW="3ch" />
                    <NumberInput.IncrementTrigger asChild>
                        <IconButton bgColor={mainBackgroundColor} color={headerTextColor} rounded={"full"} size="sm">
                            <LuPlus />
                        </IconButton>
                    </NumberInput.IncrementTrigger>
                </HStack>
            </NumberInput.Root>
        </Flex>
    )
}