import React from "react";
import HeroBanner from "../elements/HeroBanner";
import Layout from "../Layout"
import NavBar from "../layout/NavBar";
import ReviewerGrid from "../layout/ReviewerGrid";
import SubNav from "../layout/SubNav";

export default function LayoutHome({ children }) {

  return (
    <div>
      {/* <NavBar /> */}
      <HeroBanner />
      <SubNav />
      <ReviewerGrid />
      {children}
    </div>
  )
}