import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png"

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Helmet>
        <title>Solgas - 404</title>
        <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      </Helmet>
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-600 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Página no encontrada
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              La página que estás buscando no existe.
            </p>
            <Link
              to="/events"
              className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;