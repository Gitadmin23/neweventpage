"use client";

import { useEffect } from "react";
import { Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import useCustomTheme from "@/hooks/useTheme";
import useNotificationHook from "@/hooks/useNotificationHook";
import useGetUser from "@/hooks/useGetUser";
import { useImage } from "@/helpers/store/useImagePicker";
import useSearchStore from "@/helpers/store/useSearchData";
import { useColorMode } from "../ui/color-mode";

import SideBar from "./sidebar";
import Navbar from "./navbar";
import BottomBar from "./bottomBar";
import { ModalLayout } from "../shared";
import { IUser } from "@/helpers/models/user";
import { LANDINGPAGE_URL } from "@/helpers/services/urls";
import { Login } from "@/svg";

interface IProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: IProps) {
    const { mainBackgroundColor, headerTextColor, primaryColor } =
        useCustomTheme();

    const { setSearchValue } = useSearchStore((state) => state);
    const { setImage } = useImage((state: any) => state);
    const { setColorMode, colorMode } = useColorMode();

    const pathname = usePathname();
    const query = useSearchParams();
    const frame = query?.get("frame");
    const theme: any = query?.get("theme");

    const { count } = useNotificationHook();
    const { isLoading, user, show, setShow } = useGetUser();

    /** Handle color mode from query */
    useEffect(() => {
        if (theme) setColorMode(theme);
    }, [theme, setColorMode]);

    /** Reset state on route change */
    useEffect(() => {
        setImage([]);
        setSearchValue("");
    }, [pathname, setImage, setSearchValue]);

    const login = () => {
        Cookies.remove("chase_token");
        window.location.href = `${LANDINGPAGE_URL}/logout`;
    };

    return (
        <Flex
            w="100vw"
            h="100vh"
            pos="fixed"
            inset="0"
            color={headerTextColor}
            bgColor={mainBackgroundColor}
        >
            {!frame && <SideBar count={count} isLoading={isLoading} user={user as IUser} />}

            <Flex w="full" h="100vh" pos="relative" flexDirection="column">
                {/* Navbar */}
                {!frame && (
                    <Flex
                        w="full"
                        display={[
                            "flex",
                            "flex",
                            !pathname?.includes("create") && !pathname?.includes("details")
                                ? "flex"
                                : "none",
                        ]}
                        pos="relative"
                    >
                        <Navbar />
                    </Flex>
                )}

                {/* Content */}
                <Flex w="full" h="full" pos="relative">
                    <Flex
                        w="full"
                        pos="absolute"
                        flexDir="column"
                        overflowY="auto"
                        bottom={frame ? "0" : "0"}
                        top={frame ? "0" : ["76px", "76px", "76px", "0", "0"]}
                        insetX="0"
                    >
                        {children}
                    </Flex>

                    {/* Background grid */}
                    <Grid
                        templateColumns={[
                            "repeat(2, 1fr)",
                            "repeat(2, 1fr)",
                            "repeat(3, 1fr)",
                            "repeat(4, 1fr)",
                        ]}
                        bgColor={colorMode !== "dark" ? "transparent" : "#000"}
                        opacity={colorMode !== "dark" ? "100%" : "15%"}
                        pos="absolute"
                        inset="0"
                        zIndex="-5"
                        w="full"
                        h="full"
                        overflow="hidden"
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Image
                                key={i}
                                src="/images/bg.png"
                                alt="bg"
                                w="full"
                                h="full"
                                objectFit="contain"
                                opacity="40%"
                            />
                        ))}
                    </Grid>
                </Flex>

                {/* Bottom bar (mobile only) */}
                {!frame && (
                    <Flex
                        w="full"
                        h="fit-content"
                        display={["flex", "flex", "flex", "none", "none"]}
                    >
                        <Flex w="full" pos="relative" h="70px">
                            <BottomBar count={count} />
                        </Flex>
                    </Flex>
                )}
            </Flex>

            {/* Session expired modal */}
            <ModalLayout
                size="xs"
                trigger
                open={show}
                close={() => setShow(false)}
            >
                <Flex
                    w="100%"
                    h="100%"
                    justifyContent="center"
                    gap={1}
                    rounded="lg"
                    flexDirection="column"
                    bgColor={mainBackgroundColor}
                    p="6"
                    position="relative"
                    zIndex="50"
                    alignItems="center"
                >
                    <Flex
                        w="60px"
                        h="60px"
                        borderRadius="full"
                        justifyContent="center"
                        bg="#df26263b"
                        alignItems="center"
                    >
                        <Login />
                    </Flex>

                    <Text fontSize="24px" mt="4" fontWeight="600">
                        Session Expired
                    </Text>
                    <Text fontSize="sm" textAlign="center">
                        Your session has expired. Please log in again to continue.
                    </Text>

                    <Flex justifyContent="center" mt={4} gap="3" w="100%">
                        <Button
                            borderColor={primaryColor}
                            borderWidth="1px"
                            rounded="full"
                            _hover={{ backgroundColor: primaryColor }}
                            bg={primaryColor}
                            w="60%"
                            h="45px"
                            fontWeight="600"
                            color="white"
                            onClick={login}
                        >
                            Login
                        </Button>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    );
}
