import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Grid2 } from "@mui/material";

export default function Layout() {
  return (
    <Grid2
      container
      direction={"column"}
      className="min-h-screen bg-orange-300  text-cyan-800    "
    >
      <Grid2>
        <Navbar />
      </Grid2>

      <Grid2
        className=" py-[3%]    !grow  h-0 overflow-auto "
        alignSelf={"stretch"}
        justifySelf={"center"}
        container
      >
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
