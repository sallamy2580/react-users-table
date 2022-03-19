import React, { useState } from 'react';

const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map(({ id, first_name, last_name, email }) => (
        <tr key={email}>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{email}</td>
        </tr>
      ))}
    </tbody>
  );
};

TableBody.displayName = 'TableBody';

const Table = ({ columns, tableData, currPage, perPage, total, loadMore }) => {
  const [rows, setRows] = useState(tableData);
  const [filter, setFilter] = useState({});
  const [pageNum, setPageNum] = useState(currPage);
  const [sortInit, setSortInit] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: columns[0].key, dir: 1 });

  const filterConfigInit = columns
    .map(({ key }) => key)
    .reduce((a, v) => ({ ...a, [v]: '' }), {});
  const [filterConfig, setFilterConfig] = React.useState(filterConfigInit);

  const sortCompareFn = (a, b, dir) => dir * a.localeCompare(b);

  const filterCompareFn = (a, b) =>
    a.toLowerCase().indexOf(b.toLowerCase()) >= 0;

  const sortedRows = React.useMemo(() => {
    console.log(filter);

    if (sortInit || Object.keys(filter).length >= 0) {
      return tableData
        .sort((a, b) =>
          sortCompareFn(a[sortConfig.key], b[sortConfig.key], sortConfig.dir)
        )
        .filter((e) =>
          Object.keys(filter).every((k) => filterCompareFn(e[k], filter[k]))
        );
    }

    return tableData;
  }, [tableData, sortConfig, sortInit, filter]);

  const prepareFilter = (query) =>
    Object.fromEntries(Object.entries(query).filter(([_, v]) => v.length > 0));

  const filterSearchHandler = ({ target: { name: key, value } }) => {
    setFilter(prepareFilter({ ...filter, [key]: value }));
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
                  setSortInit(true);
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
          data={sortedRows.slice((pageNum - 1) * perPage, pageNum * perPage)}
        />
      </table>
      <button onClick={() => setPageNum((p) => p - 1)} disabled={pageNum <= 1}>
        Prev
      </button>
      <button onClick={loadMore} disabled={false}>
        Load more
      </button>
      <button
        onClick={() => setPageNum((p) => p + 1)}
        disabled={pageNum * perPage > tableData.length}
      >
        Next
      </button>
    </>
  );
};
Table.displayName = 'ReactTable';

export default Table;
