"use client"
import { DashboardLayout, ProductTab } from "@/components/dashboardLayout";
import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()

    return (
        <Suspense>
            <DashboardLayout>
                <Flex w={"full"} px={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["4", "4", "6"]} pt={(pathname?.includes("create") || pathname?.includes("details")) ? "0px" : ["6", "6", "12", "12"]} pb={pathname?.includes("create") ? "0px" : "12"} flexDir={"column"} overflowY={"auto"} >
                    {(!pathname?.includes("create") && !pathname?.includes("details")) && (
                        <ProductTab />
                    )}
                    {children}
                </Flex>
            </DashboardLayout>
        </Suspense>
    );
}
