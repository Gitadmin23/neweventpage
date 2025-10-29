

import { Switch } from "@chakra-ui/react"

const CustomSwitch = ({ checked, setChecked, label }: { checked?: boolean, setChecked: any, label?: string }) => {
    return (
        <Switch.Root checked={checked} onCheckedChange={({ checked }) => setChecked(checked)} >
            <Switch.HiddenInput />
            <Switch.Control
                _checked={{
                    bg: "green.500", // ✅ Active color
                }}
            />
            {label && (
                <Switch.Label>{label}</Switch.Label>
            )}
        </Switch.Root>
    )
}

export default CustomSwitch