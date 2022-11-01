// assets
import { IconDashboard, IconSettings } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconSettings };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "setting",
      title: "System Setting",
      type: "item",
      url: "/setting",
      icon: icons.IconSettings,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
