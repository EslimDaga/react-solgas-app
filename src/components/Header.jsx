import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { LogoHeader, LogoHeaderDark } from "./common/LogoHeader";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { render } from "@testing-library/react";
import Toggle from "../utils/ThemeToggle";
import { ThemeContext } from "../store/context/ThemeContext";

render(
	<Global
		styles={css`
			.active {
				background-color: #1e3a8a;
				color: #fff !important;
			}
			&.active:hover {
				color: #fff;
			}
		`}
	/>
);

const navItems = [
	{ title: "Eventos", path: "events" },
	{ title: "Historial", path: "history" },
	{ title: "Checkpoint", path: "checkpoint" },
	{ title: "Conductores", path: "drivers" },
	{ title: "Unidades", path: "units" },
	{ title: "Cumplimiento", path: "compliance" },
];

const Header = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<Popover className="bg-slate-50 dark:bg-slate-900 mt-0 fixed w-full z-10 top-0">
			<div className="mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center py-6 md:justify-between md:space-x-10">
					<div className="flex sm:flex md:flex lg:flex justify-between sm:justify-between md:justify-between lg:justify-between lg:w-0 lg:flex-1">
						<Link to="/login">
							{theme === "light" ? <LogoHeader /> : <LogoHeaderDark />}
						</Link>
					</div>
					<div className="-mr-2 -my-2 md:flex lg:hidden">
						<div className="flex">
							<Toggle />
							<Popover.Button className="bg-white dark:bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-gray-100 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-700">
								<MenuIcon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>
					</div>
					<div className="hidden md:hidden lg:flex items-center justify-end md:flex-1 lg:w-0">
						{theme === "light" ? (
							<Popover.Group as="nav" className="hidden md:flex space-x-1">
								{navItems.map(item => (
									<NavLink
										key={item.path}
										end
										to={`/${item.path}`}
										className="text-base font-medium text-gray-400 hover:text-gray-900 px-2 py-2 rounded-md"
									>
										{item.title}
									</NavLink>
								))}
							</Popover.Group>
						) : (
							<Popover.Group as="nav" className="hidden md:flex space-x-1">
								{navItems.map(item => (
									<NavLink
										key={item.path}
										end
										to={`/${item.path}`}
										className="text-base font-medium text-gray-400 hover:text-gray-100 px-2 py-2 rounded-md"
									>
										{item.title}
									</NavLink>
								))}
							</Popover.Group>
						)}
						<Toggle />
						<Link
							to="/logout"
							className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900"
						>
							<LogoutIcon className="w-5 h-5 mr-2" />
							Cerrar Sesi??n
						</Link>
					</div>
				</div>
			</div>
			<Transition
				as={Fragment}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel
					focus
					className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
				>
					<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-900 divide-y-2 divide-gray-50 dark:divide-gray-700">
						<div className="pt-5 pb-6 px-5">
							<div className="flex items-center justify-between">
								<div>
									{theme === "light" ? <LogoHeader /> : <LogoHeaderDark />}
								</div>
								<div className="-mr-2">
									<Popover.Button className="bg-white dark:bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-gray-100 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-700">
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
						</div>
						<div className="py-6 px-5 space-y-6">
							<div className="grid grid-cols-2 gap-y-4 gap-x-8">
								{theme === "light"
									? navItems.map(item => (
											<NavLink
												key={item.path}
												end
												to={`/${item.path}`}
												className="text-base font-medium text-gray-400 hover:text-gray-900 px-2 py-2 rounded-md"
											>
												{item.title}
											</NavLink>
									  ))
									: navItems.map(item => (
											<NavLink
												key={item.path}
												end
												to={`/${item.path}`}
												className="text-base font-medium text-gray-400 hover:text-gray-100 px-2 py-2 rounded-md"
											>
												{item.title}
											</NavLink>
									  ))}
							</div>
							<div>
								<Link
									to="/logout"
									className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900"
								>
									<LogoutIcon className="w-5 h-5 mr-2" />
									Cerrar Sesi??n
								</Link>
							</div>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default Header;
