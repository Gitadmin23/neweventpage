"use client"
import { Flex, Text } from "@chakra-ui/react";
import { toaster } from '../ui/toaster';
import useCustomTheme from '@/hooks/useTheme';
import { CalendarIcon, ClockIcon, DateCalendar, MultiSectionDigitalClock, TimeClock } from '@mui/x-date-pickers';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ModalLayout from "./modalLayout";
import CustomButton from "./customButton";
import { dateFormat, dateFormatDashboad, dateTimeFormat, timeFormat } from "@/helpers/utils/dateFormat";

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
    const [open, setOpen] = useState(false)
    const [time, setTime] = useState(false)
    const [currentView, setCurrentView] = useState<"year" | "month" | "day">("year");
    const [tempDate, setTempDate] = useState<Dayjs | null>();

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
                    setTempDate(dayjs(item))
                }
            } else {
                setValue(name[0], Date.parse(new Date(item).toJSON()))
                setValue(name[1], Date.parse(new Date(item).toJSON()))
                setTempDate(dayjs(item))
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
                setTempDate(dayjs(item))
            }
        } else {
            if (name[0] === "startDate") {
                setValue(name[0], Date.parse(new Date(item).toJSON()))
                setValue(name[1], Date.parse(new Date(item).toJSON()))
                setValue(name[2], null)
                setValue(name[3], null)
                setTempDate(dayjs(item))
            } else {
                console.log("here");

                name.map((itemname) => {
                    setValue(itemname, Date.parse(new Date(item).toJSON()))
                    setTempDate(dayjs(item))
                })
            }
        }
    }

    useEffect(()=>{
        if(value) {
            setTempDate(dayjs(value))
        }  
    }, [])

    return (
        <Flex pos={"relative"} zIndex={"50"} w={"full"} flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} fontWeight={"medium"} >{label?.replace("*", "")}<span style={{ color: "red", fontSize: "16px" }} >{label?.includes("*") ? "*" : ""}</span></Text>
            <Flex flexDir={"column"} color={headerTextColor} gap={"1"} rounded={"full"} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ModalLayout open={open} width="fit" close={() => setOpen(false)} trigger >
                        <Flex flexDir={"column"} w={"full"} pb={"2"} >
                            <Flex w={"full"} >
                                <Flex borderBottomWidth={"1px"} >
                                    <DateCalendar
                                        minDate={start ? dayjs(start) : dayjs()}
                                        value={dayjs(tempDate)}
                                        onChange={(item) => changeHandler(item)} // ✅ optional: start with year view
                                        reduceAnimations                   // ✅ smoother on mobile
                                        slotProps={{
                                            switchViewButton: {
                                                // ✅ make sure header (year/month) is clickable
                                                sx: {
                                                    "& .MuiPickersCalendarHeader-switchViewButton": {
                                                        pointerEvents: "auto",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </Flex>
                                <Flex h={"full"} display={["none", "none", "flex"]}  >
                                    <MultiSectionDigitalClock
                                        value={dayjs(tempDate)}
                                        onChange={(item) => changeHandler(item)} // ✅ optional: start with year view
                                        sx={{
                                            height: 400, // ⬅️ increase total clock height
                                            "& .MuiMultiSectionDigitalClockSection-root": {
                                                maxHeight: 400, // ⬅️ let each scrollable column expand
                                            },
                                            "& .MuiMultiSectionDigitalClock-root": {
                                                height: 400,
                                            },
                                        }}
                                    />
                                </Flex>
                            </Flex>
                            <Flex w={"full"} justifyContent={"end"} pt={"2"} pr={"2"} >
                                <CustomButton onClick={() => setOpen(false)} fontSize={"xs"} px={"4"} height={"35px"} width={"fit-content"} borderRadius={"full"} text={"Done"} />
                            </Flex>
                        </Flex>
                    </ModalLayout>

                    <ModalLayout open={time} width="fit" close={() => setTime(false)} trigger >
                        <Flex flexDir={"column"} w={"full"} pb={"2"} >
                            <Flex w={"full"} > 
                                <Flex h={"full"} >
                                    <TimeClock
                                        value={dayjs(tempDate)}
                                        onChange={(item) => changeHandler(item)} // ✅ optional: start with year view 
                                        ampmInClock
                                    />
                                </Flex>
                            </Flex>
                            <Flex w={"full"} justifyContent={"end"} pt={"2"} pr={"2"} >
                                <CustomButton onClick={() => setTime(false)} fontSize={"xs"} px={"4"} height={"35px"} width={"fit-content"} borderRadius={"full"} text={"Done"} />
                            </Flex>
                        </Flex>
                    </ModalLayout>
                </LocalizationProvider>
                <Flex rounded={"full"} display={["none", "none", "flex"]} cursor={"pointer"} onClick={() => setOpen(true)} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} px={"3"} fontSize={"14px"} h={"45px"} >
                    {!value ? "Select Date And Time" : dateTimeFormat(value)}
                    <CalendarIcon />
                </Flex>
                <Flex position={"relative"} zIndex={"0"} display={["flex", "flex", "none"]} gap={"3"} > 
                    <Flex rounded={"full"} cursor={"pointer"} w={"full"} onClick={() => setOpen(true)} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} px={"3"} fontSize={"14px"} h={"45px"} >
                        {!value ? "Select Date" : dateFormatDashboad(value)}
                        <CalendarIcon />
                    </Flex> 
                    <Flex rounded={"full"} gap={"2"} w={"full"} maxW={"120px"} cursor={"pointer"} onClick={() => setTime(true)} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} px={"3"} fontSize={"14px"} h={"45px"} >
                        {!value ? "00:00" : timeFormat(value)}
                        <ClockIcon />
                    </Flex>
                </Flex>
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

