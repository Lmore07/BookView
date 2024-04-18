import React from "react";

interface TableData {
  [key: string]: string | number | boolean;
}

interface TableHeader {
  key: string;
  name: string;
}

interface TableProps {
  data: TableData[];
  headers: TableHeader[];
  showActions?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showView?: boolean;
  onViewClick?: (item: TableData) => void;
  onEditClick?: (item: TableData) => void;
  onDeleteClick?: (item: TableData) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  headers,
  showActions = false,
  showEdit = false,
  showDelete = false,
  showView = false,
  onViewClick,
  onEditClick,
  onDeleteClick,
}) => {
  const handleViewClick = (item: TableData) => {
    onViewClick?.(item);
  };

  const handleEditClick = (item: TableData) => {
    onEditClick?.(item);
  };

  const handleDeleteClick = (item: TableData) => {
    onDeleteClick?.(item);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary-500">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="px-6 py-3 text-xs font-normal tracking-wider text-left text-textButtonFill uppercase font-poppins"
                    >
                      {header.name}
                    </th>
                  ))}
                  {showActions && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-normal tracking-wider text-left text-textButtonFill uppercase font-poppins"
                    >
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    {headers.map((header, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {item[header.key]}
                      </td>
                    ))}
                    {showActions && (
                      <td className="px-6 py-4 flex flex-wrap gap-2 text-sm font-medium">
                        {showView && (
                          <button
                            className="flex items-center text-indigo-600 hover:text-indigo-900 mr-2"
                            onClick={() => handleViewClick(item)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                                ></path>
                              </g>
                            </svg>
                            Ver
                          </button>
                        )}
                        {showEdit && (
                          <button
                            className="text-yellow-600 hover:text-yellow-900 mr-2 flex items-center"
                            onClick={() => handleEditClick(item)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z"></path>
                                <path d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z"></path>
                              </g>
                            </svg>
                            Editar
                          </button>
                        )}
                        {showDelete && (
                          <button
                            className="text-red-600 hover:text-red-900 flex items-center"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z"
                                ></path>
                              </g>
                            </svg>
                            Eliminar
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
