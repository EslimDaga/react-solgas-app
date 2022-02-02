import Pagination from "../common/Pagination";
import exportFromJSON from "export-from-json";
import FormSearchEvents from "./FormSearchEvents";
import Table from "./Table";

const HistoryTable = ({
  handleSubmit,
  onSubmitForm,
  control,
  errors,
  allUnits,
  search,
  onSearchChange,
  filteredEvents,
  openModal,
  openModalImages,
  loading,
  prevPage,
  nextPage,
  searchEvents,
  printEvents,
  nameFile,
}) => {
  const data = printEvents;
  const fileName = nameFile;
  const exportType = "xls";

  const ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="pt-1">
        <div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
          <section className="antialiased text-gray-600 dark:text-gray-100 w-full">
            <div className="flex flex-col justify-center">
              <FormSearchEvents
                handleSubmit={handleSubmit}
                onSubmitForm={onSubmitForm}
                control={control}
                errors={errors}
                allUnits={allUnits}
                searchEvents={searchEvents}
                ExportToExcel={ExportToExcel}
                search={search}
                onSearchChange={onSearchChange}
              />
              <div className="bg-white dark:bg-gray-800">
                <div className="pt-1">
                  <div className="mx-auto flex items-center space-x-2 sm:px-3 lg:max-w-full lg:px-0 dark:bg-gray-800">
                    <section className="antialiased text-gray-600 w-full">
                      <Table
                        filteredEvents={filteredEvents}
                        openModal={openModal}
                        openModalImages={openModalImages}
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

export default HistoryTable;