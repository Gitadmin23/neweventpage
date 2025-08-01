 "use client"

import { Chat } from "@/helpers/models/chat";
import httpService from "@/helpers/services/httpService";
import { DASHBOARDPAGE_URL, WEBSITE_URL } from "@/helpers/services/urls";
import useCustomTheme from "@/hooks/useTheme"; 
import { MessageIcon } from "@/svg";
import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react"; 

interface Props {
  profile?: any;
  userId: string | number;
}

function ChatBtn(props: Props) {
  const { userId } = props;

  const {
    bodyTextColor, 
    mainBackgroundColor
  } = useCustomTheme(); 

  // const router = useRouter();

  const { isPending: chatCreationLoading, mutate } = useMutation({
    mutationFn: () =>
      httpService.post(`/chat/chat`, {
        type: "ONE_TO_ONE",
        typeID: userId,
        users: [userId],
      }),
    onSuccess: (data: any) => {
      const chat = data?.data as Chat;
      const obj = {
        message: `${WEBSITE_URL}/share?type=ONE_TO_ONE&typeID=${userId}`,
        chatID: chat?.id,
      };
 
      window.location.href = `${DASHBOARDPAGE_URL}/dashboard/chats?activeID=${obj?.chatID}`;
      // router.push(`/dashboard/chats?activeID=${obj?.chatID}`);
      // sendMessage.mutate(obj)
    },
  });

  return (
    <Button
      as="button"
      disabled={chatCreationLoading}
      onClick={() => mutate()}
      color={bodyTextColor}
      bgColor={mainBackgroundColor}
      rounded={"full"}
      loading={chatCreationLoading}
      w={"fit"}
    >
      {/* {chatCreationLoading && <Spinner colorScheme="black" />} */}
      <MessageIcon />
    </Button>
  );
}

export default ChatBtn;
