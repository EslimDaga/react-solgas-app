import { useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";

const HistoryPage = () => {
  const { register, handleSubmit, formState : {errors} } = useForm();
  const [ allUnits, setAllUnits ] = useState([]);
  const [ searchEvents, setSearchEvents ] = useState([]);

  useEffect(() => {
    getUnits().then(units => {
      setAllUnits(allUnits);
    });
  },[]);

  const onSubmitForm = async(data) => {
    const { initial_date, final_date, unit_name } = data;
    await getSearchEvents(initial_date,final_date,unit_name).then(events => {
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
                <form onSubmit={handleSubmit(onSubmitForm)} className="flex">
                  <div className="relative w-full">
                    <label
                      className={`block text-gray-700 text-base font-bold mb-2 ml-1` + (errors.initial_date ? " text-red-500" : "")}
                    >
                      Fecha Inicial
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`bg-gray-100 h-14 w-full pl-5 pr-5 rounded-lg z-0 focus:shadow focus:outline-none font-bold` + (errors.initial_date ? " focus:border-2 border-rose-500 border-2" : "")}
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
                  <div className="relative w-full">
                    <label
                      className={`block text-gray-700 text-base font-bold mb-2 ml-2` + (errors.initial_date ? " text-red-500" : "")}
                    >
                      Fecha Final
                    </label>
                    <div className="relative ml-2">
                      <input
                        type="date"
                        className={`bg-gray-100 h-14 w-full pl-5 pr-5 rounded-lg z-0 focus:shadow focus:outline-none font-bold` + (errors.final_date ? " focus:border-2 border-rose-500 border-2" : "")}
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
                  <div className="relative w-full">
                    <label
                      className={`block text-gray-700 text-base font-bold mb-2 ml-2` + (errors.unit_name ? " text-red-500" : "")}
                    >
                      Unidades
                    </label>
                    <div className="relative ml-2">
                      <select
                        className="bg-gray-100 h-14 w-full pl-5 pr-5 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                        {...register("unit_name")}
                        placeholder="Buscar por Unidad"
                      >
                          <option value="ALL">Todos</option>t
                          <option value="F4O-995">F4O-995</option>
                          <option value="V4M-986">V4M-986</option>
                          <option value="P3M-819">P3M-819</option>
                      </select>
                      {errors.unit_name && <span className="text-red-500 text-sm font-bold flex mt-1">{errors.unit_name.message}</span>}
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