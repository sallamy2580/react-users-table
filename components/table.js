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
        ...new Array(perPage - data.length + 1).fill(0).map((e, id) => (
          <tr key={id}>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        )),
      ]}
    </tbody>
  );
};

TableBody.displayName = 'TableBody';

const Table = ({ columns, tableData, currPage, perPage, total, loadMore }) => {
  const [sortKey, setSortKey] = useState(columns[0].key);
  const [sortDir, setSortDir] = useState(1);

  const [page, setPage] = useState(currPage);

  const sortedRows = React.useMemo(
    () =>
      tableData.sort((a, b) =>
        sortDir > 0
          ? a[sortKey].localeCompare(b[sortKey])
          : -1 * a[sortKey].localeCompare(b[sortKey])
      ),
    [tableData, sortKey, sortDir]
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(({ name, key }) => (
              <th
                key={key}
                onClick={(event) => {
                  setSortKey(key);
                  setSortDir((e) => -e);
                }}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <TableBody
          data={sortedRows.slice((page - 1) * perPage, page * perPage)}
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
