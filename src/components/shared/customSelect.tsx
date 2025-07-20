"use client"
import useCustomTheme from "@/hooks/useTheme";
import { createListCollection, Flex, Portal, Select, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

interface IProps {
    variant?: "outline" | "subtle";
    size?: "xs" | "sm" | "md" | "lg",
    label?: string;
    value: string;
    name?: string;
    data?: Array<{
        value?: string;
        label?: string;
    }>;
    placeholder: string;
    errors?: any,
    touched?: any,
    setValue: (item: string) => void
}

export default function CustomSelect(
    {
        variant,
        size,
        label,
        data,
        placeholder,
        value,
        name,
        errors,
        touched,
        setValue
    }: IProps) {

    const collection = useMemo(() => {
        return createListCollection({
            items: data ?? []
        })
    }, [data])

    const [valueData, setValueData] = useState<string[]>([])

    const {
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()



    const changeHandler = (item: any) => {
        setValue(item?.value[0])
        setValueData(item?.value)
    }

    useEffect(() => {
        setValueData([value])
    }, [])


    return (
        <Flex w={"full"} flexDir={"column"} gap={"0.5"} > 
            <Select.Root w={"full"} value={valueData} collection={collection} variant={variant ?? "outline"} size={size ?? "md"} bgColor={mainBackgroundColor} onValueChange={(value) => changeHandler(value)} >
                <Select.HiddenSelect />
                {label && (
                    <Select.Label fontSize={"14px"} >{label}</Select.Label>
                )}
                <Select.Control >
                    <Select.Trigger px={"3"} rounded={"full"}  >
                        <Select.ValueText fontSize={"14px"} placeholder={placeholder} />
                    </Select.Trigger>
                    <Select.IndicatorGroup mr={3}>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {collection.items.map((framework) => (
                                <Select.Item fontSize={"14px"} color={headerTextColor} px={"3"} py={"1"} item={framework} key={framework.value}>
                                    {framework.label}
                                    {/* <Select.ItemIndicator /> */}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root> 
            {touched && (
                    <>
                        {(touched[name+""] && errors[name+""]) &&
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[name+""]}</Text>
                            </Flex>
                        }
                    </>
                )}
        </Flex>
    )

}