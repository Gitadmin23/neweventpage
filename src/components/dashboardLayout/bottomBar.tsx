import useCustomTheme from "@/hooks/useTheme";
import { HomeIcon, UsersIcon } from "@/svg";
import { KisokIcon, SidebarWalletIcon } from "@/svg/sidebarIcons";
import { Flex, Link } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { UserImage } from "../shared";
import { useDetails } from "@/helpers/store/useUserDetails";
import { DASHBOARDPAGE_URL } from "@/helpers/services/urls";
import Cookies from "js-cookie"

export default function BottomBar() {


    const pathname = usePathname()

    const {
        mainBackgroundColor,
        borderColor,
        secondaryBackgroundColor,
        bodyTextColor,
    } = useCustomTheme()

    const router = useRouter()

    const { user, userId } = useDetails()
    const token = Cookies.get("chase_token")

    const routeHandler = (item: string) => {

        if (item === "/product/events") {
            router.push("/product/events")
        } else {
            window.location.href = `${DASHBOARDPAGE_URL}/${item}?token=${token}`;
        }
    }

    return (
        <Flex paddingX='20px' zIndex={"100"} position={"sticky"} bottom={"0px"} alignItems={"center"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
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
            <Flex onClick={() => routeHandler(`dashboard/profile/${userId}`)} cursor={"pointer"} >
                <UserImage user={user} />
            </Flex>
        </Flex>
    )
}