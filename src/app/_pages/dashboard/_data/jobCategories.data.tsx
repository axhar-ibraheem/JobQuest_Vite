import { JSX } from "react";
import { FaLaptopCode, FaShoppingBag, FaTools } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { TiThSmall } from "react-icons/ti";

export interface JobCategory {
  category: string;
  icon: JSX.Element;
}

export const jobCategories: JobCategory[] = [
  { category: "all", icon: <TiThSmall className="text-2xl text-cyan-700" /> },
  {
    category: "development",
    icon: <FaLaptopCode className="text-2xl text-cyan-700" />,
  },
  {
    category: "design",
    icon: <MdDesignServices className="text-2xl text-cyan-700" />,
  },
  {
    category: "marketing",
    icon: <HiSpeakerphone className="text-2xl text-cyan-700" />,
  },
  {
    category: "business",
    icon: <FaShoppingBag className="text-2xl text-cyan-700" />,
  },
  { category: "support", icon: <FaTools className="text-2xl text-cyan-700" /> },
];
