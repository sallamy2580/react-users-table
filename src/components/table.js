import React, { useState } from 'react';

const TableBody = ({ data, perPage }) => {
  return (
    <tbody>
      {[
        ...data.map(({ id, first_name, last_name, email }) => (
          <tr key={email}>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
          </tr>
        )),
        // ...new Array(perPage - data.length + 1).fill(0).map((e, id) => (
        //   <tr key={id}>
        //     <td>&nbsp;</td>
        //     <td>&nbsp;</td>
        //     <td>&nbsp;</td>
        //   </tr>
        // )),
      ]}
    </tbody>
  );
};

TableBody.displayName = 'TableBody';

const Table = ({ columns, tableData, currPage, perPage, total, loadMore }) => {
  const [rows, setRows] = useState(tableData);

  const [sortConfig, setSortConfig] = useState({ key: columns[0].key, dir: 1 });

  const filterConfigInit = columns
    .map(({ key }) => key)
    .reduce((a, v) => ({ ...a, [v]: '' }), {});
  const filterConfig = filterConfigInit;

  const [filterOn, setFilterOn] = useState(false);
  const [filterRows, setFilterRows] = useState(tableData);

  const [page, setPage] = useState(currPage);

  const sortedRows = React.useMemo(
    () =>
      tableData.sort((a, b) =>
        sortConfig.dir > 0
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : -1 * a[sortConfig.key].localeCompare(b[sortConfig.key])
      ),
    [tableData, sortConfig]
  );

  const compareFn = (a, b) => a.toLowerCase().indexOf(b.toLowerCase()) >= 0;

  const filterSearchHandler = ({ target: { name: key, value } }) => {
    filterConfig[key] = value;

    if (Object.values(filterConfig).join('').length === 0) {
      console.log('filter off');
      setFilterOn(false);
      setFilterRows(tableData);
    } else {
      const query = Object.fromEntries(
        Object.entries(filterConfig).filter(([_, v]) => v.length > 0)
      );

      setFilterOn(true);
      setFilterRows(
        filterRows.filter((e) =>
          Object.keys(query).every((k) => compareFn(e[k], value))
        )
      );
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(({ name, key }) => (
              <th
                key={`sort-${key}`}
                onClick={() => {
                  setSortConfig({ key, dir: -sortConfig.dir });
                }}
              >
                {name}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map(({ key }) => (
              <th key={`filter-${key}`}>
                <input type='text' name={key} onChange={filterSearchHandler} />
              </th>
            ))}
          </tr>
        </thead>
        <TableBody
          data={
            filterOn
              ? filterRows.slice((page - 1) * perPage, page * perPage)
              : sortedRows.slice((page - 1) * perPage, page * perPage)
          }
          perPage={perPage}
        />
      </table>
      <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
        Prev
      </button>
      <button onClick={loadMore} disabled={sortedRows.length >= total}>
        Load more
      </button>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page * perPage > sortedRows.length}
      >
        Next
      </button>
    </>
  );
};
Table.displayName = 'ReactTable';

export default Table;
