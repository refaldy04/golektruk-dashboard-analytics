import { useEffect } from "react";

type DataTable = {
  scope: string;
  total: number;
  [key: string]: any;
};

const Table: React.FC<any> = ({ data }) => {
  return (
    <>
      <div className="relative overflow-x-auto mt-5">
        {data && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {data[0] &&
                  Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-6 py-3">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item: any, i: any) => (
                  <tr
                    key={i}
                    className="bg-transparent text-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {Object.values(item).map((val, i) => (
                      <td className="px-6 py-4" key={i}>{`${val}`}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Table;
