import { DashboardLayout, ProductTab } from "@/components/dashboardLayout";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Suspense>
            <DashboardLayout>
                <Suspense>
                    <ProductTab>
                        {children}
                    </ProductTab>
                </Suspense>
            </DashboardLayout>
        </Suspense>
    );
}
