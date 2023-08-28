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
    },
    colors: {
      text: "#000000",
      subHeader: "#707070",
      mainBackground: "#F7F7F8",
      subBackground: "#E4E8ED",
      ctaBtn: "#5BC7FA",
      activeBtn: "#D9D9D9",
      newDocBtnText: "#FFFFFF",
      newDocBtn: "#2396ED",
      billingActive: "#21A366",
    },
  },
  plugins: [],
};
export default config;
