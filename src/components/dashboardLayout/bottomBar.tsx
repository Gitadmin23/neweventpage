import useCustomTheme from "@/hooks/useTheme";
import { HomeIcon, Login, UsersIcon } from "@/svg";
import { KisokIcon, SidebarWalletIcon } from "@/svg/sidebarIcons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { ModalLayout, UserImage } from "../shared";
import { useDetails } from "@/helpers/store/useUserDetails";
import { DASHBOARDPAGE_URL, LANDINGPAGE_URL } from "@/helpers/services/urls";
import Cookies from "js-cookie"
import { useColorMode } from "../ui/color-mode";
import useGetUser from "@/hooks/useGetUser";

export default function BottomBar() {


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
        <Flex paddingX='20px' zIndex={"20"} position={"sticky"} bottom={"0px"} alignItems={"center"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
            <Flex onClick={() => routeHandler("dashboard")} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname === "/dashboard" ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <HomeIcon />
            </Flex> 
            <Flex onClick={() => routeHandler("dashboard/settings/payment/details")} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard/settings/payment/details" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
            </Flex>
            <Flex onClick={() => routeHandler('/product/events')} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? secondaryBackgroundColor : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
            </Flex>
            <Flex onClick={() => routeHandler('dashboard/community')} cursor={"pointer"} width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('community') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                {/* <People size='20px' /> */}
                <UsersIcon />
            </Flex>
            <Flex onClick={() => routeHandler(`dashboard/profile/${user?.userId}`)} cursor={"pointer"} >
                <UserImage user={user} />
            </Flex>
            <ModalLayout size={"xs"} trigger={true} open={show} close={()=> console.log("logout")} >
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
                            borderWidth={"1px"}
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