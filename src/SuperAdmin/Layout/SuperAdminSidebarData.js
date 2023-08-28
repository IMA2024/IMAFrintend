import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp, AiOutlineUserAdd, AiOutlineEye, AiOutlineShoppingCart, AiFillWechat  } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle,BiUserCircle, BiSolidBusiness, BiCartAdd} from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlinePayments } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

export const SuperAdminSideBarData = [
  { name: "Dashboard", link: "/Dashboard", Icon: AiOutlineDashboard },
  {
    name: "Users", Icon: BiUserCircle,
    subLink: [
      { name: "Add User", link: "/AddUser", Icon: AiOutlineUserAdd },
      { name: "View Users", link: "/ViewUser", Icon: FiUsers },
    ],
  },
  {
    name: "Businesses", Icon: BiSolidBusiness,
    subLink: [
      { name: "Add Business", link: "/AddBusiness", Icon: IoMdAddCircleOutline },
      { name: "View Business", link: "/ViewBusiness", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Subscription", Icon: AiOutlineShoppingCart,
    subLink: [
      { name: "Add Subscription", link: "/AddSubscription", Icon: BiCartAdd },
      //{ name: "Edit Subscription", link: "/EditSubscription", Icon: BiCartAdd },
      { name: "View Subscription", link: "/ViewSubscription", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Accounting", Icon: AiOutlineShop,
    subLink: [
      { name: "Add Revenue", link: "/AddRevenue", Icon: AiOutlineUserAdd },
      { name: "View Revenue", link: "/ViewRevenue", Icon: AiOutlineEye },
      { name: "Add Expense", link: "/AddExpense", Icon: AiOutlineUserAdd },
      { name: "View Expense", link: "/ViewExpense", Icon: AiOutlineEye },
      { name: "View Profit", link: "/ViewProfit", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Payment", Icon: MdOutlinePayments,
    subLink: [
      { name: "View Payment", link: "/ViewPayment", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Chat", Icon: AiFillWechat,
    subLink: [
      { name: "View Chats", link: "/Chat", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Settings", Icon: AiOutlineSetting,
    subLink: [
      { name: "Settings", link: "/Settings", Icon: AiOutlineEye },
    ],
  },
  
  { name: "Services", link: "/Services", Icon: BiChat },
  { name: "Contact Us", link: "/ContactUs", Icon: AiOutlineSetting },
  { name: "FAQs", link: "/Faq", Icon: BiHelpCircle },

];
