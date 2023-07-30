import { TopNavBar } from "./components/TopNavBar";
import { SearchProvider } from "@/providers/SearchContext";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SearchProvider>
      <TopNavBar />
      {/* <SideNavBar /> */}
      <main className="mt-3">{children}</main>
    </SearchProvider>
  );
};
