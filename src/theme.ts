import { createTheme, Modal } from "@mantine/core";

export default createTheme({
  components: {
    Modal: Modal.extend({
      styles: (theme) => ({
        title: {
          fontWeight: 600,
          fontSize: theme.fontSizes.lg,
        },
      }),
    }),
  },
});
