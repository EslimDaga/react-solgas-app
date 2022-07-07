import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const FormSerchCompliance = ({
	handleSubmit,
	onSubmitForm,
	control,
	errors,
	searchEvents,
	ExportToExcel,
}) => {
	return (
		<form className="mx-1 lg:flex" onSubmit={handleSubmit(onSubmitForm)}>
			<div className="relative w-full md:w-full sm:mb-2">
				<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 ml-2">
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
								className="bg-gray-200 dark:bg-gray-700 dark:placeholder:text-gray-100 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
								selected={field.value}
								//onChange={(date) => setStartDate(date)}
								onChange={date => field.onChange(date)}
								placeholderText="Seleccionar Fecha"
								dateFormat="dd/MM/yyy"
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
				<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 lg:ml-2">
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
								className="bg-gray-200 dark:bg-gray-700 dark:placeholder:text-gray-100 h-14 w-full pl-4 rounded-lg z-0 focus:shadow focus:outline-none font-bold"
								selected={field.value}
								onChange={date => field.onChange(date)}
								placeholderText="Seleccionar Fecha"
								dateFormat="dd/MM/yyy"
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
			<div
				className={
					`flex text-center self-center mt-2 lg:ml-2 sm:mt-4 lg:mt-8` +
					(errors.initial_date || errors.final_date || errors.unit_name
						? " self-center lg:mt-2"
						: "")
				}
			>
				<button
					className={
						`bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
						(errors.initial_date || errors.final_date
							? " opacity-50 cursor-not-allowed"
							: "")
					}
					type="submit"
					style={{ transition: "all .15s ease" }}
				>
					<div className="inline-flex items-center">Buscar</div>
				</button>
				<button
					disabled={searchEvents.length === 0 ? true : false}
					className={
						`bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
						(searchEvents.length === 0 ? " opacity-50 cursor-not-allowed" : "")
					}
					onClick={ExportToExcel}
					style={{ transition: "all .15s ease" }}
				>
					<div className="inline-flex items-center">Exportar</div>
				</button>
			</div>
		</form>
	);
};

export default FormSerchCompliance;
