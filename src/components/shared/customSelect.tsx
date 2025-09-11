"use client";
import useCustomTheme from "@/hooks/useTheme";
import {
  createListCollection,
  Flex,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { getIn, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";

interface IProps {
  variant?: "outline" | "subtle";
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  name: string;
  data?: Array<{
    value?: string;
    label?: string;
  }>;
  placeholder?: string;
}

export default function CustomSelect({
  variant,
  size,
  label,
  data,
  placeholder,
  name,
}: IProps) {
  const collection = useMemo(() => {
    return createListCollection({
      items: data ?? [],
    });
  }, [data]);

  const [valueData, setValueData] = useState<any[]>([]);

  const { headerTextColor, mainBackgroundColor } = useCustomTheme();

  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  // Safely pull value, error, touched
  const value = getIn(values, name);
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const changeHandler = (val: string[]) => {

    // setValue("isPublic", item === "true" ? true : false)
    setFieldValue(name, val[0] === "true" ? true : val[0] === "false" ? false : val[0]); // save single value in Formik
    setValueData(val); // keep Select state synced
  };

  useEffect(() => {
    if (value) {
      setValueData([value+""]); // initialize with Formik value
    }
  }, [value]); 

  console.log(valueData);
  console.log(value);

  return (
    <Flex w="full" flexDir="column" gap="0.5">
      <Select.Root
        w="full"
        value={valueData}
        collection={collection}
        variant={variant ?? "outline"}
        size={size ?? "md"}
        bgColor={mainBackgroundColor}
        onValueChange={(details) => changeHandler(details.value)} // ✅ fix
      >
        <Select.HiddenSelect />
        {label && (
          <Select.Label fontSize="14px">
            {label?.replace("*", "")}
            <span style={{ color: "red", fontSize: "16px" }}>
              {label?.includes("*") ? "*" : ""}
            </span>
          </Select.Label>
        )}
        <Select.Control>
          <Select.Trigger px="3" rounded="full">
            <Select.ValueText fontSize="14px" placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup mr={3}>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((framework) => (
                <Select.Item
                  fontSize="14px"
                  color={headerTextColor}
                  px="3"
                  py="1"
                  item={framework}
                  key={framework.value}
                >
                  {framework.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      {isTouched && error && (
        <Flex>
          <Text fontSize="12px" color="red.600" fontWeight="medium" ml="2">
            {error}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
