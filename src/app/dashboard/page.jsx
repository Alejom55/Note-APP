'use client'
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session, status)
  const autenticado = () => {
    if (status === "authenticated" && session) {
      const { user } = session;
      return user;
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>
          {JSON.stringify({ session, status }, null, 2)}
        </code>
      </pre>
      {/* <h1>Bienvenido, {session.user._id}</h1> */}
      <button onClick={signOut}>
        Cerrar sesión
      </button>
    </div>
  );
}


export default DashboardPage;