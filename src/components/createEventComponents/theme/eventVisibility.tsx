import { Flex } from "@chakra-ui/react"
import CustomSelect from "../../shared/customSelect"


export default function EventVisibility(
    {
        setValue,
        errors,
        touched,
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
            label: "public",
            value: "true"
        }, 
        {
            label: "private",
            value: "false"
        }, 
    ]

    const changeHandler = (item: any) => {
        setValue("isPublic", item === "true" ? true : false)
    } 

    return (
        <Flex w={"full"} >
            <CustomSelect value={value+""} label="Event Visibility" size="md" setValue={changeHandler} data={data} placeholder={""} />
        </Flex>
    )
}