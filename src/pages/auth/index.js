import LoginForm from "../../components/auth/LoginForm";
import { CenterLogo,LogoImage } from "../../components/common/Logo";
import { CenterLogoDark, LogoImageDark } from "../../components/common/Logo-Dark";
import { ToastContainer } from "react-toastify";
import BackgroundImage from "../../assets/images/background-solgas.jpeg";
import Toggle from "../../utils/ThemeToggle";
import "../../assets/styles/css/auth/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../store/context/ThemeContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png";

const AuthPage = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Helmet>
        <title>Solgas - Login</title>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-login"
            style={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6 dark:bg-gray-900 bg-white rounded-md">
              <Toggle />
            </div>
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 dark:bg-gray-900 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    {theme === "light" ? (
                      <CenterLogo>
                        <LogoImage />
                      </CenterLogo>
                    ) : (
                      <CenterLogoDark>
                        <LogoImageDark />
                      </CenterLogoDark>
                    )}
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}

export default AuthPage;