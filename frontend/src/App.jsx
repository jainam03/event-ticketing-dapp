import React from "react";
import { AppRoutes } from "./routes";
import './App.css'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-indigo-700 tracking-tight">Event Ticketing DApp</span>
        </div>
        <span className="text-sm text-gray-500">Powered by Web3</span>
      </header>
      <main className="flex-1 flex justify-center items-start py-8">
        <div className="w-full max-w-2xl mx-auto">
          <AppRoutes />
        </div>
      </main>
    </div>
  )
}

export default App;