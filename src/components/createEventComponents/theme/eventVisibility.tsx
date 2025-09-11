import { Flex } from "@chakra-ui/react"
import CustomSelect from "../../shared/customSelect"


export default function EventVisibility(
    
) {

    const data = [
        {
            label: "public",
            value: "true"
        }, 
        {
            label: "private",
            value: "false"
        }, 
    ] 

    return (
        <Flex w={"full"} >
            <CustomSelect name="isPublic" label="Event Visibility" size="md" data={data} placeholder={""} />
        </Flex>
    )
}