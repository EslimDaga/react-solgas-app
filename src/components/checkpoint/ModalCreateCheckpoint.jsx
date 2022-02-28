const ModalCreateCheckpoint = ({ closeModalCreateCheckpoint, token }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-4 max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
              <h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
                Crear Checkpoint
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModalCreateCheckpoint}
              >
                <span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-100">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                    <div className="flex flex-col sm:mt-0 gap-7 text-sm">
                      <iframe
                        id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="100%"
                        height="770px"
                        src={`http://checkpoint.segursat.com/api/create-checkpoint/${token}`}
                      ></iframe>
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

export default ModalCreateCheckpoint;
