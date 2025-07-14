import { DashboardLayout } from "@/components/dashboardLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
