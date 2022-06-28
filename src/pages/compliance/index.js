import { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import Favicon from "../../assets/images/ico-solgas.png";
import Breadcrumb from "../../components/common/Breadcrumb";
import InputSearch from "../../components/common/InputSearch";
import Header from "../../components/Header";
import { getUnits } from "../../service/history";
import { ThemeContext } from "../../store/context/ThemeContext";

const Compliance = () => {
	const [allUnits, setAllUnits] = useState([]);
	const {
		formState: { errors },
		control,
	} = useForm();

	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		getUnits().then(units => {
			const optionAllUnits = [{ value: "ALL", label: "Todos" }];
			const optionsUnits = units.map(unit => ({
				value: unit.license_plate,
				label: unit.license_plate,
			}));
			const total = optionAllUnits.concat(optionsUnits);
			setAllUnits(total);
		});
	}, []);

	const customStyleWhiteMode = {
		control: (provided, state) => ({
			...provided,
			background: "#E5E7EB",
			borderRadius: "0.5rem",
			borderColor: state.isFocused ? "#E5E7EB" : "#E5E7EB",
			minHeight: state.isSelected ? "56px" : "56px",
		}),
	};

	const customStylesDarkMode = {
		control: (provided, state) => ({
			...provided,
			background: "#374151",
			borderRadius: "0.5rem",
			borderColor: "#374151",
			color: state.isSelected ? "#fff" : "#fff",
			minHeight: state.isSelected ? "56px" : "56px",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#fff",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#fff",
		}),
	};

	return (
		<section className="h-screen dark:bg-gray-800">
			<Helmet>
				<title>Solgas - Checkpoint</title>
				<link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
			</Helmet>
			<Header />
			<Breadcrumb title="Reporte de Cumplimiento" url="/compliance" />
			<div className="bg-white dark:bg-gray-800">
				<div className="pt-1">
					<div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
						<section className="antialiased text-gray-600 dark:text-gray-100 w-full">
							<div className="flex flex-col justify-center">
								<div className="items-center pb-3 sm:relative lg:flex justify-between">
									<form className="mx-1 lg:flex">
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
											<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 lg:ml-2">
												Unidades
											</label>
											<div className="relative lg:ml-2">
												{theme === "light" ? (
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
																className="bg-gray-200 dark:text-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
																options={allUnits}
																styles={customStyleWhiteMode}
															/>
														)}
													/>
												) : (
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
																className="bg-gray-200 dark:text-gray-900 dark:bg-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
																options={allUnits}
																styles={customStylesDarkMode}
															/>
														)}
													/>
												)}
												{errors.unit_name && (
													<span className="text-red-500 text-sm font-bold flex mt-1">
														Este campo es requerido
													</span>
												)}
											</div>
										</div>
										<div
											className={
												`flex text-center self-center mt-2 lg:ml-2 sm:mt-4 lg:mt-8` +
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
												<div className="inline-flex items-center">Buscar</div>
											</button>
											<button
												className="bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full"
												style={{ transition: "all .15s ease" }}
											>
												<div className="inline-flex items-center">Exportar</div>
											</button>
										</div>
									</form>
									<div className="flex flex-col">
										<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 ml-2">
											Buscar por Conductor
										</label>
										<InputSearch label="Buscar..." />
									</div>
								</div>
								<div className="bg-white dark:bg-gray-800">
									<div className="pt-1">
										<div className="mx-auto flex items-center space-x-2 sm:px-3 lg:max-w-full lg:px-0 dark:bg-gray-800">
											<section className="antialiased text-gray-600 w-full">
												Talle
											</section>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Compliance;
