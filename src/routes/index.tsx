import Dashboard from "../pages/Dashboard";
import Page404 from "../pages/Page404";

interface Route {
  path: string;
  component: React.ComponentType;
  roles: string[];
  title: string;
}

const routes: Route[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    roles: ["Sysadmin", "Staff", "User"],
    title: "Dashboard",
  },
  {
    path: "/404",
    component: Page404,
    roles: ["admin", "member", "customer"],
    title: "404 Page",
  },
];

export default routes;
