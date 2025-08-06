"use client" 
import { Flex, Text } from "@chakra-ui/react";
import { toaster } from '../ui/toaster';
import useCustomTheme from '@/hooks/useTheme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateFormat, timeFormat } from '@/helpers/utils/dateFormat';
import { CalendarIcon } from '@/svg';

interface IProps {
    name: Array<string>;
    value: string;
    start?: string
    end?: string;
    setValue: (name: string, value: any) => void,
    errors?: any,
    touched?: any,
    label?: string,
    index?: number
}

export default function CustomDatePicker(
    {
        value,
        name,
        label,
        start,
        touched,
        errors,
        end,
        setValue,
        index = 0
    }: IProps) {

    const {
        headerTextColor
    } = useCustomTheme()

    const changeHandler = (item: any) => {
        if (start) {
            if (new Date(item) < new Date(start)) {
                toaster.create({
                    title: "Please enter a valid end date",
                    type: "error",
                    closable: true
                })

                setValue(name[0], null)
                setValue(name[1], null)
            } else if (end) {
                if (new Date(item) > new Date(end)) {
                    toaster.create({
                        title: "Please ticket date can not be greater than event endDate",
                        type: "error",
                        closable: true
                    })
                } else {
                    setValue(name[0], Date.parse(new Date(item).toJSON()))
                    setValue(name[1], Date.parse(new Date(item).toJSON()))
                }
            } else {
                setValue(name[0], Date.parse(new Date(item).toJSON()))
                setValue(name[1], Date.parse(new Date(item).toJSON()))
            }
        } if (end) {
            if (new Date(item) > new Date(end)) {
                toaster.create({
                    title: "Please ticket date can not be greater than event endDate",
                    type: "error",
                    closable: true
                })
            } else {
                setValue(name[0], Date.parse(new Date(item).toJSON()))
                setValue(name[1], Date.parse(new Date(item).toJSON()))
            }
        } else {
            if (name[0] === "startDate") {
                setValue(name[0], Date.parse(new Date(item).toJSON()))
                setValue(name[1], Date.parse(new Date(item).toJSON()))
                setValue(name[2], null)
                setValue(name[3], null)
            } else {
                console.log("here");

                name.map((itemname) => {
                    setValue(itemname, Date.parse(new Date(item).toJSON()))
                })
            }
        }
    }

    console.log(value);
    

    const CustomInput = ({ value: item, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"full"} fontSize={"12px"} h={"50px"}  >
                <CalendarIcon />
                {value ? dateFormat(value) : "Click to select a date"}
                {" "}
                {value ? timeFormat(value) : ""}
            </Flex>
        )
    }

    return (
        <Flex pos={"relative"} zIndex={"50"} w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} >{label?.replace("*", "")}<span style={{ color: "red", fontSize: "16px" }} >{label?.includes("*") ? "*" : ""}</span></Text>
            <Flex flexDir={"column"} color={headerTextColor} gap={"1"} rounded={"full"} >
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        minDate={start ? dayjs(start) : dayjs()}
                        defaultValue={dayjs(value)}
                        format="MM/DD/YYYY hh:mm a"
                        closeOnSelect={false}
                        onChange={(item) => changeHandler(item)}
                        slotProps={{
                            openPickerIcon: { fontSize: "small" },
                            textField: {
                                focused: false,
                                style: { color: "white", backgroundColor: "white", borderRadius: "999px" }
                            },
                        
                            popper: { 
                                disablePortal: true
                            }
                        }}
                    />
                </LocalizationProvider> */}

                <DatePicker 
                placeholderText="Click to select a date"
                    selected={value ? new Date(value) : new Date()}
                    showTimeSelect
                    minDate={start ? new Date(start) : new Date()}
                    onChange={changeHandler}
                    customInput={<CustomInput />}
                />
                {touched && (
                    <>
                        {(touched[name[0]] && errors[name[0]]) &&
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[name[0]]}</Text>
                            </Flex>
                        }
                    </>
                )}
                {errors && (
                    <>
                        {errors[index]?.endDate && (
                            <Flex>
                                <Text fontSize={"12px"} color={"red.600"} fontWeight={"medium"} ml={"2"} >{errors[index]?.endDate}</Text>
                            </Flex>
                        )}
                    </>
                )}
            </Flex>
        </Flex>
    )
}

