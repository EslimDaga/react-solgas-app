const NoResultsFound = () => {
  return (
    <tr className="dark:bg-gray-700">
      <td colSpan="8" className="text-center p-2">
        <h2 className="font-bold dark:text-gray-100">No se encontraron resultados. 😢</h2>
      </td>
    </tr>
  );
}

export default NoResultsFound;