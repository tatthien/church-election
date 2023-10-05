import { Box } from "@mantine/core";
import { AppHeader } from "@/components";

import classes from "./AppLayout.module.css";

interface AppLayoutProps {
  children: React.ReactChild;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box className={classes.layout}>
      <AppHeader />
      <Box component="main" className={classes.main}>
        {children}
      </Box>
    </Box>
  );
}
