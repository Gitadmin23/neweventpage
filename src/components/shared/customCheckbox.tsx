import { Checkbox } from "@chakra-ui/react"

const CustomCheckbox = ({ label, checked } : { label?: string, checked: boolean }) => {
    return (
        <Checkbox.Root checked={checked} onChange={(item)=> console.log(item?.target)}  >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            {label && (
                <Checkbox.Label>{label}</Checkbox.Label>
            )}
        </Checkbox.Root>
    )
}

export default CustomCheckbox