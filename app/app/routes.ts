import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), 
    route("route/register","routes/register.tsx"), 
    route("route/accounts","routes/accountlist.tsx")] satisfies RouteConfig; 
