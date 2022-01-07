import { BadgeCheckIcon } from "@heroicons/react/solid";

const ModalDetails = ({event}) => {
  return (
    <div className="relative p-5 flex-auto">
      <div className="w-full bg-gray-100 flex">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Operador Logistico
                    </p>
                    <p className="text-white font-bold">
                      {event.logistic_operator}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">Placa</p>
                    <p className="text-white font-bold">{event.unitid}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Tipo de Servicio
                    </p>
                    <p className="text-white font-bold">
                      {event.type_of_service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Fecha de Creación
                    </p>
                    <p className="text-white font-bold">{event.datetime}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Puntaje
                    </p>
                    <p className="text-white font-bold">{event.game_score}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Estado de Ruta
                    </p>
                    <p className="text-white font-bold">{event.route_status}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Conductor
                    </p>
                    <p className="text-white font-bold">
                      {event.driver_fullname}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:mt-0 gap-7 text-sm">
              <div className="bg-blue-900 flex justify-between items-center p-3 rounded-md shadow-sm">
                <div className="flex justify-start items-center gap-2">
                  <BadgeCheckIcon className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold tracking-wider">
                      Checkpoint
                    </p>
                    <p className="text-white font-bold">{event.checkpoint}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetails
