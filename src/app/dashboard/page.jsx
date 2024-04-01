'use client'
import { useSession } from "next-auth/react";

function DashboardPage() {
    const { data: session, status } = useSession();
    console.log(session, status)
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default DashboardPage;