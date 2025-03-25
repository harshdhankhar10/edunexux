import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/auth-provider";



export const metadata: Metadata = {
  title: "EduNexus | Smart Classroom Management System",
  description: "EduNexus is a smart classroom management system that helps teachers and students to manage their classroom activities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <AuthProvider >
        <Toaster />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
