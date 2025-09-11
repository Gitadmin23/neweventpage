"use client"
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter';
import useCustomTheme from '@/hooks/useTheme';
import { Flex, Input, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useFormikContext, getIn } from 'formik';   


interface IProps {
    name: string;                 // 👈 full formik path (e.g. productTypeData[0].ticketType)
    height?: string;
    placeholder?: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    hasFrontIcon?: boolean;
    hasBackIcon?: boolean;
    icon?: React.ReactNode;
    iconback?: React.ReactNode;
    textarea?: boolean;
    disabled?: boolean;
    editor?: boolean
}

export default function TicketFormInput({
    name,
    height,
    placeholder,
    label,
    type,
    hasFrontIcon,
    hasBackIcon,
    icon,
    iconback,
    textarea,
    disabled
}: IProps) {
    const { mainBackgroundColor } = useCustomTheme();

    // 👇 Hook into Formik
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    // Safely pull value, error, touched
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const [localValue, setLocalValue] = useState<string>(""); 

    useEffect(() => {
        if (value !== undefined && value !== null) {
            setLocalValue(value);
        } else {
            setLocalValue("");
        }
    }, [value]);

    const changeHandler = (val: string) => {
        const Uppercased = type === "number" ? val : capitalizeFLetter(val);
        setLocalValue(Uppercased);
        setFieldValue(name, Uppercased);
    }; 

    return (
        <Flex w={"full"} flexDir={"column"} gap={"0.5"}>
            {label && (
                <Text fontSize={"14px"} fontWeight={"medium"}>
                    {label}
                </Text>
            )}

            <Flex flexDir={"column"} gap={"1"}>
                {(!textarea) && (
                    <Flex pos={"relative"} h={height ?? "45px"}>
                        {hasFrontIcon && (
                            <Flex
                                w={"48px"}
                                h={height ?? "45px"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                px={"2"}
                            >
                                {icon}
                            </Flex>
                        )}

                        {hasBackIcon && (
                            <Flex
                                w={"48px"}
                                h={height ?? "45px"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                px={"2"}
                            >
                                {iconback}
                            </Flex>
                        )}

                        {type === "number" ? (
                            <Input
                                value={localValue}
                                disabled={disabled}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*$/.test(val)) {
                                        changeHandler(val);
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
                                backgroundColor={mainBackgroundColor}
                                _placeholder={{ color: "gray.500" }}
                                placeholder={placeholder}
                            />
                        ) : (
                            <Input
                                type={type ?? "text"}
                                disabled={disabled}
                                value={localValue}
                                onChange={(e) => changeHandler(e.target.value)}
                                w={"full"}
                                h={height ?? "45px"}
                                px={"4"}
                                outline={"none"}
                                bgColor={"white"}
                                borderRadius={"9999px"}
                                border={"1px solid #EAEBED"}
                                backgroundColor={mainBackgroundColor}
                                _placeholder={{ color: "gray.500" }}
                                placeholder={placeholder}
                            />
                        )}
                    </Flex>
                )}

                {(textarea) && (
                    <Textarea
                        value={localValue}
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
                        backgroundColor={mainBackgroundColor}
                        _placeholder={{ color: "gray.500" }}
                        placeholder={placeholder}
                    />
                )}

                {isTouched && error && (
                    <Flex>
                        <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"}>
                            {error}
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}
