import { TopNavBar } from "./components/TopNavBar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <div>
    <TopNavBar />
    {/* <SideNavBar /> */}
    <h3 className="text-center">---This is Main Layout---</h3>
    
    <main>{children}</main>
  </div>;
};
