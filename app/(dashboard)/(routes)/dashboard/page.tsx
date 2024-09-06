import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
  return (
    <div className="flex justify-between p-4">
      <p className="text-4xl font-black">File.ai</p>
      <UserButton />
    </div>
  );
};

export default Dashboard;
