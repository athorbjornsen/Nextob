import { useState } from 'react';
import Link from 'next/link';

function AddItemPage() {
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, info }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setStatus('Item added to the list!');
      setName('');
      setInfo('');
    } catch (error: any) {
      setStatus(error.message || 'An error occurred, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add to List</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add to List'}
        </button>
      </form>
      {status && <p>{status}</p>}
      <Link href="/items">Back to List</Link>
    </div>
  );
}

export default AddItemPage;