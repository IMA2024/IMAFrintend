import { AiOutlineDashboard } from "react-icons/ai";

export const sideBarData = [
  { name: "Dashboard", link: "/Dashboard", Icon: AiOutlineDashboard },
  {
    name: "Business",
    subLink: [
      { name: "Add Business", link: "/AddBusiness" },
      { name: "View Business", link: "/ViewBusiness" },
      
    ],
  },
  {
    name: "Business2",
    subLink: [
      { name: "Add Business2", link: "/AddBusiness" },
      { name: "View Business2", link: "/ViewBusiness" },
    ],
  },
  { name: "Services", link: "/Services" },
];
