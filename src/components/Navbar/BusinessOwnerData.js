import {
    CalendarEvent,
    CalendarTime,
    LayoutDashboard,
    Power,
    Report,
    Settings,
    Users,
  } from "tabler-icons-react";

  export const BusinessOwnerData = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/Dashboard",
    },
    {
      label: "Services",
      icon: Users,
      links: [{ label: "Services", link: "/Services" }],
    },
    {
      label: "Appointment",
      icon: CalendarEvent,
      links: [
        {
          label: "Contact Us",
          link: "/ContactUs",
        },
        { label: "Faq",
          link: "/Faq"
        },
      ],
    },
  ];

  export const bottom = [
    { label: "Reviews", icon: Settings, link: "/Reviews" },
    {
      label: "Log Out",
      link: "/Reviews",
      icon: Power,
    },
  ];