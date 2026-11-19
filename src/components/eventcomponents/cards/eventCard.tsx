"use client";
import { IEventType } from "@/helpers/models/event";
import useCustomTheme from "@/hooks/useTheme";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductImageScroller, UserImage } from "../../shared";
import moment from "moment";
import { CalendarIcon, LocationStrokeEx } from "@/svg";
import { textLimit } from "@/helpers/utils/textlimit";
import InterestedUsers from "../interestedUser";
import { DASHBOARDPAGE_URL, SHARE_URL } from "@/helpers/services/urls";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";
import { formatNumber } from "@/helpers/utils/numberFormat";
import { FaCheckCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useColorMode } from "@/components/ui/color-mode";

export default function EventCard({ event }: { event: IEventType }) {
    const router = useRouter();

    const {
        primaryColor,
        mainBackgroundColor,
        headerTextColor,
        bodyTextColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode } = useColorMode();
    const query = useSearchParams();
    const frame = query?.get("frame");
    const token = Cookies.get("chase_token");

    const clickHandler = () => {
        if (frame) {
            window.location.href = `${SHARE_URL}/event/${event?.id}`;
        } else {
            router.push("/product/details/events/" + event?.id);
        }
    };

    const profileClickHandler = (e: React.MouseEvent) => {
        if (!frame) {
            e.stopPropagation();
            window.location.href = `${DASHBOARDPAGE_URL}/dashboard/profile/${event?.createdBy?.userId}?token=${token}&theme=${colorMode}`;
        }
    };

    const isFree =
        (event?.minPrice === 0 && event?.maxPrice === 0) ||
        (!event?.minPrice && !event?.maxPrice);

    const currencySymbol = event?.currency === "USD" ? "$" : "₦";

    const formattedPrice = isFree
        ? "Free"
        : formatNumber(event?.minPrice || event?.maxPrice || 0, currencySymbol);

    const creatorName = `${event?.createdBy?.firstName || ""} ${event?.createdBy?.lastName || ""}`.trim();

    return (
        <Flex
            as={"button"}
            onClick={clickHandler}
            flexDir={"column"}
            justifyContent={"space-between"}
            h={"full"}
            bgColor={mainBackgroundColor}
            borderWidth={"1px"}
            borderColor={borderColor}
            rounded={["18px", "20px", "24px"]}
            overflow={"hidden"}
            w={"full"}
            textAlign={"left"}
            cursor={"pointer"}
            transition={"all 0.2s ease"}
            _hover={{ transform: "translateY(-2px)", shadow: "md" }}
        >
            {/* Top Banner Image */}
            <Flex w={"full"} pos={"relative"}>
                <ProductImageScroller
                    images={
                        event?.picUrls?.length > 0
                            ? event.picUrls
                            : [event?.currentPicUrl]
                    }
                    rounded={"0px"}
                    height={["150px", "180px", "210px"]}
                    objectFit={"cover"}
                />

                {/* Event Category Pill (Top Left) */}
                {event?.eventType && (
                    <Flex
                        pos={"absolute"}
                        top={["2.5", "3", "3.5"]}
                        left={["2.5", "3", "3.5"]}
                        zIndex={"2"}
                        bgColor={"rgba(255, 255, 255, 0.22)"}
                        backdropFilter={"blur(10px)"}
                        borderWidth={"1px"}
                        borderColor={"rgba(255, 255, 255, 0.25)"}
                        px={["2.5", "3", "3.5"]}
                        py={["1", "1", "1.5"]}
                        rounded={"full"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Text
                            fontSize={["10px", "11px", "12px"]}
                            fontWeight={"600"}
                            color={"white"}
                            lineHeight={"1"}
                        >
                            {capitalizeFLetter(
                                event?.eventType?.replaceAll("_", " "),
                            )}
                        </Text>
                    </Flex>
                )}

                {/* Interested Users Pill (Top Right) */}
                {event?.interestedUsers?.length > 0 && (
                    <Flex
                        pos={"absolute"}
                        top={["2", "2.5", "3"]}
                        right={["2", "2.5", "3"]}
                        zIndex={"2"}
                        bgColor={"rgba(0, 0, 0, 0.25)"}
                        backdropFilter={"blur(8px)"}
                        px={"1.5"}
                        py={"1"}
                        rounded={"full"}
                        alignItems={"center"}
                    >
                        <InterestedUsers size={"2xs"} event={event} />
                    </Flex>
                )}
            </Flex>

            {/* Card Body */}
            <Flex
                flexDir={"column"}
                w={"full"}
                flex={"1"}
                justifyContent={"space-between"}
                px={["2.5", "3.5", "5"]}
                pt={["3", "3.5", "4"]}
                pb={["3", "3.5", "4"]}
                gap={["2", "2.5", "3"]}
            >
                <Flex flexDir={"column"} w={"full"} gap={["1.5", "2", "2.5"]}>
                    {/* Date & Time */}
                    <Flex alignItems={"center"} gap={"1.5"}>
                        <Flex flexShrink={0}>
                            <CalendarIcon color={primaryColor} width="14px" />
                        </Flex>
                        <Text
                            color={primaryColor}
                            fontSize={["10px", "11px", "13px"]}
                            fontWeight={"600"}
                            lineClamp={1}
                        >
                            {moment(event?.startDate).format(
                                "ddd, D MMM YYYY • h:mm A",
                            )}
                        </Text>
                    </Flex>

                    {/* Event Title */}
                    <Text
                        fontSize={["14px", "16px", "20px"]}
                        fontWeight={"700"}
                        color={headerTextColor}
                        lineHeight={"1.25"}
                        lineClamp={1}
                    >
                        {capitalizeFLetter(event?.eventName)}
                    </Text>

                    {/* Location */}
                    <Flex alignItems={"center"} gap={"1.5"} mt={"0.5"}>
                        <Flex flexShrink={0}>
                            <LocationStrokeEx
                                color={bodyTextColor}
                                size="16px"
                            />
                        </Flex>
                        <Text
                            color={bodyTextColor}
                            fontSize={["11px", "12px", "13px"]}
                            fontWeight={"500"}
                            lineClamp={1}
                        >
                            {event?.location?.toBeAnnounced
                                ? "To Be Announced"
                                : event?.location?.locationDetails ||
                                  event?.locationType ||
                                  "Online"}
                        </Text>
                    </Flex>

                    {/* Creator & Escrow Verified Badge */}
                    <Flex
                        alignItems={"center"}
                        gap={["1.5", "2", "2.5"]}
                        flexWrap={"wrap"}
                        mt={"0.5"}
                    >
                        <Flex
                            onClick={profileClickHandler}
                            alignItems={"center"}
                            gap={"1.5"}
                            cursor={"pointer"}
                        >
                            <UserImage size={"2xs"} user={event?.createdBy} />
                            <Text
                                fontSize={["11px", "12px", "13px"]}
                                fontWeight={"500"}
                                color={headerTextColor}
                                lineClamp={1}
                            >
                                {textLimit(creatorName, 11)}
                            </Text>
                        </Flex>

                        <Flex
                            alignItems={"center"}
                            gap={"1"}
                            bgColor={
                                colorMode === "dark"
                                    ? "rgba(16, 185, 129, 0.15)"
                                    : "#E8FBF2"
                            }
                            color={"#059669"}
                            px={["2", "2.5", "2.5"]}
                            py={"1"}
                            rounded={"full"}
                            flexShrink={0}
                        >
                            <FaCheckCircle size={"11px"} color={"#10B981"} />
                            <Text
                                fontSize={["9px", "10px", "11px"]}
                                fontWeight={"600"}
                                lineHeight={"1"}
                            >
                                Escrow Verified
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Divider & Footer (Price + Buy Ticket Button) */}
                <Flex flexDir={"column"} w={"full"} gap={["2.5", "3", "3.5"]}>
                    <Box
                        w={"full"}
                        h={"1px"}
                        bgColor={borderColor}
                        opacity={0.4}
                    />
                    <Flex
                        w={"full"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        gap={"2"}
                    >
                        <Flex flexDir={"column"} alignItems={"start"}>
                            <Text
                                fontSize={["9px", "10px", "11px"]}
                                fontWeight={"600"}
                                color={bodyTextColor}
                                letterSpacing={"0.5px"}
                                textTransform={"uppercase"}
                            >
                                PRICE
                            </Text>
                            <Text
                                fontSize={["14px", "16px", "20px"]}
                                fontWeight={"800"}
                                color={headerTextColor}
                                lineHeight={"1.2"}
                            >
                                {formattedPrice}
                            </Text>
                        </Flex>

                        <Flex
                            bgColor={primaryColor}
                            color={"white"}
                            px={["3", "4", "5"]}
                            h={["32px", "36px", "42px"]}
                            rounded={"full"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            fontSize={["11px", "12px", "14px"]}
                            fontWeight={"600"}
                            flexShrink={0}
                            _hover={{ opacity: 0.92 }}
                        >
                            Buy Ticket
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
