import type { Metadata } from "next";
import Navbar from "@/components/Dashboard/Student/StudentNavbar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";




export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Explore your student dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
){
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (!userInfo || userInfo.role !== 'STUDENT') {
    redirect("/login");
  }
  


  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <Navbar userinfo={userInfo} />
        {children}
      </body>
    </html>
  );
}
