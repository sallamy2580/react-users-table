import { useState, useEffect } from 'react';
import { useUser, fetcher } from '../lib/hooks';
import useSWR from 'swr';

import Table from '../components/Table';

const columns = [
  {
    name: 'First name',
    key: 'first_name',
  },
  {
    name: 'Last name',
    key: 'last_name',
  },
  {
    name: 'Email',
    key: 'email',
  },
];

const TableHandler = () => {
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetch(`/api/accounts/${cursor}/100`)
      .then((e) => e.json())
      .then(({ docs, page, totalDocs, totalPages }) => {
        setTotal(totalDocs);
        setData((e) => [...e, ...docs]);
        setHasMore(page < totalPages);
      });
  }, [cursor]);

  const loadMore = () => setCursor((p) => p + 1);

  return (
    <Table
      columns={columns}
      tableData={data}
      currPage={1}
      perPage={100}
      total={total}
      loadMore={loadMore}
      hasMore={hasMore}
    />
  );
};

export default function HomePage() {
  const [user] = useUser();
  return (
    <div className='h-full w-full flex flex-col max-w-3xl mx-auto mb-16 sm:px-0'>
      {user && (
        <>
          <TableHandler />
        </>
      )}
      {!user && (
        <h1
          className='w-80 m-auto text-center'
          style={{
            fontSize: `3vh`,
          }}
        >
          SPA with React Table component and User Authentication
        </h1>
      )}
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}
