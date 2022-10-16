import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import RequireAuth from "./RequireAuth";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("../views/dashboard/Default")));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import("../views/utilities/Typography")));
const UtilsColor = Loadable(lazy(() => import("../views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(lazy(() => import("../views/utilities/MaterialIcons")));
const UtilsTablerIcons = Loadable(lazy(() => import("../views/utilities/TablerIcons")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));
const FeedPage = Loadable(lazy(() => import("../views/feed-page")));
const FeedHistoryPage = Loadable(lazy(() => import("../views/feed-page/history")));
const ListLeagueMapping = Loadable(lazy(() => import("../views/league-mapping-page/list")));
const AddLeagueMapping = Loadable(lazy(() => import("../views/league-mapping-page/add")));
const EditLeagueMapping = Loadable(lazy(() => import("../views/league-mapping-page/edit")));

const ListSportMapping = Loadable(lazy(() => import("../views/sport-mapping-page/list")));
const AddSportMapping = Loadable(lazy(() => import("../views/sport-mapping-page/add")));
const EditSportMapping = Loadable(lazy(() => import("../views/sport-mapping-page/edit")));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  element: (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  ),
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "util-typography",
          element: <UtilsTypography />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "util-color",
          element: <UtilsColor />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "util-shadow",
          element: <UtilsShadow />,
        },
      ],
    },
    {
      path: "icons",
      children: [
        {
          path: "tabler-icons",
          element: <UtilsTablerIcons />,
        },
      ],
    },
    {
      path: "icons",
      children: [
        {
          path: "material-icons",
          element: <UtilsMaterialIcons />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "feed-page",
      element: <FeedPage />,
    },
    {
      path: "feed-page-history",
      element: <FeedHistoryPage />,
    },
    {
      path: "league-page-list",
      element: <ListLeagueMapping />,
    },
    {
      path: "league-page-add",
      element: <AddLeagueMapping />,
    },
    {
      path: "league-page-edit/:leagueId",
      element: <EditLeagueMapping />,
    },
    {
      path: "sport-page-list",
      element: <ListSportMapping />,
    },
    {
      path: "sport-page-add",
      element: <AddSportMapping />,
    },
    {
      path: "sport-page-edit/:id",
      element: <EditSportMapping />,
    },
  ],
};

export default MainRoutes;
