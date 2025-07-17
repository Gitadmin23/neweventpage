import useCustomTheme from "@/hooks/useTheme";
import { Flex } from "@chakra-ui/react";


export default function CustomSwitch ({
    
}) {

    const { secondaryBackgroundColor } = useCustomTheme()

    return(
        <Flex h={"45px"} rounded={"32px"} bgColor={secondaryBackgroundColor} px={"3"} justifyContent={"space-between"} alignItems={"center"}  >
            
        </Flex>
    )
}