import useCustomTheme from "@/hooks/useTheme";
import { HomeIcon, Login, UsersIcon } from "@/svg";
import { KisokIcon, SidebarWalletIcon, NotificationIcon } from "@/svg/sidebarIcons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { ModalLayout, UserImage } from "../shared";
import { useDetails } from "@/helpers/store/useUserDetails";
import { DASHBOARDPAGE_URL, LANDINGPAGE_URL } from "@/helpers/services/urls";
import Cookies from "js-cookie"
import { useColorMode } from "../ui/color-mode";
import useGetUser from "@/hooks/useGetUser";

export default function BottomBar({count} : {count: string}) {


    const pathname = usePathname()
    const { colorMode } = useColorMode();
    const { user, show } = useGetUser()

    const {
        mainBackgroundColor,
        borderColor,
        secondaryBackgroundColor,
        bodyTextColor,
        primaryColor
    } = useCustomTheme()

    const router = useRouter()

    const token = Cookies.get("chase_token")

    const routeHandler = (item: string) => {

        if (item === "/product/events") {
            router.push("/product/events")
        } else {
            window.location.href = `${DASHBOARDPAGE_URL}/${item}?token=${token}&theme=${colorMode}`;
        }
    }

    const login = () => {
        window.location.href = `${LANDINGPAGE_URL}/logout`;
    }


    return (
        <Flex px={"3"} pos={"fixed"} zIndex={8} bottom={"0px"} insetX={"0px"} bgColor={mainBackgroundColor} alignItems={"center"} justifyContent={"space-between"} width='100%' height='70px' borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
            <Flex onClick={() => routeHandler("dashboard")} cursor={"pointer"} flexDir={"column"} width={"full"} maxW={"50px"} color={pathname === "/dashboard" ? primaryColor : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <HomeIcon />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Home</Text>
            </Flex>
            <Flex onClick={() => routeHandler("dashboard/settings/payment/details")} flexDir={"column"} cursor={"pointer"} width={"full"} maxW={"50px"} color={pathname?.includes('payment/details') ? primaryColor : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} pos={"relative"} >
                    <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Wallet</Text>
            </Flex>
            <Flex onClick={() => routeHandler('/product/events')} cursor={"pointer"} flexDir={"column"} width={"full"} maxW={"50px"} color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? primaryColor : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
                </Flex>
                <Flex h={"14px"} > 
                    <Text fontSize={"10px"} fontWeight={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? "bold" : "medium"} color={"transparent"} >Event_Hub</Text>
                    <Text fontSize={"10px"} fontWeight={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? "bold" : "medium"} pos={"absolute"} >Event Hub</Text>
                </Flex>
            </Flex>
            <Flex onClick={() => routeHandler('dashboard/notification')} cursor={"pointer"} flexDir={"column"} alignItems={"center"} width={"full"} maxW={"50px"} color={pathname?.includes('community') ? primaryColor : bodyTextColor} justifyContent={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} pos={"relative"} >
                    <NotificationIcon size="20px" />
                    <Flex w={"5"} h={"5"} pos={"absolute"} rounded={"full"} bg={primaryColor} top={"-1"} right={"-10px"} color={"white"} justifyContent={"center"} alignItems={"center"} pb={"2px"} fontWeight={"semibold"} fontSize={"12px"}  >
                        {count}
                    </Flex>
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Notification</Text>
            </Flex>
            <Flex onClick={() => routeHandler('dashboard/community')} cursor={"pointer"} flexDir={"column"} alignItems={"center"} width={"full"} maxW={"50px"} color={pathname?.includes('community') ? primaryColor : bodyTextColor} justifyContent={'center'}>
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <UsersIcon />
                </Flex>
                <Text fontSize={"10px"} fontWeight={"medium"} >Community</Text>
            </Flex>
            <Flex onClick={() => routeHandler(`dashboard/profile/${user?.userId}`)} flexDir={"column"} alignItems={"center"} width={"full"} maxW={"50px"} cursor={"pointer"} >
                <Flex justifyContent={"center"} alignItems={"center"} h={"34px"} >
                    <UserImage size="xs" user={user} />
                </Flex>
                <Text fontSize={"10px"} color={bodyTextColor} fontWeight={"medium"} >Profile</Text>
            </Flex>
            <ModalLayout size={"xs"} trigger={true} open={show} close={() => console.log("logout")} >
                <Flex
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"center"}
                    gap={1}
                    rounded={"lg"}
                    flexDirection={"column"}
                    bgColor={mainBackgroundColor}
                    p={"6"}
                    alignItems={"center"}
                >
                    <Flex
                        width="60px"
                        height={"60px"}
                        borderRadius={"full"}
                        justifyContent={"center"}
                        bg="#df26263b"
                        alignItems={"center"}
                    >
                        <Login />
                    </Flex>
                    <Text fontSize={"24px"} mt={"4"} fontWeight={"600"} >
                        Session Expired
                    </Text>
                    <Text fontSize={"sm"} textAlign={"center"} >Your session has expired. please log in again to continue</Text>
                    <Flex justifyContent={"center"} mt={4} roundedBottom={"lg"} gap={"3"} width={"100%"}>
                        <Button
                            borderColor={primaryColor}
                        
                            rounded={"full"}
                            _hover={{ backgroundColor: primaryColor }}
                            bg={primaryColor}
                            width="60%"
                            fontWeight={"600"}
                            height={"45px"}
                            color="white"
                            onClick={login}
                        >
                            Login
                        </Button>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}