import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

interface Item {
  id: number;
  name: string;
  info: string;
}

function ItemInfo() {
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);

        if (response.status === 404) {
          setError('Item not found.');
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error('An error occurred while fetching the item.');
        }

        const data = await response.json();
        setItem(data);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching the item.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Item Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Item Details</h1>
      {item ? (
        <>
          <h2>{item.name}</h2>
          <p>{item.info}</p>
        </>
      ) : (
        <p>Item not found.</p>
      )}
      <Link href="/items">Back to Item List</Link>
    </div>
  );
}

export default ItemInfo;