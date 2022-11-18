import { Counter } from "./components/Counter";
import Employee from "./components/Employee/Employee";
import Onboarding from "./components/Employee/Onboarding";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
        index: true,
        element: <Employee />
  },
  {
      path: '/onboarding',
      element: <Onboarding />
  },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
];

export default AppRoutes;
