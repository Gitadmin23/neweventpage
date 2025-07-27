import useCustomTheme from "@/hooks/useTheme";
import { HomeIcon, UsersIcon } from "@/svg";
import { KisokIcon, SidebarWalletIcon } from "@/svg/sidebarIcons";
import { Flex, Link } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { UserImage } from "../shared";
import { useDetails } from "@/helpers/store/useUserDetails";

export default function BottomBar() {


    const pathname = usePathname()

    const {
        mainBackgroundColor,
        borderColor,
        secondaryBackgroundColor,
        bodyTextColor,
        primaryColor
    } = useCustomTheme()

    const { user, userId } = useDetails()

    return ( 
        <Flex paddingX='20px' zIndex={"100"} position={"sticky"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none', 'none']}>
            <Link href='/dashboard'>
                <Flex width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname === "/dashboard" ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                    <HomeIcon />
                </Flex>
            </Link>

            <Link href='/dashboard/settings/payment/details'>
                <Flex width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard/settings/payment/details" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                    <SidebarWalletIcon mobile={true} size={"20px"} color={pathname === "/dashboard/settings/payment/details" ? true : false} />
                </Flex>
            </Link>

            <Link href='/dashboard/product'>
                <Flex width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? secondaryBackgroundColor : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                    <KisokIcon size='20px' color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />
                </Flex>
            </Link>
            <Link href='/dashboard/community'>
                <Flex width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('community') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                    {/* <People size='20px' /> */}
                    <UsersIcon />
                </Flex>
            </Link>

            <Link href={userId ? `/dashboard/profile/${userId}` : ""}> 
                <UserImage user={user} /> 
            </Link>
        </Flex>
    )
}