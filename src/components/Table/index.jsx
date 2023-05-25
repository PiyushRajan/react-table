import React, { useState, useEffect } from "react";
import axios from "axios";
import { COLUMNS } from "../Columns/index";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";

const Table = () => {
  const [user, setUser] = useState([]);
  //   const columns = useMemo(() => COLUMNS, []);
  //   const data = useMemo(() => user, []);
  const columns = COLUMNS;
  const data = user;

  const fetchData = () => {
    axios
      .get("https://mocki.io/v1/c0118699-3865-44d7-96c6-2487a53fdf3c")
      .then((response) => setUser(response.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter } = state;
  const { pageIndex } = state;

  //   console.log(data, "data");
  return (
    <>
      <div className="wrapper">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="wrapper">
        <div className="button-wrapper">
          <span>
            Page:{""}
            <strong>
              {pageIndex + 1} 0f {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
