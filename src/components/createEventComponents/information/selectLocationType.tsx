import CustomSelect from "@/components/shared/customSelect";
import { Flex } from "@chakra-ui/react";

export default function SelectLocationType(
    {
        setValue, 
        value
    }: {
        value: string
        setValue: (name: string, value: any) => void,
        errors?: any,
        touched?: any,
    }
) {

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

    const changeHandler = (item: any) => {
        setValue("locationType", item)
    } 

    return (
        <Flex w={"full"} >
            <CustomSelect value={value+""} label="Location Type" size="lg" setValue={changeHandler} data={data} placeholder={"Select Location type"} />
        </Flex>
    )
}