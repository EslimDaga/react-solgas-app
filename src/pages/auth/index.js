import { useState } from "react"
import { CenterLogo,LogoImage } from "../../components/common/Logo";
import BackgroundImage from "../../assets/images/background-solgas.jpeg";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import "../../assets/styles/css/auth/style.css";

const AuthPage = () => {

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShow(passwordShow ? false : true);
  }

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-login"
            style={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <CenterLogo>
                      <LogoImage/>
                    </CenterLogo>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-gray-700 text-base font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nombre de Usuario
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring w-full"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-gray-700 text-base font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Contraseña
                        </label>
                        <input
                          type={passwordShow ? "text" : "password"}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring w-full"
                          style={{ transition: "all .15s ease" }}
                        />
                        <div onClick={togglePasswordVisibility}>
                          {passwordShow ? <EyeIcon className="h-5 w-5 text-dark-500 float-right relative bottom-8 right-3"/> : <EyeOffIcon className="h-5 w-5 text-dark-500 float-right relative bottom-8 right-3"/>}
                        </div>
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-base font-semibold text-gray-700">
                            Mantenme conectado
                          </span>
                        </label>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AuthPage;