import InputSearch from "../common/InputSearch";
import Pagination from "../common/Pagination";
import FormSerchCompliance from "./FormSerchCompliance";
import Table from "./Table";

const ComplianceTable = ({
	handleSubmit,
	onSubmitForm,
	control,
	errors,
	searchEvents,
	ExportToExcel,
	search,
	onSearchChange,
	filteredEvents,
	loading,
	prevPage,
	nextPage,
}) => {
	return (
		<div className="bg-white dark:bg-gray-800">
			<div className="pt-1">
				<div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
					<section className="antialiased text-gray-600 dark:text-gray-100 w-full">
						<div className="flex flex-col justify-center">
							<div className="items-center pb-3 sm:relative lg:flex justify-between">
								<FormSerchCompliance
									handleSubmit={handleSubmit}
									onSubmitForm={onSubmitForm}
									control={control}
									errors={errors}
									searchEvents={searchEvents}
									ExportToExcel={ExportToExcel}
								/>
								<div className="flex flex-col">
									<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 ml-2">
										Buscar por placa
									</label>
									<InputSearch
										label="Buscar..."
										search={search}
										onSearchChange={onSearchChange}
									/>
								</div>
							</div>
							<div className="bg-white dark:bg-gray-800">
								<div className="pt-1">
									<div className="mx-auto flex items-center space-x-2 sm:px-3 lg:max-w-full lg:px-0 dark:bg-gray-800">
										<section className="antialiased text-gray-600 w-full">
											<Table
												filteredEvents={filteredEvents}
												search={search}
												loading={loading}
											/>
											<Pagination prevPage={prevPage} nextPage={nextPage} />
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

export default ComplianceTable;
