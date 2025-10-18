import { Box } from "@mantine/core";

import classes from "./AppLayout.module.css";
import { MainNav } from "../MainNav";

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box className={classes.layout}>
      <Box component="main" className={classes.main}>
        <MainNav />
        {children}
      </Box>
    </Box>
  );
}
