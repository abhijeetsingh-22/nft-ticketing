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
  HomeIcon
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
          active: pathname.includes("/events"),
          icon: SquarePen,
          submenus: [
            // {
            //   href: "/posts",
            //   label: "All Posts",
            //   active: pathname === "/posts"
            // },
            // {
            //   href: "/posts/new",
            //   label: "New Post",
            //   active: pathname === "/posts/new"
            // }
          ]
        },
        {
          href: `/${userId}/tickets`,
          label: "My Tickets",
          active: pathname.includes("/tickets"),
          icon: Bookmark,
          submenus: []
        },
        // {
        //   href: "/tags",
        //   label: "My Profile",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        //   submenus: []
        // }
      ]
    },
    {
      groupLabel: "Upcoming Events",
      menus: [
        // {
        //   href: "/users",
        //   label: "Users",
        //   active: pathname.includes("/users"),
        //   icon: Users,
        //   submenus: []
        // },
        {
          href: "/events",
          label: "All Events",
          active: pathname.includes("/events"),
          icon: CalendarSearch,
          submenus: []
        }
      ]
    },
    // {
    //   groupLabel: "",
    //   menus: [
    //     // {
    //     //   href: "/users",
    //     //   label: "Users",
    //     //   active: pathname.includes("/users"),
    //     //   icon: Users,
    //     //   submenus: []
    //     // },
    //     {
    //       href: "/profile",
    //       label: "Profile",
    //       active: pathname.includes("/profile"),
    //       icon: Settings,
    //       submenus: []
    //     }
    //   ]
    // }
  ];
}
