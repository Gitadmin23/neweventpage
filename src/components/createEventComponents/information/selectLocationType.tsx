import CustomSelect from "@/components/shared/customSelect";
import { Flex } from "@chakra-ui/react";

export default function SelectLocationType() {

    const data = [
        {
            label: "Physical Location",
            value: "physical"
        }, 
        {
            label: "Online Location",
            value: "online"
        }, 
        {
            label: "Hybrid Location",
            value: "hybrid"
        }, 
    ] 

    return (
        <Flex w={"full"} >
            <CustomSelect name="locationType" label="Location Type" size="lg" data={data} placeholder={"Select Location type"} />
        </Flex>
    )
}