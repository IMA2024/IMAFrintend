import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp, AiOutlineUserAdd, AiOutlineEye, AiOutlineShoppingCart, AiFillWechat  } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle,BiUserCircle, BiSolidBusiness, BiCartAdd} from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlinePayments, MdQuestionAnswer } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

export const BusinessSideBarData = [
  { name: "Dashboard", link: "/BusinessPanelDashboard", Icon: AiOutlineDashboard },
  {
    name: "Businesses", Icon: BiSolidBusiness,
    subLink: [
      { name: "Add Business", link: "/BusinessAdd", Icon: AiOutlineUserAdd },
      { name: "View Business", link: "/BusinessView", Icon: AiOutlineEye  },    
    ],
  },
  {
    name: "Business Questionnaires", Icon: MdQuestionAnswer,
    subLink: [
      { name: "Add Questionnaire", link: "/AddQuestionnaire", Icon: AiOutlineUserAdd },
      { name: "View Questionnaire", link: "/ViewQuestionnaire", Icon: AiOutlineEye  },    
    ],
  },
  {
    name: "System Agents", Icon: BiUserCircle,
    subLink: [
      { name: "Configure Agents", link: "/ConfigureAgents", Icon: AiOutlineUserAdd },
      { name: "View Agents", link: "/AgentsView", Icon: AiOutlineEye  },    
    ],
  },
  {
    name: "Subscription", Icon: AiOutlineShoppingCart,
    subLink: [
      { name: "Buy Subscription", link: "/BuySubscription", Icon: BiCartAdd },
      { name: "View Subscription", link: "/ViewBusinessSubscription", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Accounting", Icon: AiOutlineShop,
    subLink: [
      { name: "Add Revenue", link: "/BusinessPanelAddRevenue", Icon: AiOutlineUserAdd },
      { name: "View Revenue", link: "/BusinessPanelViewRevenue", Icon: AiOutlineEye },
      { name: "Add Expense", link: "/BusinessPanelAddExpense", Icon: AiOutlineUserAdd },
      { name: "View Expense", link: "/BusinessPanelViewExpense", Icon: AiOutlineEye },
      { name: "View Profit", link: "/BusinessPanelViewProfit", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Payment", Icon: MdOutlinePayments,
    subLink: [
      { name: "View Payment", link: "/BusinessPanelViewPayment", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Chat", Icon: AiFillWechat,
    subLink: [
      { name: "Start Chats", link: "/ChatBusinessOwner", Icon: AiOutlineEye },
    ],
  },
  {
    name: "FAQs", Icon: BiHelpCircle,
    subLink: [
      { name: "View FAQs", link: "/BusinessOwnerViewFaqs", Icon: AiOutlineEye },
    ],
  },
  { name: "Services", Icon: MdOutlinePayments,
  subLink: [
    { name: "View Services", link: "/ServicesBO", Icon: AiOutlineEye },
  ],
 },
  {
    name: "Settings", Icon: AiOutlineSetting,
    subLink: [
      { name: "View Settings", link: "/Settings", Icon: AiOutlineEye },
    ],
  },

  {
    name: "Terms & Conditions", Icon: BiHelpCircle,
    subLink: [
     // { name: "Add FAQ", link: "/FaqForm", Icon: AiOutlineUserAdd },
      { name: "View Terms", link: "/ViewTerms", Icon: AiOutlineEye },
    ],
  },

  {
    name: "Rules & Regulations", Icon: BiHelpCircle,
    subLink: [
     // { name: "Add FAQ", link: "/FaqForm", Icon: AiOutlineUserAdd },
      { name: "View Rules", link: "/ViewRules", Icon: AiOutlineEye },
    ],
  },
  
];
