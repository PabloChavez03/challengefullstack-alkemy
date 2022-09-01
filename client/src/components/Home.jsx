import React from "react";
import Transactions from "./Transactions";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <div className="">
                <h2 className="text-xs">Imagen de perfil</h2>
              </div>
              <div className="flex flex-col">
                <h2>Hi pablin</h2>
                <h1 className="font-bold">Welcome Back</h1>
              </div>
            </div>
          </div>
          <div>
            <h2>Logout</h2>
          </div>
        </div>
        <div className="">
          <h1>$1000</h1>
        </div>
      </div>
      <div className="flex bg-pink-400">
        <div>
          <h1>Añadir</h1>
        </div>
      </div>
        <Transactions />
    </div>
  );
}
