type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div>
      <p>---This is Content Layout---</p>
      <h2>Title: {title}</h2>
      <h3>{children}</h3>
    </div>
  );
};
