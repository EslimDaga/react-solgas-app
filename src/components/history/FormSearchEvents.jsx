import InputSearch from "../common/InputSearch";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { Controller } from "react-hook-form";

const FormSearchEvents = ({
  handleSubmit,
  onSubmitForm,
  control,
  errors,
  allUnits,
  searchEvents,
  ExportToExcel,
  search,
  onSearchChange
}) => {
  return (
    <div className="items-center pb-3 sm:relative lg:flex justify-between">
      <form onSubmit={handleSubmit(onSubmitForm)} className="mx-1 lg:flex">
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
            (errors.initial_date || errors.final_date || errors.unit_name
              ? " self-center lg:mt-2"
              : "")
          }
        >
          <button
            className={
              `bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
              (errors.initial_date || errors.final_date || errors.unit_name
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
  );
};

export default FormSearchEvents;
