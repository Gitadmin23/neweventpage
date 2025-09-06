"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import useCustomTheme from "@/hooks/useTheme";
import { ShareType } from "@/helpers/models/share";
import { ShareIconTwo, HomeShareIcon } from "@/svg";
import Qr_code from "../sharecomponents/Qr_code";
import SendMesageModal from "../sharecomponents/send_to_app_user";
import SendMessage from "../sharecomponents/sendMessageModal";
import ModalLayout from "./modalLayout";
import { useColorMode } from "../ui/color-mode";

interface Props {
  id: any;
  size?: string;
  isprofile?: boolean;
  istext?: boolean;
  type: ShareType;
  eventName?: string;
  data?: any;
  showText?: boolean;
  home?: boolean;
  notext?: boolean;
  community?: boolean;
  color?: string;
  newbtn?: boolean,
  name?: string
  affiliateID?: string
}

function ShareEvent(props: Props) {
  const {
    id,
    size,
    isprofile,
    istext,
    eventName,
    data,
    showText = true,
    home,
    notext,
    community,
    color,
    newbtn,
    affiliateID
  } = props;

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(1);

  const {
    bodyTextColor,
    mainBackgroundColor,
    secondaryBackgroundColor
  } = useCustomTheme()

  const { colorMode } = useColorMode();

  const CloseModal = () => {
    setOpen(false);
    setTab(1);
  };  

  const clickHandler = (event: any) => {
    event.stopPropagation();
    setOpen(true);
  };


  const handler = (event: any) => {
    event.stopPropagation(); 
  };

  return (
    <Flex onClick={handler}>
      {!community && (
        <Box 
          width={"fit-content"}
          zIndex={"8"}
          mt={size === "18px" ? "10px" : "0px"}
        >
          {isprofile && !istext && (
            <Box mt={"2px"} onClick={(e: any) => clickHandler(e)} cursor={"pointer"}>
              <ShareIconTwo color={bodyTextColor} />
            </Box>
          )}
          {isprofile && istext && (
            <Text onClick={(e: any) => clickHandler(e)} cursor={"pointer"}>
              Share
            </Text>
          )}
          {!isprofile && (
            <>
              {home && (
                <Flex
                  onClick={(e: any) => clickHandler(e)}
                  as="button"
                  w={"41px"}
                  height={"44px"}
                  justifyContent={"center"}
                  flexDir={"column"}
                  alignItems={"center"}
                >
                  <Flex
                    width={"24px"}
                    h={"30px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <HomeShareIcon color={bodyTextColor} />
                  </Flex>
                  {!notext && (
                    <Text
                      color={
                        colorMode === "light" ? "#00000099" : bodyTextColor
                      }
                      fontFamily={"DM-Bold"}
                      fontSize="10px"
                    >
                      share
                    </Text>
                  )}
                </Flex>
              )}
              {!home && (
                <Box
                  onClick={(e: any) => clickHandler(e)}
                  cursor={"pointer"}
                  display={"flex"}
                  alignItems={"center"}
                  flexDir={"column"}
                  bgColor={mainBackgroundColor}
                  p={"1"}
                  rounded={"md"} 
                  zIndex={"20"}
                  pos={"absolute"} bottom={"4"}
                  right={"4"}
                >
                  {newbtn && (
                    <ShareIconTwo
                      width={size ? size : "24px"}
                      color={color ? colorMode !== "light" ? "#3C41F0" : color : colorMode === "light" ? "#3C41F0" : bodyTextColor}
                    />
                  )}
                  {!newbtn && (
                    <ShareIconTwo
                      size={size ? size : "14px"}
                      color={color ? colorMode !== "light" ? "#3C41F0" : color : colorMode === "light" ? "#3C41F0" : bodyTextColor}
                    />
                  )}
                  {showText && (
                    <Text
                      color={colorMode === "light" ? "#3C41F0" : bodyTextColor}
                      fontSize={"9px"}
                      fontWeight={"semibold"}
                    >
                      share
                    </Text>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      )}
      {community && (
        <Button onClick={() => setOpen(true)} w={"76px"} h={"64px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"0px"} bg={mainBackgroundColor} rounded={"12px"} style={{ boxShadow: "0px 1px 3px 1px #0000001A" }} outline={"none"} _hover={{ backgroundColor: mainBackgroundColor }} >
          <Flex justifyContent={"center"} alignItems={"center"} w={"30px"} color={"#5D70F9"} h={"30px"} >
            <ShareIconTwo color={"#5D70F9"} />
          </Flex>
          <Text fontWeight={"500"} fontSize={"13px"} textAlign={"center"} color={"#5D70F9"} >Share</Text>
        </Button>
      )}

      <ModalLayout
        open={open}
        trigger={true}
        close={CloseModal}
        closeBtn={tab === 3 ? false : true}
      >
        <Flex w={"full"} bgColor={secondaryBackgroundColor} flexDir={"column"} gap={"3"} py={tab !== 3 ? "3" : "0px"} rounded={"lg"} >
          {tab !== 3 && (
            <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"lg"} >
              {tab === 1 ? "Share" : tab === 2 ? "Share with friends" : ""}
            </Text>
          )}
          {tab === 1 && (
            <SendMessage
              data={data}
              isprofile={isprofile}
              type={props.type}
              id={id}
              click={setTab}
              eventName={eventName}
              affiliateID={affiliateID}
            />
          )}
          {tab === 2 && (
            <SendMesageModal
              type={props.type}
              isprofile={isprofile}
              id={id}
              onClose={CloseModal}
              affiliateID={affiliateID}
            />
          )}
          {tab === 3 && <Qr_code affiliateID={affiliateID} type={props?.type} data={data} close={CloseModal} id={id} />}
        </Flex>
      </ModalLayout>
    </Flex>
  );
} 

export default ShareEvent;
