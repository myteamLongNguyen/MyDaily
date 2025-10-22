import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  id: string;
}

export default function ToastComponent(props: Props) {
  const { id } = props;

  return (
    <ToastContainer
      key={id}
      hideProgressBar
      autoClose={3000}
      transition={Slide}
      position="bottom-left"
    />
  );
}
