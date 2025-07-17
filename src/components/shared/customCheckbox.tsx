import { Checkbox } from "@chakra-ui/react"

const CustomCheckbox = ({ label, checked, onChange } : { label?: string, checked: boolean, onChange?: any }) => {
    return (
        <Checkbox.Root checked={checked} onChange={(item)=> onChange(item?.target)}  >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            {label && (
                <Checkbox.Label>{label}</Checkbox.Label>
            )}
        </Checkbox.Root>
    )
}

export default CustomCheckbox