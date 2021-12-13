import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { LogoHeader } from "./common/LogoHeader";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Example() {
  return (
    <Popover className="relative bg-slate-50">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/login">
              <LogoHeader />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Link to="/events" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Eventos
              </Link>
              <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Historial
              </a>
              <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Checkpoint
              </a>
              <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Conductores
              </a>
              <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Unidades
              </a>
            </Popover.Group>
            <a
              href="/"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <LogoutIcon className="w-5 h-5 mr-2"/>Cerrar Sesión
            </a>
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
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <LogoHeader />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Eventos
                </a>
                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Historial
                </a>
                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Checkpoint
                </a>
                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Conductores
                </a>
                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Unidades
                </a>
              </div>
              <div>
                <a
                  href="/"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogoutIcon className="w-5 h-5 mr-2"/>Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}