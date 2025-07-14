"use client"
import { Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { useField } from 'formik';

interface IProps {
    name: string;
    height?: string;
    placeholder?: string;
    value?: any;
    label?: string;
    type?: React.HTMLInputTypeAttribute,
    hasFrontIcon?: boolean;
    hasBackIcon?: boolean,
    icon?: React.ReactNode,
    iconback?: React.ReactNode
    setValue: (name: string, value: string) => void,
    errors?: any,
    touched?: any
}

export default function FormInput(
    {
        name,
        height,
        placeholder,
        value,
        label,
        type,
        hasFrontIcon,
        hasBackIcon,
        icon,
        iconback,
        setValue,
        errors,
        touched
    }: IProps) {

    const changeHandler = (item: string) => {
        setValue(name, item)
    }

    const [newValue, setNewValue] = useState("")

    useEffect(() => {
        setNewValue(value[name] ?? "")
    }, [value[name]])


    return (
        <Flex w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} ml={"2"} >{label}</Text>
            <Flex flexDir={"column"} gap={"1"} >
                <Flex pos={"relative"} h={height ?? "45px"} >
                    {hasFrontIcon && (
                        <Flex w={"48px"} h={height ?? "45px"} justifyContent={"center"} alignItems={"center"} px={"2"} >
                            {icon}
                        </Flex>
                    )}
                    {hasBackIcon && (
                        <Flex w={"48px"} h={height ?? "45px"} justifyContent={"center"} alignItems={"center"} px={"2"} >
                            {iconback}
                        </Flex>
                    )}

                    <Input
                        type={type ?? "text"}
                        value={newValue}
                        onChange={(e) => changeHandler(e.target.value)}
                        w={"full"}
                        h={height ?? "45px"}
                        px={"4"}
                        outline={"none"}
                        bgColor={"white"}
                        borderRadius={"9999px"}
                        border={"1px solid #EAEBED"}
                        _placeholder={{ color: "gray.500" }}
                        placeholder={placeholder}
                    />
                </Flex>
                {touched && (
                    <>
                        {(touched[name] && errors[name]) &&
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[name]}</Text>
                            </Flex>
                        }
                    </>
                )}
                {/* {errors[name] && <p className=' text-sm text-error600 font-OpenRunde-Medium ' >{errors[name]?.message as string}</p>} */}
            </Flex>
        </Flex>
    )
}
