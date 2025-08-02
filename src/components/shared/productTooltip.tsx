import { Flex, Text } from "@chakra-ui/react";
import { IoIosClose } from "react-icons/io";
import CustomButton from "./customButton";

export default function ProductTooltip(
    {
        setIsOpen,
        details,
        title
    }: {
        setIsOpen: (isOpen: boolean) => void;
        title: string,
        details: string
    }
) {
    return (
        <Flex flexDir={"column"} maxW={"500px"} position={"relative"} zIndex={"60"} w={"full"} bgColor={"white"} p={"2"} py={"4"} rounded={"md"} color={"black"} gap={"3"}  >
            {/* <Flex justifyContent={"end"} w={"full"} zIndex={"70"} cursor={"pointer"} onClick={() => setIsOpen(false)} >
                <IoIosClose size={"25px"} />
            </Flex> */}
            <Flex flexDir={"column"} gap={"2"} >
                <Text fontSize={"16px"} fontWeight={"600"} >{title}</Text> 
                <Text fontSize={"14px"} color={"grey"} >
                    {details}
                </Text> 
            </Flex>
            {/* <Flex flexDir={"column"} pt={"3"} pb={"2"} w={"full"} borderTopWidth={"1px"} >
                <CustomButton cursor={"pointer"} text={"Got it"} width={"fit-content"} ml={"auto"} fontSize={"12px"} borderRadius={"full"} paddingX={"7"} height={"38px"} />
            </Flex> */}
        </Flex>
    )
}