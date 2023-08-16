import {
    CalendarEvent,
    CalendarTime,
    LayoutDashboard,
    Power,
    Report,
    Settings,
    Users,
  } from "tabler-icons-react";

  export const SuperAdminData = [
    {
      label: "AddExpense",
      icon: LayoutDashboard,
      link: "/AddExpense",
    },
    {
      label: "AddRevenue",
      icon: Users,
      links: [{ label: "AddExpense", link: "/AddExpense" }],
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