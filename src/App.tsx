import { RouterProvider } from "react-router-dom"
import { Routes } from "./routes/Routing"

export default function App() {
  return (
    <RouterProvider router={Routes}/>
  )
}
