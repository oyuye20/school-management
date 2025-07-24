import React from "react";
import Sidebar from "../component_folder/sidebar";
import NavBar from "../component_folder/NavBar";

const Teachers = () => {
  return (
    <>
      <div className="bg-[#D4F0CF] h-dvh flex">
        <Sidebar />

        {/* MAIN MENU CARD */}
        <div className="main grow overflow-auto">
          <NavBar />
        </div>
      </div>
    </>
  );
};

export default Teachers;
