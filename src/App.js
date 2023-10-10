import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/AuthPages/useAuth";
import { useEffect } from "react";
import { store } from "./Redux/stores";
import { Provider } from "react-redux";
function App()
{
  useEffect(() => {
    localStorage.setItem(
      "admin",
      JSON.stringify([{ email: "admin@iamneo.ai", password: "qwedsa" }])
    );
  }, []);
  return (
    <AuthProvider>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Provider store={store}>
          <HomePage />
        </Provider>
      </div>
    </AuthProvider>
  );
}
export default App;
