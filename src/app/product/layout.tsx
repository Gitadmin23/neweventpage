import { DashboardLayout, ProductTab } from "@/components/dashboardLayout"; 

export const dynamic = "force-dynamic";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <DashboardLayout>
            <ProductTab>
                {children}
            </ProductTab>
        </DashboardLayout>
    );
}
