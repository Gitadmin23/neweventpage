import { Flex } from "@chakra-ui/react";
import { LoginSpinner } from "@/components/shared";
import { Suspense } from "react"; 

export default function Home() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <Flex w={"full"} h={"100vh"} bgColor={"white"} >
        <LoginSpinner />
      </Flex>
    </Suspense>  
  );
}
