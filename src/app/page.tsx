import { Flex } from "@chakra-ui/react";
import { LoginSpinner } from "@/components/shared"; 

export default function Home() {

  return (
    <Flex w={"full"} h={"100vh"} bgColor={"white"} >
      <LoginSpinner />
    </Flex>
  );
}
