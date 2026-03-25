import { extendTheme } from "@mui/joy/styles";

const themeConfig = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#228be6",
          solidHoverBg: "#1c7ed6",
          solidActiveBg: undefined,
          softColor: "#228be6",
          softBg: "rgba(231, 245, 255, 1)",
          softHoverBg: "rgba(208, 235, 255, 0.65)",
          softActiveBg: undefined,
          outlinedColor: "#228be6",
          outlinedBorder: "#228be6",
          outlinedHoverBg: "rgba(231, 245, 255, 0.35)",
          outlinedHoverBorder: undefined,
          outlinedActiveBg: undefined,
        },
        warning: {
          solidColor: "#000",
          solidBg: "#ffc107",
          solidBorder: "#ffc107",
          solidHoverBg: "#ffca2c",
          solidHoverBorder: "#ffc720",
          solidActiveBg: "#ffcd39",
          solidActiveBorder: "#ffc720",
          solidDisabledBg: "#ffc107",
          solidDisabledBorder: "#ffc107",
        },
        danger: {
          solidBg: "#dc3545",
          solidBorder: "#dc3545",
          solidHoverBg: "#bb2d3b",
          solidHoverBorder: "#b02a37",
          solidActiveBg: "#b02a37",
          solidActiveBorder: "#a52834",
          solidDisabledBg: "#dc3545",
          solidDisabledBorder: "#dc3545",
        },
        success: {
          solidBg: "#198754",
          solidBorder: "#198754",
          solidHoverBg: "#157347",
          solidHoverBorder: "#146c43",
          solidActiveBg: "#146c43",
          solidActiveBorder: "#13653f",
          solidDisabledBg: "#198754",
          solidDisabledBorder: "#198754",
        },
      },
    },
  },
  fontFamily: {
    body: "IBM Plex Sans Thai,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  },
  // focus: {
  //   default: {
  //     outlineWidth: '2px',
  //     outlineOffset: '2px',
  //     outlineColor: '#339af0',
  //   },
  // },
  // components: {
  //   JoyButton: {
  //     styleOverrides: {
  //       root: ({ ownerState }) => ({
  //         transition: 'initial',
  //         borderRadius: '4px',
  //         fontWeight: 600,
  //         ...(ownerState.size === 'md' && {
  //           minHeight: '36px',
  //           fontSize: '14px',
  //           paddingInline: '18px',
  //         }),
  //         '&:active': {
  //           transform: 'translateY(1px)',
  //         },
  //       }),
  //     },
  //   },
  // },
});

export default themeConfig;
