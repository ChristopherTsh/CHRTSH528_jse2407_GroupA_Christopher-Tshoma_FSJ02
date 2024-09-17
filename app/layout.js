import localFont from "next/font/local";
import "./globals.css";

/**
 * RootLayout component serves as the root layout for the application.
 *
 * This component is used to wrap the entire application and apply global styles and configurations.
 * It ensures that the application is rendered with the specified HTML structure and allows for
 * passing in child components.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout
 * @returns {JSX.Element} The RootLayout component
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
