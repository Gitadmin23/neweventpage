
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Flex, Text } from "@chakra-ui/react"; 

interface IProps {
    name: Array<string>;
    value: string;
    start?: string
    setValue: (name: string, value: any) => void,
    errors?: any,
    touched?: any,
    label?: string
}

export default function CustomDatePicker(
    {
        value,
        name,
        label,
        start,
        touched,
        errors,
        setValue
    }: IProps) {

    const changeHandler = (item: any) => { 
        setValue(name[0], Date.parse(new Date(item).toJSON()))
        setValue(name[1], Date.parse(new Date(item).toJSON()))
    }
 
    return (
        <Flex w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} >{label}</Text>
            <Flex flexDir={"column"} gap={"1"} rounded={"full"} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        className=" text-primary "
                        minDate={name[0] === "startDate" ? dayjs() : dayjs(start)}
                        defaultValue={dayjs(value)}
                        format="MM/DD/YYYY hh:mm a"
                        onChange={(item) => changeHandler(item)}
                        slotProps={{ 
                            openPickerIcon: { fontSize: "small" },
                            textField: {
                                focused: false,
                            }
                        }}
                    />
                </LocalizationProvider>
                {touched && (
                    <>
                        {(touched[name[0]] && errors[name[0]]) &&
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[name[0]]}</Text>
                            </Flex>
                        }
                    </>
                )}
            </Flex>
        </Flex>
    )
}

