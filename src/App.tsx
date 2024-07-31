import { useLocation } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { Footer, Navbar } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./secret/config";
import { paths } from "./consts/index.ts";

function App() {
  const location = useLocation();

  const isPrivatePath =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/instructor") ||
    location.pathname.includes(paths.LOGIN) ||
    location.pathname.includes(paths.REGISTER) ||
    location.pathname.includes('/course/lesson')

  const clientId = config.GOOGLE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        {!isPrivatePath && <Navbar />}
        <AppRouter />
        {!isPrivatePath && <Footer />}
      </GoogleOAuthProvider>
    </>
  );
}
export default App;
