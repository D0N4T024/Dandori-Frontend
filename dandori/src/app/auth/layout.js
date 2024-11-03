import CommonLayout from "../layout";

export const metadata = {
  title: "Dandori - Autentificacion",
  description: "Dandori - Autentificacion",
};

export default function AuthLayout({ children }) {
  return (
    <CommonLayout>
      {children}
    </CommonLayout>
  );
}
