import { DashboardLayout, ProductTab } from "@/components/dashboardLayout"; 

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
