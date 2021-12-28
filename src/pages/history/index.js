import { useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/styles/css/history/style.css";


const HistoryPage = () => {
  const [startDate, setStartDate] = useState(new Date());
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
    console.log(moment(data.initial_date).format("YYYY-MM-DD"));
    const unit_name_value = data.unit_name.value;
    const initial_date_value = moment(data.initial_date).format("YYYY-MM-DD");
    const final_date_value = moment(data.final_date).format("YYYY-MM-DD");
    await getSearchEvents(initial_date_value,final_date_value,unit_name_value).then(events => {
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
                        render={({field}) => (
                          <ReactDatePicker
                            className="bg-gray-200 h-14 w-full pl-5 mr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            selected={field.value}
                            //onChange={(date) => setStartDate(date)}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Seleccionar Fecha Inicial"
                          />
                        )}
                      />
                      {errors.initial_date && <span className="text-red-500 text-sm font-bold flex mt-1">Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full">
                    <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                      Fecha Final
                    </label>
                    <div className="relative ml-2">
                      <Controller
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        name="final_date"
                        className="input"
                        rules={{
                          required: true,
                        }}
                        render={({field}) => (
                          <ReactDatePicker
                            className="bg-gray-200 h-14 w-full pl-5 mr-20 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Seleccionar Fecha Final"
                          />
                        )}
                      />
                      {errors.final_date && <span className="text-red-500 text-sm font-bold flex mt-1">Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="relative w-full md:w-full">
                    <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
                      Unidades
                    </label>
                    <div className="relative ml-2">
                      <Controller
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
                  <div className={`text-center self-center ml-2 mt-8` + (errors.initial_date || errors.final_date || errors.unit_name ? " self-center mt-2": "")}>
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