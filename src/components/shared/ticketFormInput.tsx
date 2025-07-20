"use client"
import { Flex, Input, Text, Textarea } from '@chakra-ui/react';
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
    defaultData?: any;
    iconback?: React.ReactNode
    setValue: (name: string, value: string) => void,
    errors?: any | null | undefined,
    touched?: any,
    textarea?: boolean,
    disabled?: boolean,
    index: number
}

export default function TicketFormInput(
    {
        name,
        height,
        placeholder,
        value,
        defaultData,
        label,
        type,
        hasFrontIcon,
        hasBackIcon,
        icon,
        iconback,
        setValue,
        errors,
        touched,
        textarea,
        disabled,
        index = 0
    }: IProps) {

    const changeHandler = (item: string) => {
        setValue(`productTypeData[${index}].${name}`, item)
        // setNewValue(item)
    }

    const [newValue, setNewValue] = useState("") 

    useEffect(() => {
        if (value[name]) {
            setNewValue(value[name] ?? "")
        } else {
            setNewValue(defaultData)
        }
    }, [defaultData, value[name]])

    return (
        <Flex w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} >{label}</Text>
            <Flex flexDir={"column"} gap={"1"} >
                {!textarea && (
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

                        {type === "number" && (
                            <Input
                                value={newValue}
                                disabled={disabled}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        changeHandler(e.target.value)
                                    }
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
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
                        )}

                        {type !== "number" && (
                            <Input
                                type={type ?? "text"}
                                disabled={disabled}
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

                        )}
                    </Flex>
                )}
                {textarea && (
                    <Textarea
                        value={newValue}
                        disabled={disabled}
                        onChange={(e) => changeHandler(e.target.value)}
                        w={"full"}
                        h={height ?? "123px"}
                        px={"4"}
                        py={"2"}
                        outline={"none"}
                        bgColor={"white"}
                        borderRadius={"3xl"}
                        border={"1px solid #EAEBED"}
                        _placeholder={{ color: "gray.500" }}
                        placeholder={placeholder}
                    />
                )}
                <>
                    {(errors) &&
                        <Flex>
                            {errors.length > index && (
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[index][name]}</Text>
                            )}
                        </Flex>
                    }
                </>
            </Flex>
        </Flex>
    )
}
