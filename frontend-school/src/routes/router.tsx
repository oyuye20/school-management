import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import TableLists from "../pages/TableLists";
import Settings from "../pages/Settings";
import Teachers from "../pages/Teachers";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/home',
    element: <Home />
  },

  {
    path: '/dashboard',
    element: <Dashboard />
  },

  {
    path: '/lists',
    element: <TableLists />
  },

  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/teachers',
    element: <Teachers />
  },

  
])
