import "../globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Image Editor - Next Js || Tailwind CSS",
  description: "Image Editor",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-primaryBlack ${inter.className}`}>
        <>
          <ToastContainer />
          {children}
        </>
      </body>
    </html>
  );
}
