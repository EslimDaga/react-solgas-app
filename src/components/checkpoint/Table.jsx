import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useContext } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { deleteCheckpoint } from "../../service/checkpoint";
import { ThemeContext } from "../../store/context/ThemeContext";
import NoResultsFound from "../common/NoResultsFound";

const Table = ({ filteredCheckpoints, openModalViewCheckpoint, search, is_staff }) => {

  const { theme } = useContext(ThemeContext);


  const deleteCheckpointAction = async(checkpoint) => {
    if(theme === "dark"){
      Swal.fire({
        title: "¿Esta seguro de eliminar este Checkpoint?",
        text: "Una vez eliminado no podrá recuperarlo",
        icon: "question",
        showDenyButton: true,
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Si, Eliminar",
        background: "#1F2937",
        color: "#FFFFFF",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCheckpoint(checkpoint).then(() => {
            Swal.fire({
              title: "Se elimino el checkpoint",
              text: "Se elimino el checkpoint correctamente",
              icon: "success",
              confirmButtonColor: "#1E3A8A",
              confirmButtonText: "Ok",
              background: "#1F2937",
              color: "#FFFFFF",
            });
          });
          window.location.reload();
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino el checkpoint",
            text: "No se borro ningun dato",
            icon: "info",
            confirmButtonColor: "#1E3A8A",
            confirmButtonText: "Ok",
            background: "#1F2937",
            color: "#FFFFFF",
          });
        }
      })
    }else{
      Swal.fire({
        title: "¿Esta seguro de eliminar este Checkpoint?",
        text: "Una vez eliminado no podrá recuperarlo",
        icon: "question",
        showDenyButton: true,
        iconColor: "#1E3A8A",
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Si, Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCheckpoint(checkpoint).then(() => {
            Swal.fire({
              title: "Se elimino el checkpoint",
              text: "Se elimino el checkpoint correctamente",
              icon: "success",
              confirmButtonColor: "#1E3A8A",
              confirmButtonText: "Ok",
              background: "#FFFFFF",
              color: "#000000",
            });
          });
          window.location.reload();
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino el checkpoint",
            text: "No se borro ningun dato",
            icon: "info",
            iconColor: "#1E3A8A",
            confirmButtonColor: "#1E3A8A",
            confirmButtonText: "Ok",
            background: "#FFFFFF",
            color: "#000000",
          });
        }
      })
    }
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-blue-900 dark:bg-gray-900">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
            >
              Usuario
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
            >
              Fecha de Creación
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
            >
              Fecha de Modificación
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
          {filteredCheckpoints().map((checkpoint) => (
            <tr key={checkpoint.name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {checkpoint.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {checkpoint.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {checkpoint.created}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                {checkpoint.modified}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-900">
                      Acción
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
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
                            onClick={() =>
                              openModalViewCheckpoint(checkpoint.name, true)
                            }
                          >
                            Ver
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            disabled={!is_staff}
                            className={
                              `bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full block px-4 py-2 text-sm` +
                              (!is_staff
                                ? " opacity-50 cursor-not-allowed"
                                : "")
                            }
                            onClick={() =>
                              deleteCheckpointAction(checkpoint.name)
                            }
                          >
                            Eliminar
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </td>
            </tr>
          ))}
          {search.length > 0 && filteredCheckpoints().length === 0 ? (
            <NoResultsFound />
          ) : null}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
};

export default Table;