'use client'
import { useSession, signOut } from "next-auth/react";

function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session, status)
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>
          {JSON.stringify({ session, status }, null, 2)}
        </code>
      </pre>
      <button onClick={signOut}>
        Cerrar sesion
      </button>
    </div>
  );
}

export default DashboardPage;