import Dropdown from "../common/Dropdown";

const Table = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-blue-900 dark:bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Dni
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Apellidos
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Nombres
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
          >
            Número de Licencia
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
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
              <Dropdown />
            </td>
          </tr>
      </tbody>
    </table>
  );
};

export default Table;