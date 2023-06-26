import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
    surfshark: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Privasim v3.5 Alpha",
  description: "Create Engaging Data Flows in just seconds",
  mainNav: [
    // {
    //   title: "Credentials",
    //   href: "/credentials",
    // },
  ],
  links: {
    twitter: "https://twitter.com/Privasim",
    github: "https://github.com/fraserxu/diagram-gpt",
    surfshark: "https://get.surfshark.net/aff_c?offer_id=6&aff_id=8844",
  },
};
