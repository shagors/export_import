import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import Export from "./Export";
import Import from "./Import";

const Dashboard = () => {
  return (
    <>
      <DashboardSidebar>
        <Export />
        <Import />
      </DashboardSidebar>
    </>
  );
};

export default Dashboard;
