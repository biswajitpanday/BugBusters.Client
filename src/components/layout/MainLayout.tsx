import { TopNavBar } from "./components/TopNavBar";


type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <TopNavBar />
      {/* <SideNavBar /> */}
      <main className="mt-3">{children}</main>
    </>
  );
};
