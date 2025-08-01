import { CreateEventSidebar } from "@/components/createEventComponents";
import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Flex w={"full"} flexDir={["column", "column", "row"]} h={"full"} >
            <Flex w={["full", "full", "fit"]} >
                <CreateEventSidebar />
            </Flex>
            <Flex w={"full"} pos={"relative"} h={"full"} >
                <Flex w={"full"} flex={"1"} pos={["absolute"]} overflowY={"auto"} inset={"0px"} >
                    {children}
                </Flex>
            </Flex>
        </Flex>
    )
}