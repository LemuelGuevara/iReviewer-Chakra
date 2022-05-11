import { ComponentStyleConfig } from "@chakra-ui/theme";
import { extendTheme } from "@chakra-ui/react";

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "medium",
    fontsize: "sm",
    color: "white",
    // textTransform: 'uppercase',
    borderRadius: "xl", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  // sizes: {
  //   sm: {
  //     fontSize: 'sm',
  //     px: 4, // <-- px is short for paddingLeft and paddingRight // <-- py is short for paddingTop and paddingBottom
  //   },
  //   md: {
  //     fontSize: 'sm',
  //     size: 'xl',
  //     px: 4,
  //     // py: 1.5 // <-- these values are tokens from the design system // <-- these values are tokens from the design system
  //   },
  // },
  // Two variants: outline and solid
  variants: {
    "primary-md": {
      bg: "#00B0FF",
      boxShadow:
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)",
      _hover: { bg: "#70CBF7" },
      fontSize: "sm",
      h: "10",
      px: 6,
    },
    "primary-sm": {
      bg: "#00B0FF",
      boxShadow:
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)",
      _hover: { bg: "#70CBF7" },
      fontSize: "sm",
      h: "8",
    },
  },
};

const theme = extendTheme({
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  colors: {
    brand: {
      50: "#d8f9ff",
      100: "#abe8ff",
      200: "#7bd8ff",
      300: "#49c8ff",
      400: "#1ab8ff",
      500: "#009ee6",
      600: "#007bb4",
      700: "#005882",
      800: "#003651",
      900: "#001421",
    },
  },
  components: {
    Button,
  },
});

export default theme;
