import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp, AiOutlineUserAdd, AiOutlineEye, AiOutlineShoppingCart  } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle,BiUserCircle, BiSolidBusiness, BiCartAdd} from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlinePayments } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

export const BusinessSideBarData = [
  { name: "Dashboard", link: "/Dashboard", Icon: AiOutlineDashboard },
  {
    name: "Business", Icon: BiSolidBusiness,
    subLink: [
      { name: "My Business", link: "/BusinessPanel/BusinessAdd", Icon: BiSolidBusiness },
      { name: "Add Business", link: "/BusinessPanel/BusinessAdd", Icon: AiOutlineUserAdd },
      { name: "View Business", link: "/BusinessPanel/BusinessView", Icon: AiOutlineEye  },    
    ],
  },
  {
    name: "Subscription", Icon: AiOutlineShoppingCart,
    subLink: [
      { name: "Buy Subscription", link: "/BusinessPanel/BuySubscription", Icon: BiCartAdd },
      { name: "View Subscription", link: "/BusinessPanel/ViewBusinessSubscription", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Accounting", Icon: AiOutlineShop,
    subLink: [
      { name: "Add Revenue", link: "/BusinessPanel/BusinessPanelAddRevenue", Icon: AiOutlineUserAdd },
      { name: "View Revenue", link: "/ViewBusiness", Icon: AiOutlineEye },
      { name: "Add Expense", link: "/ViewBusiness", Icon: AiOutlineUserAdd },
      { name: "View Expense", link: "/ViewBusiness", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Payment", Icon: MdOutlinePayments,
    subLink: [
      { name: "Add Payment", link: "/AddBusiness", Icon: AiOutlineUserAdd },
      { name: "View Payment", link: "/ViewBusiness", Icon: AiOutlineEye },
    ],
  },
  { name: "Services", link: "/Services" },
];
