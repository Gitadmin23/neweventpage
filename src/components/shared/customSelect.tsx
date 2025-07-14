import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useMemo } from "react";

interface IProps {
    variant?: "outline" | "subtle";
    size?: "xs" | "sm" | "md" | "lg"
    data?: Array<{
        value?: string;
        label?: string;
    }>;
    placeholder: string;
    setValue?: any
}

export default function CustomSelect(
    {
        variant,
        size,
        data,
        placeholder,
        setValue
    }: IProps) { 

    const collection = useMemo(() => {
        return createListCollection({
            items: data ?? []
        })
    }, [data])

    return (

        <Select.Root collection={collection} variant={variant ?? "subtle"} size={size ?? "md"} onValueChange={(value) => setValue(value?.value+"")} >
            <Select.HiddenSelect />
            <Select.Label>size = {size}</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {collection.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                                {framework.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )

}