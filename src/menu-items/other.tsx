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
    // {
    //   id: "feed-page",
    //   title: "Feed Page",
    //   type: "item",
    //   url: "/feed-page",
    //   icon: icons.IconBrandChrome,
    //   breadcrumbs: false,
    // },
    {
      id: "sample-page",
      title: "Sample Page",
      type: "item",
      url: "/sample-page",
      icon: icons.IconBrandChrome,
      breadcrumbs: false,
    },
    {
      id: "documentation",
      title: "Documentation",
      type: "item",
      url: "https://codedthemes.gitbook.io/berry/",
      icon: icons.IconHelp,
      external: true,
      target: true,
    },
  ],
};

export default other;
