import CommonLayout from "../layout";
import Toast from "@/components/CustomizedSnackbars";

export const metadata = {
  title: "Dandori - Autentificacion",
  description: "Dandori - Autentificacion",
};

export default function AuthLayout({ children }) {
  return (
    <CommonLayout>
      {children}
      <Toast/>
    </CommonLayout>
  );
}
