import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        regular: "400",
        semiBold: "600",
        bold: "700",
        italic: "italic",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      subHeader: "#707070",
      darkGray: "#4F4F4F",
      mainBackground: "#F7F7F8",
      subBackground: "#E4E8ED",
      ctaBtn: "#5BC7FA",
      activeBtn: "#D9D9D9",
      newDocBtnText: "#FFFFFF",
      newDocBtn: "#2396ED",
      billingActive: "#21A366",
      red: "#FF0000",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      graydark: "#273444",
      gray: "#8492a6",
      graylight: "#d3dce6",
    },
  },
  plugins: [],
};
export default config;
