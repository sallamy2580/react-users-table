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
    fetch(`https://reqres.in/api/users?page=${cursor}`)
      .then((e) => e.json())
      .then((v) => {
        setTotal(v.total);
        setData((e) => [...e, ...v.data]);
        setHasMore(v.page < v.total_pages);
      });
  }, [cursor]);

  const loadMore = () => setCursor((p) => p + 1);

  return (
    <Table
      columns={columns}
      tableData={data}
      currPage={1}
      perPage={5}
      total={total}
      loadMore={loadMore}
      hasMore={hasMore}
    />
  );
};

export default function HomePage() {
  const [user] = useUser();
  return (
    <>
      {user && (
        <>
          <TableHandler />
        </>
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
    </>
  );
}
