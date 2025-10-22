import { ReactNode } from "react";
import Footer from "../../components/footer";

interface BlankLayoutProps {
  children: ReactNode;
}

export default function BlankLayout(props: BlankLayoutProps) {
  const { children } = props;

  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
