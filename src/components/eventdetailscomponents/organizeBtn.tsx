import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FiAlertCircle } from "react-icons/fi";
import useCustomTheme from "@/hooks/useTheme";
import { DashboardEditIcon, DashboardOrganizerIcon, DashboardScannerIcon } from '@/svg';
import PrBtn from '../prcomponent/prBtn';
import { CustomButton, ModalLayout } from '../shared';
import { IEventType } from '@/helpers/models/event';
import Scanner from './scanner';
import { DASHBOARDPAGE_URL } from '@/helpers/services/urls';
import Cookies from "js-cookie"

function OrganizeBtn(props: IEventType) {
    const {
        isOrganizer,
        eventMemberRole,
        startDate,
        endDate,
        id
    } = props

    const {
        borderColor,
        mainBackgroundColor,
        headerTextColor
    } = useCustomTheme()

    const [showScanner, setShowScanner] = React.useState(false);
    const token = Cookies.get("chase_token")

    const router = useRouter()
    const [listOfClicks, setListOfClicks] = useState(0)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const clickHandler = () => {
        if (props?.ticketBought) {
            setOpen(true)
        } else {
            router.push(`/product/create/events/edit?id=${props?.id}`)
        }
    }

    useEffect(() => {
        props?.productTypeData?.map((item: any) => {
            let count = item?.clickThroughCount + listOfClicks
            setListOfClicks(count)
        })
    }, [])

    const routeHandler = () => {
        window.location.href = `${DASHBOARDPAGE_URL}/dashboard/settings/event-dashboard/${id}?token=${token}`;
    } 

    return (
        <Box w={"full"} >
            <Flex rounded={"12px"} bgColor={mainBackgroundColor} maxW={["350px"]} w={"full"} flexDir={"column"} borderWidth={"1px"} borderColor={borderColor} >
                <Flex w={"full"} borderBottomWidth={"1px"} borderColor={borderColor} >
                    <Button w={"50%"} bgColor={mainBackgroundColor} color={headerTextColor} borderWidth={"0px"} roundedTopLeft={"12px"} roundedRight={"0px"} gap={"2"} h={"55px"} as={"button"} alignItems={"center"} justifyContent={"center"} borderRightWidth={"1px"} borderColor={borderColor} disabled={eventMemberRole === "COLLABORATOR" ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={routeHandler} >
                        <DashboardOrganizerIcon />
                        <Text fontSize={"14px"} fontWeight={"500"} >Dashboard</Text>
                    </Button>
                    <Button w={"50%"} bgColor={mainBackgroundColor} color={headerTextColor} borderWidth={"0px"} roundedTopRight={"12px"} gap={"2"} h={"55px"} alignItems={"center"} justifyContent={"center"} as={"button"} disabled={(pathname?.includes("pastdetails") || eventMemberRole === "COLLABORATOR" || (eventMemberRole === "ADMIN" && !isOrganizer)) ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => clickHandler()} >
                        <DashboardEditIcon />
                        <Text fontSize={"14px"} fontWeight={"500"} >Edit Event</Text>
                    </Button>
                </Flex>
                <Flex w={"full"} >
                    <PrBtn data={props} />
                    <Button w={"50%"} gap={"2"} h={"55px"} display={["flex", "flex", "none"]} bgColor={mainBackgroundColor} color={headerTextColor} borderLeftWidth={"1px"} rounded={"0px"} roundedBottomRight={"12px"} alignItems={"center"} justifyContent={"center"} as={"button"} disabled={(pathname?.includes("pastdetails")) ? true : false} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => setShowScanner(true)} >
                        <DashboardScannerIcon />
                        <Text fontSize={"14px"} fontWeight={"500"} >Scan Ticket</Text>
                    </Button>
                </Flex>
            </Flex>
            <ModalLayout open={open} trigger={true} >
                <Box px={"4"} pt={"5"} pb={"5"} >
                    <Flex color={"brand.chasescrollRed"} width={"full"} pb={"4"} justifyContent={"center"} >
                        <FiAlertCircle size={"60px"} />
                    </Flex>
                    <Text fontWeight={"medium"} textAlign={"center"} >{`You can only edit the DATE, TIME, LOCATION and INCREASE NUMBER OF AVAILABLE TICKETS for this event. You already have existing attendees for this event.`}</Text>
                    <Flex w={"full"} gap={"4"} mt={"6"} >
                        <CustomButton onClick={() => setOpen(false)} backgroundColor={"brand.chasescrollRed"} width={"full"} text='Cancel' />
                        <CustomButton onClick={() => router.push("/dashboard/event/edit_event_data/" + props?.id)} text='Continue' width={"full"} />
                    </Flex>
                </Box>
            </ModalLayout>
            <Scanner isOpen={showScanner} eventID={props?.id} startDate={startDate} endDate={endDate} onClose={() => setShowScanner(false)} />
        </Box>
    )
}

export default OrganizeBtn
