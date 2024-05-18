import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Topbar";
import HomePage from "../../pages/HomePage";
import PortfolioPage from "../../pages/PortfolioPage";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  </Container>
);

export default Content;
