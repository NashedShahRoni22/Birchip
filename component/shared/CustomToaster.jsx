import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            background: "#F0F9FF",
            color: "#1E7B3C",
            borderRadius: "12px",
            padding: "12px 16px",
            fontWeight: 500,
            border: "1px solid #A7F3D0",
            boxShadow: "0 4px 12px rgba(30, 123, 60, 0.15)",
          },
          iconTheme: {
            primary: "#1E7B3C",
            secondary: "#F0F9FF",
          },
        },
        error: {
          style: {
            background: "#FEF2F2",
            color: "#C53030",
            borderRadius: "12px",
            padding: "12px 16px",
            fontWeight: 500,
            border: "1px solid #FCA5A5",
            boxShadow: "0 4px 12px rgba(197, 48, 48, 0.15)",
          },
          iconTheme: {
            primary: "#C53030",
            secondary: "#FEF2F2",
          },
        },
        warning: {
          style: {
            background: "#FFFBEB",
            color: "#D97706",
            borderRadius: "12px",
            padding: "12px 16px",
            fontWeight: 500,
            border: "1px solid #FDE68A",
            boxShadow: "0 4px 12px rgba(217, 119, 6, 0.15)",
          },
          iconTheme: {
            primary: "#D97706",
            secondary: "#FFFBEB",
          },
        },
        info: {
          style: {
            background: "#F0F4FF",
            color: "#903F5C",
            borderRadius: "12px",
            padding: "12px 16px",
            fontWeight: 500,
            border: "1px solid #C7B8E8",
            boxShadow: "0 4px 12px rgba(144, 63, 92, 0.15)",
          },
          iconTheme: {
            primary: "#903F5C",
            secondary: "#F0F4FF",
          },
        },
        loading: {
          style: {
            background: "#903F5C",
            color: "#FFFFFF",
            borderRadius: "12px",
            padding: "12px 16px",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(144, 63, 92, 0.25)",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#903F5C",
          },
        },

        default: {
          style: {
            background: "#F8FAFC",
            color: "#334155",
            borderRadius: "12px",
            padding: "12px 16px",
            fontWeight: 500,
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 12px rgba(51, 65, 85, 0.1)",
          },
          iconTheme: {
            primary: "#334155",
            secondary: "#F8FAFC",
          },
        },
      }}
    />
  );
}
