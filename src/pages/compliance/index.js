import { useEffect, useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Favicon from "../../assets/images/ico-solgas.png";
import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import { getSearchEventsWithGrouping } from "../../service/history";
import exportFromJSON from "export-from-json";
import ComplianceTable from "../../components/compliance/ComplianceTable";

const Compliance = () => {
	const [searchEvents, setSearchEvents] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [printEvents, setPrintEvents] = useState([]);
	const [nameFile, setNameFile] = useState("");
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	useEffect(() => {}, []);

	const filteredEvents = () => {
		if (search.length === 0) {
			return searchEvents.slice(currentPage, currentPage + 10);
		}
		const filtered = searchEvents.filter(eve =>
			eve.unit_name.toLowerCase().includes(search)
		);
		return filtered.slice(currentPage, currentPage + 10);
	};

	const nextPage = () => {
		if (
			searchEvents.filter(eve => eve.unit_name.toLowerCase().includes(search))
				.length >
			currentPage + 10
		) {
			setCurrentPage(currentPage + 10);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 10);
		}
	};

	const onSearchChange = ({ target }) => {
		setCurrentPage(0);
		setSearch(target.value);
	};

	const onSubmitForm = async data => {
		setSearchEvents([]);
		setLoading(true);
		const initial_date_value = moment(data.initial_date).format("YYYY-MM-DD");
		const final_date_value = moment(data.final_date).format("YYYY-MM-DD");
		await getSearchEventsWithGrouping(
			initial_date_value,
			final_date_value
		).then(events => {
			const print_events = events.map(event => {
				return {
					Checkpoint: event.checkpoint,
					"Operador Logistico": event.logistic_operator,
					Placa: event.unit_name,
					Cantidad: event.count,
				};
			});

			if (events.length === 0) {
				toast.error("🧐 No se hay resutados", {
					className: "font-bold",
					style: { fontFamily: "Quicksand" },
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			setSearchEvents(events);
			setLoading(false);
			setPrintEvents(print_events);
			setNameFile(
				`Reporte de eventos desde ${initial_date_value} hasta ${final_date_value}`
			);
		});
	};

	const data = printEvents;
	const fileName = nameFile;
	const exportType = "xls";

	const ExportToExcel = () => {
		exportFromJSON({ data, fileName, exportType });
	};

	return (
		<section className="h-screen dark:bg-gray-800">
			<Helmet>
				<title>Solgas - Checkpoint</title>
				<link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
			</Helmet>
			<Header />
			<Breadcrumb title="Reporte de Cumplimiento" url="/compliance" />
			<ComplianceTable
				handleSubmit={handleSubmit}
				onSubmitForm={onSubmitForm}
				control={control}
				errors={errors}
				searchEvents={searchEvents}
				ExportToExcel={ExportToExcel}
				search={search}
				onSearchChange={onSearchChange}
				filteredEvents={filteredEvents}
				loading={loading}
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		</section>
	);
};

export default Compliance;
