"use client"
import useCustomTheme from "@/hooks/useTheme";
import { KisokIcon, NotificationIcon, SidebarEventIcon, SidebarHomeIcon, SidebarLogoutIcon, SidebarMessageIcon, SidebarSearchIcon, SidebarWalletIcon } from "@/svg/sidebarIcons";
import { Flex, Box, Image } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation"; 
import { ReactNode, useState } from "react";

export default function SideBar() {


    type IRoute = {
        icon: ReactNode;
        text: string;
        route: string;
    }

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [activeBar, setActiveBar] = useState("")
    const { borderColor, mainBackgroundColor, secondaryBackgroundColor } = useCustomTheme()
    const userId = ""

    const pathname = usePathname()
    const routes: IRoute[] = [
        {
            route: '/dashboard',
            icon: <SidebarHomeIcon color={pathname === "/dashboard" ? true : false} />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <SidebarSearchIcon color={pathname?.includes("explore") ? true : false} />,
            text: 'Explore'
        },
        {
            route: '/dashboard/product',
            icon: <KisokIcon color={(pathname?.includes('product') || pathname?.includes('kiosk') || pathname?.includes('donation') || pathname?.includes('event')) ? true : false} />,
            text: 'Versax'
        },
        {
            route: '/dashboard/chats',
            icon: <SidebarMessageIcon color={pathname === "/dashboard/chats" ? true : false} />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <SidebarEventIcon color={pathname === "/dashboard/community" ? true : false} />,
            text: 'Community'
        },
        {
            route: '',
            icon: <NotificationIcon color={pathname === "/dashboard/notification" ? true : false} />,
            text: 'Notification'
        },
        {
            route: `/dashboard/settings/payment/details`,
            icon: <SidebarWalletIcon color={pathname === "/dashboard/settings/payment/details" ? true : false} />,
            text: 'Wallet'
        }
    ];

    const ToolTip = ({ content }: { content: string }) => {
        return (
            <>
                {activeBar === content && (
                    <Flex pos={"absolute"} justifyContent={"center"} alignItems={"center"} py={"1"} fontSize={"12px"} fontWeight={"medium"} rounded={"6px"} top={"45px"} w={"fit"} px={"2"} bgColor={secondaryBackgroundColor}  >
                        {content}
                    </Flex>
                )}
            </>
        )
    }

    return (

        <Flex w={"fit-content"} h={"screen"} display={["none", "none", "none", "flex", "flex"]} >
            <Flex w={"110px"} h={"screen"} gap={"4"} overflowY={"auto"} flexDir={"column"} py={"4"} alignItems={"center"} justifyContent={"space-between"} borderRightColor={borderColor} borderRightWidth={"1px"} >
                <Box as='button' onClick={() => router?.push("/")} >
                    <Image alt='logo' src='/images/logo.png' w={"50px"} />
                </Box>
                <Flex flexDir={"column"} alignItems={"center"} gap={"3"} >

                    {routes?.map((item, index) => (
                        <Flex cursor={"pointer"} key={index}>
                            {item?.text !== "Notification" && (
                                <Flex onMouseOver={() => setActiveBar(item?.text)} onMouseOut={() => setActiveBar("")} pos={"relative"} cursor={"pointer"} onClick={() => router?.push(item?.route)} key={index} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                    <Box>
                                        {item?.icon}
                                    </Box>
                                    <ToolTip content={item?.text} />
                                </Flex>
                            )}
                            {item?.text === "Notification" && (
                                <Flex onMouseOver={() => setActiveBar(item?.text)} onMouseOut={() => setActiveBar("")} cursor={"pointer"} key={index} w={"75px"} h={"56px"} position={"relative"} justifyContent={"center"} alignItems={"center"} >
                                    <Box>
                                        {item?.icon}
                                    </Box>
                                    <ToolTip content={item?.text} />
                                </Flex>
                            )}
                        </Flex>
                    ))}

                </Flex>

                <Flex flexDir={"column"} alignItems={"center"} >

                    <Flex position={"relative"} onMouseOver={() => setActiveBar("darkmode")} onMouseOut={() => setActiveBar("")} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                        <Box>
                            {/* <Switch isChecked={colorMode === 'dark'} size={'md'} onChange={() => toggleColorMode()} /> */}
                        </Box>
                        <ToolTip content={"darkmode"} />
                    </Flex>
                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${userId}`)} position={"relative"} onMouseOver={() => setActiveBar("profile")} onMouseOut={() => setActiveBar("")} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                        <Box>
                            {/* <UserImage size={"36px"} border={"1px"} font={"16px"} data={data} image={user?.data?.imgMain?.value} /> */}
                        </Box>
                        <ToolTip content={"profile"} />
                    </Flex>

                    <Flex as={"button"} position={"relative"} onMouseOver={() => setActiveBar("logout")} onMouseOut={() => setActiveBar("")} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                        <Box>
                            <SidebarLogoutIcon />
                        </Box>
                        <ToolTip content={"logout"} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}