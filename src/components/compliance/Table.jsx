import NoResultsFound from "../common/NoResultsFound";

const Table = ({ filteredEvents, search, loading }) => {
	return (
		<div className="flex flex-col justify-center dark:bg-gray-800">
			<div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-lg">
				<div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3">
					<div className="flex flex-col">
						<div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5 dark:bg-gray-800">
								<div className="sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
										<thead className="bg-blue-900 dark:bg-gray-900">
											<tr>
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
													Cantidad
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
												>
													Porcentaje
												</th>
											</tr>
										</thead>
										<tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
											{filteredEvents().map((event, index) => (
												<tr key={index}>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
														{event.checkpoint}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
														{event.logistic_operator}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
														{event.unit_name}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
														{event.count}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
														{event.percentage} %
													</td>
												</tr>
											))}
											{search.length > 0 && filteredEvents().length === 0 ? (
												<NoResultsFound />
											) : null}
											{search.length === 0 &&
												filteredEvents().length === 0 &&
												(!loading ? (
													<tr className="dark:bg-gray-700">
														<td colSpan="8" className="text-center p-2">
															<h2 className="font-bold dark:text-gray-100">
																Aún no hiciste una busqueda. 🤔
															</h2>
														</td>
													</tr>
												) : (
													<tr className="dark:bg-gray-700">
														<td colSpan="8" className="text-center p-10">
															<h2 className="font-bold dark:text-gray-100">
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
	);
};

export default Table;
