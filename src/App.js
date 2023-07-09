import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Layout />
    </>
  );
}

export default App;
