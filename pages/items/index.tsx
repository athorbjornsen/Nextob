import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Item {
  id: number;
  name: string;
  info: string;
}

const ItemsPage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      if (!response.ok) {
        throw new Error('Failed to fetch items.');
      }
      const data = await response.json();
      setItems(data);
    } catch (error: any) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearItems = async () => {
    const isConfirmed = confirm('Are you sure you want to delete all items?');
    if (!isConfirmed) return;

    try {
      const response = await fetch('/api/items/clear', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear items.');
      }

      const result = await response.json();
      alert(result.message);
      fetchItems();
    } catch (error: any) {
      setStatus(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Item List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>List of Items</h1>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}: {item.info}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
      <button onClick={clearItems}>Clear List</button>
      {status && <p>Error: {status}</p>}
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default ItemsPage;