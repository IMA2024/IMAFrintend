import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp, AiOutlineUserAdd, AiOutlineEye, AiOutlineShoppingCart, AiFillWechat  } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle,BiUserCircle, BiSolidBusiness, BiCartAdd} from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlinePayments } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

export const MarketingAgentSideBarData = [
  { name: "Dashboard", link: "/DashboardMA", Icon: AiOutlineDashboard },
 
  {
    name: "Agents", Icon: BiSolidBusiness,
    
    subLink: [
      { name: "Configure Agents", link: "/ConfigureAgentsMA", Icon: AiOutlineEye },
      { name: "View Agents", link: "/ViewAgentsMA", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Crawler", Icon: BiSolidBusiness,
    subLink: [
      { name: "Configure Crawler", link: "/ConfigureCrawlerMA", Icon: AiOutlineEye },
    ],
  },
  /*
  {
    name: "Business", Icon: BiSolidBusiness,
    subLink: [
      { name: "Business", link: "/ViewBusiness", Icon: AiOutlineEye },
    ],
  },
  */
  {
    name: "Business Questionnaire", Icon: BiSolidBusiness,
    subLink: [
      { name: "Add Questionnaire", link: "/AddQuestionnaireMA", Icon: AiOutlineEye },
      { name: "View Questionnaire", link: "/ViewQuestionnaireMA", Icon: AiOutlineEye },
    ],
  },
  
  {
    name: "Execute Dialer", Icon: BiSolidBusiness,
    subLink: [
      { name: "Execute Dialer", link: "/ExecuteDialer", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Auto Dialer", Icon: BiSolidBusiness,
    subLink: [
      { name: "Execute AutoDialer", link: "/AutoDialer", Icon: AiOutlineEye },
    ],
  },
  {
    name: "Call Analytics", Icon: BiSolidBusiness,
    subLink: [
      { name: "View Call Analytics", link: "/ViewCallPriority", Icon: AiOutlineEye },
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
      { name: "Settings", link: "/SettingsMA", Icon: AiOutlineEye },
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
