const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <main className="">{children}</main>
    </div>
  );
};

export default DashboardLayout;
