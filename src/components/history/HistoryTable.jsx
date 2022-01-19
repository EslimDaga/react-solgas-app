import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import InputSearch from "../common/InputSearch";
import NoResultsFound from "../common/NoResultsFound";
import exportFromJSON from "export-from-json";

const HistoryTable = ({
  handleSubmit,
  onSubmitForm,
  control,
  errors,
  allUnits,
  search,
  onSearchChange,
  filteredEvents,
  openModal,
  openModalImages,
  loading,
  prevPage,
  nextPage,
  searchEvents,
  printEvents,
  nameFile,
}) => {
  const data = printEvents;
  const fileName = nameFile;
  const exportType = "xls";

  const ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="items-center pb-3 sm:relative lg:flex justify-between">
                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="mx-1 lg:flex"
                >
                  <div className="relative w-full md:w-full sm:mb-2">
                    <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                      Fecha Inicial
                    </label>
                    <div className="relative">
                      <Controller
                        as={ReactDatePicker}
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        name="initial_date"
                        className="input"
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <ReactDatePicker
                            className="bg-gray-200 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            selected={field.value}
                            //onChange={(date) => setStartDate(date)}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Seleccionar Fecha"
                          />
                        )}
                      />
                      {errors.initial_date && (
                        <span className="text-red-500 text-sm font-bold flex mt-1">
                          Este campo es requerido
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full sm:mb-2">
                    <label className="block text-gray-700 text-base font-bold mb-2 lg:ml-2">
                      Fecha Final
                    </label>
                    <div className="relative lg:ml-2">
                      <Controller
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        name="final_date"
                        className="input"
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <ReactDatePicker
                            className="bg-gray-200 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Seleccionar Fecha"
                          />
                        )}
                      />
                      {errors.final_date && (
                        <span className="text-red-500 text-sm font-bold flex mt-1">
                          Este campo es requerido
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full">
                    <label className="block text-gray-700 text-base font-bold mb-2 lg:ml-2">
                      Unidades
                    </label>
                    <div className="relative lg:ml-2">
                      <Controller
                        name="unit_name"
                        isClearable
                        rules={{
                          required: true,
                          message: "Este campo es requerido",
                        }}
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            {...field}
                            isClearable
                            placeholder="Buscar Unidad"
                            className="bg-gray-200 w-full rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            options={allUnits}
                          />
                        )}
                      />
                      {errors.unit_name && (
                        <span className="text-red-500 text-sm font-bold flex mt-1">
                          Este campo es requerido
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      `flex text-center self-center lg:ml-2 sm:mt-4 lg:mt-8` +
                      (errors.initial_date ||
                      errors.final_date ||
                      errors.unit_name
                        ? " self-center lg:mt-2"
                        : "")
                    }
                  >
                    <button
                      className={
                        `bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
                        (errors.initial_date ||
                        errors.final_date ||
                        errors.unit_name
                          ? " opacity-50 cursor-not-allowed"
                          : "")
                      }
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      <div className="inline-flex items-center">Enviar</div>
                    </button>
                    <button
                      disabled={searchEvents.length === 0 ? true : false}
                      className={
                        `bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
                        (searchEvents.length === 0
                          ? " opacity-50 cursor-not-allowed"
                          : "")
                      }
                      onClick={ExportToExcel}
                      style={{ transition: "all .15s ease" }}
                    >
                      <div className="inline-flex items-center">Exportar</div>
                    </button>
                  </div>
                </form>
                <div className="flex flex-col">
                  <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                    Buscar por Conductor
                  </label>
                  <InputSearch
                    search={search}
                    onSearchChange={onSearchChange}
                    label="Buscar..."
                  />
                </div>
              </div>
              <div className="bg-white">
                <div className="pt-1">
                  <div className="mx-auto flex items-center space-x-2 sm:px-3 lg:max-w-full lg:px-0">
                    <section className="antialiased text-gray-600 w-full">
                      <div className="flex flex-col justify-center">
                        <div className="w-full mx-auto bg-white rounded-lg">
                          <div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
                                  <div className="sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                      <thead className="bg-blue-900">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Proveedor
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Operador Logistico
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Placa
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Tipo de Servicio
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Checkpoint
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Nombre del Conductor
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Fecha de Creación
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
                                          >
                                            Ver detalles
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredEvents().map((event) => (
                                          <tr key={event.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.provider}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.logistic_operator}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.unitid}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.type_of_service}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.checkpoint}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.driver_fullname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              {event.datetime}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                              <Menu
                                                as="div"
                                                className="relative inline-block text-left"
                                              >
                                                <div>
                                                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-900">
                                                    Acción
                                                    <ChevronDownIcon
                                                      className="-mr-1 ml-2 h-5 w-5"
                                                      aria-hidden="true"
                                                    />
                                                  </Menu.Button>
                                                </div>
                                                <Transition
                                                  as={Fragment}
                                                  enter="transition ease-out duration-100"
                                                  enterFrom="transform opacity-0 scale-95"
                                                  enterTo="transform opacity-100 scale-100"
                                                  leave="transition ease-in duration-75"
                                                  leaveFrom="transform opacity-100 scale-100"
                                                  leaveTo="transform opacity-0 scale-95"
                                                >
                                                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                                    <div className="py-1">
                                                      <Menu.Item>
                                                        <button
                                                          className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                                                          onClick={() =>
                                                            openModal(
                                                              event.id,
                                                              true
                                                            )
                                                          }
                                                        >
                                                          Detalles
                                                        </button>
                                                      </Menu.Item>
                                                      <Menu.Item>
                                                        <button
                                                          className="bg-gray-100 text-gray-900 w-full block px-4 py-2 text-sm"
                                                          onClick={() =>
                                                            openModalImages(
                                                              event.id,
                                                              true
                                                            )
                                                          }
                                                        >
                                                          Imágenes
                                                        </button>
                                                      </Menu.Item>
                                                    </div>
                                                  </Menu.Items>
                                                </Transition>
                                              </Menu>
                                            </td>
                                          </tr>
                                        ))}
                                        {search.length > 0 &&
                                        filteredEvents().length === 0 ? (
                                          <NoResultsFound />
                                        ) : null}
                                        {search.length === 0 &&
                                          filteredEvents().length === 0 &&
                                          (!loading ? (
                                            <tr>
                                              <td
                                                colSpan="7"
                                                className="text-center p-2"
                                              >
                                                <h2 className="font-bold">
                                                  Aún no hiciste una busqueda.
                                                  🤔
                                                </h2>
                                              </td>
                                            </tr>
                                          ) : (
                                            <tr>
                                              <td
                                                colSpan="7"
                                                className="text-center p-10"
                                              >
                                                <h2 className="font-bold">
                                                  Cargando... 🤗
                                                </h2>
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={prevPage}
                        >
                          Anterior
                        </button>
                        <button
                          className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                          onClick={nextPage}
                        >
                          Siguiente
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;