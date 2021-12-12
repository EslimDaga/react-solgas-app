import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../service/auth";
import { CenterLogo,LogoImage } from "../../components/common/Logo";
import { EyeIcon, EyeOffIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { ToastContainer, toast } from "react-toastify";
import BackgroundImage from "../../assets/images/background-solgas.jpeg";
import "../../assets/styles/css/auth/style.css";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {

  const { register, handleSubmit, formState : { errors }} = useForm();

  const onSubmitForm = async (data) => {
    await login(data).then(res => {
      toast.success("😎 Bienvenido a Solgas", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(err => {
      toast.error("😟 Datos invalidos", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShow(passwordShow ? false : true);
  }

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div className="absolute top-0 w-full h-full bg-gray-900 bg-login"
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
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                      <div className="relative w-full mb-3">
                        <label
                          className={`block text-gray-700 text-base font-bold mb-2` + (errors.username ? " text-red-500" : "")}
                        >
                          Nombre de Usuario
                        </label>
                        <input
                          type="text"
                          name="username"
                          className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring w-full` + (errors.username ? " focus:border-2 border-rose-500 border-2 border-rose-500" : "")}
                          style={{ transition: "all .15s ease" }}
                          {...register("username", {
                            required: {
                              value: true,
                              message: "El nombre de usuario es requerido"
                            }
                          })}
                        />
                        {errors.username && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.username.message} <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1"/></span>}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className={`block text-gray-700 text-base font-bold mb-2` + (errors.password ? " text-red-500" : "")}
                        >
                          Contraseña
                        </label>
                        <input
                          type={passwordShow ? "text" : "password"}
                          name="password"
                          className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base shadow focus:outline-none focus:ring w-full` + (errors.password ? " focus:border-2 border-rose-500 border-2 border-rose-500" : "")}
                          style={{ transition: "all .15s ease" }}
                          {...register("password", {
                            required: {
                              value: true,
                              message: "La contraseña es requerida"
                            }
                          })}
                        />
                        {errors.password ? "" : <div onClick={togglePasswordVisibility}>
                          {passwordShow ? <EyeIcon className="h-5 w-5 text-dark-500 float-right relative bottom-8 right-3"/> : <EyeOffIcon className="h-5 w-5 text-dark-500 float-right relative bottom-8 right-3"/>}
                        </div>}
                        {errors.password && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.password.message} <ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1"/></span>}
                      </div>
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
                      <div className="text-center mt-6">
                        <button
                          className={`bg-gray-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full` + (errors.password || errors.username ? " opacity-50 cursor-not-allowed" : "")}
                          type="submit"
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
      <ToastContainer />
    </>
  )
}

export default AuthPage;