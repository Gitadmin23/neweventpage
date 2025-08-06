
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { IoClose } from "react-icons/io5";
import QRCode from "react-qr-code";  
import html2canvas from "html2canvas"; 
import { ShareType } from "@/helpers/models/share";
import useCustomTheme from "@/hooks/useTheme";
import { SHARE_URL } from "@/helpers/services/urls";
import { capitalizeFLetter } from "@/helpers/utils/capitalLetter";
import { textLimit } from "@/helpers/utils/textlimit";
import { CustomButton } from "../shared";
import CopyRightText from "../shared/copyRightText";
import { IoIosClose } from "react-icons/io";

interface Props {
  id: string | number;
  close: any;
  data?: any;
  name?: string;
  type?: ShareType
  affiliateID: string
}

function Qr_code(props: Props) {
  const { id, close, data, type, name, affiliateID } = props;

  const {
    bodyTextColor, 
    primaryColor,
  } = useCustomTheme(); 

  const componentRef: any = React.useRef("");

  function downloadComponentAsPNG() {
    if (!componentRef.current) return;
  
    html2canvas(componentRef.current).then((canvas: any) => {
      const link = document.createElement('a');
      link.download = data?.eventName ? data?.eventName : data?.name+" QRcode";
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  const url_link =
    type === "EVENT"
      ? `${SHARE_URL}${"/event?id="}${id}${affiliateID ? `&affiliateID=${affiliateID}` : ``}` :
        type === "RENTAL" ? `${SHARE_URL}${"/rental?id="}${id}`:
        type === "SERVICE" ? `${SHARE_URL}${"/service?id="}${id}`:
        type === "KIOSK" ? `${SHARE_URL}${"/product?id="}${id}`:
        type === "DONATION" ? `${SHARE_URL}${"/fundraiser?id="}${id}`
        : `${SHARE_URL}/event?id=${id}`;


  return (
    <Flex flexDir={"column"} roundedTop={"lg"} alignItems={"center"} pb={"8"}>
      <Box
        onClick={() => close(false)}
        cursor={"pointer"}
        width={"25px"}
        zIndex={30}
        position={"absolute"}
        top={"2"}
        right={"4"}
      >
        <IoIosClose size={"30px"} color="white" />
      </Box>
      <Flex
        height={["520px"]}
        ref={componentRef}
        flexDir={"column"}
        alignItems={"center"}
        width={"full"} 
        px={"2"}
        roundedTop={"lg"}
      >
        <Box
          height={"300px"}
          roundedTopLeft={"20px"}
          width={"full"}
          roundedBottom={"full"}
          mt={"2"}  
          zIndex={10}
          style={{ background: "#5D70F9" }}
        />

        <Flex
          position={"absolute"}
          bg={"transparent"}
          left={"0px"}
          right={"0px"}
          flexDir={"column"}
          alignItems={"center"}
          width={"full"}
          roundedTop={"lg"} 
        >
          <Flex pt={"6"} zIndex={20}>
            <HStack justifyContent={"center"}>
              {/* <Image src='/assets/images/chasescroll-logo.png' width={30} height={30} alt='logo' /> */}
              <Text
                fontWeight={"bold"}
                fontSize={"24px"}
                color="#FFF"
              >
                Chasescroll
              </Text>
            </HStack>
          </Flex>
          <Flex
            zIndex={20}
            alignItems={"center"}
            flexDir={"column"}
            roundedTop={"lg"}
            pt={"4"}
            color={"white"}
            width={"full"}
          >
            {type && (
              <Text fontSize={"14px"}>{capitalizeFLetter(type)} Name</Text>
            )}

            {!type && (
              <Text fontSize={"14px"}>{type === "EVENT" ? "Event" : type === "RENTAL" ? "Rental" : type === "SERVICE" ? "Service" : type === "KIOSK" ? "Kiosk" : "Fundraising"} Name</Text>
            )}
            <Text fontSize={"18px"} fontWeight={"bold"}>
              {textLimit(name ? name : data?.eventName ? data?.eventName : data?.name, 20)}
            </Text>
          </Flex>
          <Flex justifyContent={"center"} flex={1} width={"full"} pt={"6"}>
            <Box
              zIndex={20}
              width={["60%", "50%"]}
              shadow={"lg"}
              bg={"white"}
              p={"3"}
              rounded={"md"}
            >
              <QRCode
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                  zIndex: 20,
                }}
                value={url_link}
                viewBox={`0 0 256 256`}
              />
            </Box>
          </Flex>
          {type ? (
            <Text mt={"4"} color={bodyTextColor}>Scan to Confirm Your Order</Text>
          ) : (
            <Text mt={"4"} color={bodyTextColor}>
              Scan here and get Your {type === "EVENT" ? "Event" : type === "RENTAL" ? "Rental" : type === "SERVICE" ? "Service" : type === "KIOSK" ? "Kiosk" : "Fundraising"} Link
            </Text>
          )}
          <Text fontSize={"xs"} textAlign={"center"}>
            <CopyRightText />
          </Text>
        </Flex>
      </Flex>
      <CustomButton
        maxWidth={"300px"}
        backgroundColor={primaryColor}
        onClick={() => downloadComponentAsPNG()}
        text="Download QR-Code"
      />
    </Flex>
  );
}

export default Qr_code;
