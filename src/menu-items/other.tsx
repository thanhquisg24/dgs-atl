// assets
import { IconBrandChrome, IconHelp } from "@tabler/icons";

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "sport-mapping-page",
      title: "Sport Mapping",
      type: "collapse",
      icon: icons.IconBrandChrome,
      children: [
        {
          id: "sport-page-list",
          title: "List sport mapping",
          type: "item",
          url: "/sport-page-list",
          breadcrumbs: false,
        },
        {
          id: "sport-page-add",
          title: "Add sport mapping",
          type: "item",
          url: "/sport-page-add",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "league-page",
      title: "League Mapping",
      type: "collapse",
      icon: icons.IconBrandChrome,
      children: [
        {
          id: "league-page-list",
          title: "List league mapping",
          type: "item",
          url: "/league-page-list",
          breadcrumbs: false,
        },
        {
          id: "league-page-add",
          title: "Add league mapping",
          type: "item",
          url: "/league-page-add",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "feed-page",
      title: "Feed",
      type: "collapse",
      icon: icons.IconBrandChrome,
      children: [
        {
          id: "feed-page",
          title: "Manager",
          type: "item",
          url: "/feed-page",
          breadcrumbs: false,
        },
        {
          id: "feed-history",
          title: "History",
          type: "item",
          url: "/feed-page-history",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default other;
