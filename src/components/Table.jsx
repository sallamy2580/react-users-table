import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const TableBody = ({ data }) => (
  <tbody>
    {data.map(({ firstName, lastName, email }) => (
      <tr
        key={email}
        className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4 font-body text-gray-900 dark:text-white whitespace-nowrap">
          {firstName}
        </td>
        <td className="px-6 py-4 font-body text-gray-900 dark:text-white whitespace-nowrap">
          {lastName}
        </td>
        <td className="px-6 py-4 font-body text-gray-900 dark:text-white whitespace-nowrap">
          {email}
        </td>
      </tr>
    ))}
  </tbody>
)

TableBody.displayName = 'TableBody'

const TableComponent = ({
  columns,
  tableData,
  currPage,
  perPage,
  total,
  loadMore,
  hasMore,
}) => {
  const [filter, setFilter] = useState({})
  const [pageNum, setPageNum] = useState(currPage)
  const [sortInit, setSortInit] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: columns[0].key, dir: 1 })

  const sortCompareFn = (a, b, dir) => dir * a.localeCompare(b)

  const filterCompareFn = (a, b) =>
    a.toLowerCase().indexOf(b.toLowerCase()) >= 0

  const sortedRows = React.useMemo(() => {
    if (sortInit || Object.keys(filter).length >= 0) {
      return tableData
        .sort((a, b) =>
          sortCompareFn(a[sortConfig.key], b[sortConfig.key], sortConfig.dir)
        )
        .filter((e) =>
          Object.keys(filter).every((k) => filterCompareFn(e[k], filter[k]))
        )
    }

    return tableData
  }, [tableData, sortConfig.key, sortConfig.dir, sortInit, filter])

  const prepareFilter = (query) =>
    Object.fromEntries(Object.entries(query).filter(([_, v]) => v.length > 0))

  const filterSearchHandler = ({ target: { name: key, value } }) => {
    setFilter(prepareFilter({ ...filter, [key]: value }))
  }

  return (
    <>
      <table className="text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map(({ name, key }) => (
              <th
                scope="col"
                className="px-6 py-3"
                key={`sort-${key}`}
                onClick={() => {
                  setSortInit(true)
                  setSortConfig({ key, dir: -sortConfig.dir })
                }}
              >
                {name}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map(({ key }) => (
              <th key={`filter-${key}`} className="text-center">
                <input
                  type="text"
                  name={key}
                  onChange={filterSearchHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-2 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Search for ${key}`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <TableBody
          data={sortedRows.slice((pageNum - 1) * perPage, pageNum * perPage)}
        />
      </table>
      <div className="flex items-center pt-5 justify-center">
        <button
          type="button"
          onClick={() => setPageNum((p) => p - 1)}
          disabled={pageNum <= 1}
          className="dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaArrowLeft />
        </button>
        <button
          type="button"
          onClick={loadMore}
          disabled={!hasMore}
          className="dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Load more
        </button>
        <button
          type="button"
          onClick={() => setPageNum((p) => p + 1)}
          disabled={pageNum * perPage > total}
          className="dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  )
}
TableComponent.displayName = 'ReactTable'

export default TableComponent
