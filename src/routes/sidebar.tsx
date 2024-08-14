type IconName = "home" | "users" | "laptop" | "building" | "exclamation-circle";

interface Route {
  path: string;
  name: string;
  icon: IconName;
  roles: string[];
}

const routes: Route[] = [
  {
    path: "/app/dashboard",
    name: "Dashboard",
    icon: "home",
    roles: ["Sysadmin", "Staff", "User"],
  },
];

export default routes;
