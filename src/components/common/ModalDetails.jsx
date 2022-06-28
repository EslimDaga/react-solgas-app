import { BadgeCheckIcon } from '@heroicons/react/solid';
import { Duration } from 'luxon';

const ModalDetails = ({ event, closeModal }) => {
	let duration_game;
	let duration_in_app;

	if (event.game_time < 60) {
		duration_game = event.game_time;
	} else {
		duration_game = Duration.fromObject({ seconds: event.game_time }).as(
			'minutes'
		);
	}

	if (event.duration_time < 60) {
		duration_in_app = event.duration_time;
	} else {
		duration_in_app = Duration.fromObject({ seconds: event.duration_time }).as(
			'minutes'
		);
	}

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-solid border-blueGray-200 rounded-t">
							<h3 className="text-1xl font-semibold self-center dark:text-gray-100">
								Detalles del Evento
							</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-gray-900 dark:text-gray-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={closeModal}
							>
								<span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
									x
								</span>
							</button>
						</div>
						<div className="relative p-5 flex-auto">
							<div className="w-full bg-gray-100 dark:bg-gray-800 flex">
								<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
														<p className="text-white font-bold tracking-wider">
															Placa
														</p>
														<p className="text-white font-bold">
															{event.unitid}
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
														<p className="text-white font-bold">
															{event.datetime}
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
															Puntaje
														</p>
														<p className="text-white font-bold">
															{event.game_score}
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
															Estado de Ruta
														</p>
														<p className="text-white font-bold">
															{event.route_status}
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
															Tiempo en la App
														</p>
														<p className="text-white font-bold">
															{parseInt(duration_in_app)} Segundos
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
															Tiempo en el Juego
														</p>
														<p className="text-white font-bold">
															{parseInt(duration_game)} Segundos
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
														<p className="text-white font-bold">
															{event.checkpoint}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default ModalDetails;
