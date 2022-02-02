import { Carousel } from "react-responsive-carousel";
import { api } from "../../constants/global";

const ModalImages = ({event, closeModalImages}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-3 border-solid border-blueGray-200 rounded-t">
              <h3 className="text-1xl font-semibold self-center dark:text-gray-100">
                Imagenes del Evento
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-gray-900 dark:text-gray-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModalImages}
              >
                <span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            <div className="relative flex-auto">
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg flex">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <Carousel
                    autoPlay
                    width={500}
                    dynamicHeight={20}
                    thumbWidth={35}
                  >
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url1}
                        alt={api + JSON.parse(event.images).url1}
                      />
                      <p className="legend">Selfie del Conductor</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url2}
                        alt={api + JSON.parse(event.images).url2}
                      />
                      <p className="legend">Extintor</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url3}
                        alt={api + JSON.parse(event.images).url3}
                      />
                      <p className="legend">Delantero Izquierdo</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url4}
                        alt={api + JSON.parse(event.images).url4}
                      />
                      <p className="legend">Delantero Derecho</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url5}
                        alt={api + JSON.parse(event.images).url5}
                      />
                      <p className="legend">Posterior Izquiera</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url6}
                        alt={api + JSON.parse(event.images).url6}
                      />
                      <p className="legend">Posterior Derecha</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url7}
                        alt={api + JSON.parse(event.images).url7}
                      />
                      <p className="legend">Toma frontal de la unidad</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url8}
                        alt={api + JSON.parse(event.images).url8}
                      />
                      <p className="legend">Toma posterior de la unidad</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url9}
                        alt={api + JSON.parse(event.images).url9}
                      />
                      <p className="legend">Luces delanteras</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url10}
                        alt={api + JSON.parse(event.images).url10}
                      />
                      <p className="legend">Luces posteriores</p>
                    </div>
                    <div>
                      <img
                        src={api + JSON.parse(event.images).url11}
                        alt={api + JSON.parse(event.images).url11}
                      />
                      <p className="legend">Valvula interna</p>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalImages
