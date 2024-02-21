import React from "react";
import DBHeader from "./DBHeader";
import { Route, Routes } from "react-router-dom";
import DBHome from "./DBHome";
import DBOrders from "./DBOrders";
import DBAddNewItems from "./DBAddNewItems";
import DBItems from "./DBItems";
import DBUsers from "./DBUsers";

const DBRightSection = () => {
  return (
    <div className="flex flex-1 h-full py-4 px-2 flex-col">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/addnewitems" element={<DBAddNewItems />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
