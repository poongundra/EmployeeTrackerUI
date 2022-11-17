import { Counter } from "./components/Counter";
import Employee from "./components/Employee/Employee";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
        index: true,
        element: <Employee />
  },
  {
    path: '/counter',
    element: <Counter />
  },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
];

export default AppRoutes;
