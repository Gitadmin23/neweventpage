// "use client"
import { DashboardLayout } from "@/components/dashboardLayout";
import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Suspense>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </Suspense>
    );
}
