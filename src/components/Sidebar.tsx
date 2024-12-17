import React from "react";
import { Box } from "@chakra-ui/react";

import { AvatarBox } from "./AvatarBox";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

interface SidebarProps {
  collapse: boolean;
  onCollapse: (collapse: boolean) => void
}

export const Sidebar = ({ collapse, onCollapse }: SidebarProps) => (
  <React.Fragment>
    <Box w="full">
      <Logo collapse={collapse} onCollapse={onCollapse} />
      <Navigation collapse={collapse} />
    </Box>
    <AvatarBox collapse={collapse} />
  </React.Fragment>
);
