import { useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import "../../assets/styles/css/history/style.css";


const HistoryPage = () => {
  const { register, handleSubmit, formState : {errors}, control } = useForm();
  const [ allUnits, setAllUnits ] = useState([]);
  const [ searchEvents, setSearchEvents ] = useState([]);


  useEffect(() => {
    getUnits().then(units => {
      const optionAllUnits = [{ value: "ALL", label: "Todos" }];
      const optionsUnits = units.map(unit => (
        {
          value: unit.license_plate,
          label: unit.license_plate
        }
      ));
      const total = optionAllUnits.concat(optionsUnits);
      setAllUnits(total);
    });
  },[]);

  const onSubmitForm = async(data) => {
    const unit_name_value = data.unit_name.value;
    console.log(unit_name_value);
    const { initial_date, final_date } = data;
    await getSearchEvents(initial_date,final_date,unit_name_value).then(events => {
      setSearchEvents(events);
    })
  }

  return (
  <>
    <Header/>
    <Breadcrumb title="Historial"/>
    <div className="bg-white">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 w-full">
            <div className="flex flex-col justify-center">
              <div className="items-center pb-3 sm:relative lg:flex">
                <form onSubmit={handleSubmit(onSubmitForm)} className="mx-1 lg:flex">
                  <div className="relative w-full md:w-full">
                    <label
                      className={`block text-gray-700 text-base font-bold mb-2 ml-1` + (errors.initial_date ? " text-red-500" : "")}
                    >
                      Fecha Inicial
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`bg-gray-200 h-14 w-full pl-5 pr-5 rounded-lg z-0 focus:shadow focus:outline-none font-bold` + (errors.initial_date ? " focus:border-2 border-rose-500 border-2" : "")}
                        placeholder="Buscar por Unidad"
                        name="initial_date"
                        {...register("initial_date", {
                          required: {
                            value: true,
                            message: "Este campo es requerido"
                          }
                        })}
                      />
                      {errors.initial_date && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.initial_date.message}</span>}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full">
                    <label
                      className={`block text-gray-700 text-base font-bold mb-2 ml-2` + (errors.initial_date ? " text-red-500" : "")}
                    >
                      Fecha Final
                    </label>
                    <div className="relative ml-2">
                      <input
                        type="date"
                        className={`bg-gray-200 h-14 w-full pl-5 pr-5 rounded-lg z-0 focus:shadow focus:outline-none font-bold` + (errors.final_date ? " focus:border-2 border-rose-500 border-2" : "")}
                        placeholder="Buscar por Unidad"
                        name="final_date"
                        {...register("final_date", {
                          required: {
                            value: true,
                            message: "Este campo es requerido"
                          }
                        })}
                      />
                      {errors.final_date && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.final_date.message}</span>}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full">
                    <label
                      className={`block text-gray-700 text-base font-bold mb-2 ml-2` + (errors.unit_name ? " text-red-500" : "")}
                    >
                      Unidades
                    </label>
                    <div className="relative ml-2">
                      <Controller
                        as={ReactSelect}
                        name="unit_name"
                        isClearable
                        rules={{
                          required: true,
                          message: "Este campo es requerido"
                        }}
                        control={control}
                        render={({field}) => (
                          <ReactSelect
                            {...field}
                            isClearable
                            placeholder="Buscar por Unidad"
                            className="bg-gray-200 w-full rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            options={allUnits}
                          />
                        )}
                      />
                      {errors.unit_name && <span className="text-red-500 text-sm font-bold flex mt-1">Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className={`text-center self-end ml-2 mb-1` + (errors.initial_date || errors.final_date ? " self-center mt-3": "")}>
                    <button
                      className={`bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` + (errors.initial_date || errors.final_date ? " opacity-50 cursor-not-allowed" : "")}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      <div className="inline-flex items-center">
                      Enviar
                      </div>
                    </button>
                  </div>
                </form>
              </div>
              {
                searchEvents.map(event => (
                  <h1 key={event.id}>{event.id}</h1>
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  </>
  )
}

export default HistoryPage;