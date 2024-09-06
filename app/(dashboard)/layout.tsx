const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:intset-y-0 z-[80] bg-gray-900">
        <div>History</div>
      </div>
      <main className="md:pl-72">{children}</main> //main content
    </div>
  );
};

export default DashboardLayout;
