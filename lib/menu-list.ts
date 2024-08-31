import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Plus,
  CalendarSearch,
  HomeIcon,
  QrCode,
  BugIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, userId: string): Group[] {
  return [
    // {
    //   groupLabel: "",
    //   menus: [
    //     {
    //       href: `/${userId}/events/new`,
    //       label: "Create New Event",
    //       active: pathname.includes("/"),
    //       icon: Plus,
    //       submenus: []
    //     }
    //   ]
    // },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: HomeIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Events",
      menus: [
        {
          href: `/${userId}/events`,
          label: "My Events",
          active: pathname.includes(`/${userId}/events`),
          icon: SquarePen,
          submenus: [

          ]
        },
        {
          href: `/${userId}/tickets`,
          label: "My Tickets",
          active: pathname.includes("/tickets"),
          icon: Bookmark,
          submenus: []
        },

        {
          href: "/events",
          label: "All Events",
          active: pathname == "/events",
          icon: CalendarSearch,
          submenus: []
        },
        {
          href: "/nft-details",
          label: "Get NFT Details",
          active: pathname.includes("/nft-details?nftAddress="),
          icon: Tag,
          submenus: []
        },
        {
          href: `/${userId}/ticket-validation`,
          label: "Ticket Validation",
          active: pathname.includes("/ticket-validation"),
          icon: QrCode,
          submenus: []
        },

        {
          href: "/report-issue",
          label: "Report a Bug",
          active: pathname.includes("/report-issue"),
          icon: BugIcon,
          submenus: []
        },

      ]
    },

  ];
}
