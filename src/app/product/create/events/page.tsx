import { Theme } from "@/components/createEventComponents";
import { Flex } from "@chakra-ui/react";

export default function CreateEvent () {
 
    return(
        <Flex w={"full"} justifyContent={"center"} py={"8"} >
            <Flex maxW={"569px"} w={"full"} > 
                <Theme />
            </Flex>
        </Flex>
    )
}