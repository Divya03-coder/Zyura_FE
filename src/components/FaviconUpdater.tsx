import { useGetSettingsQuery } from "@/store/features/adminDashboard/settings/settingApi";
import { useEffect } from "react";

const FaviconUpdater: React.FC = () => {
  const { data: settings } = useGetSettingsQuery();

  useEffect(() => {
    const faviconUrl = settings?.data?.favicon || "/logo.svg";

    let link: HTMLLinkElement | null =
      document.querySelector('link[rel="icon"]');

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }, [settings]);

  return null;
};

export default FaviconUpdater;
