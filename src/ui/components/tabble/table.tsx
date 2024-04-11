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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {showView && (
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                            onClick={() => handleViewClick(item)}
                          >
                            Ver
                          </button>
                        )}
                        {showEdit && (
                          <button
                            className="text-yellow-600 hover:text-yellow-900 mr-2"
                            onClick={() => handleEditClick(item)}
                          >
                            Editar
                          </button>
                        )}
                        {showDelete && (
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(item)}
                          >
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
