import { HomePage } from "@/components/home-page";
import { getHomepageData } from "@/lib/content";

export default function Page() {
  const data = getHomepageData();
  return <HomePage data={data} />;
}
