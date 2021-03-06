import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

const Dropdown = ({openModal, openModalImages, event}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-900">
          Acción
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right inherit right-0 mt-2 w-50 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1 bg-gray-100 dark:bg-gray-800">
            <Menu.Item>
              <button
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full block px-4 py-2 text-sm"
                onClick={() => openModal(event.id, true)}
              >
                Detalles
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full block px-4 py-2 text-sm"
                onClick={() => openModalImages(event.id, true)}
              >
                Imágenes
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
