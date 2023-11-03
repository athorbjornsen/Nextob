import Link from 'next/link';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <>
      <header>
        <h1>Welcome to Next.js</h1>
      </header>
      <main>
        <nav>
          <ul>
            <li>
              <Link href="/items"><a>View Items</a></Link>
            </li>
            <li>
              <Link href="/items/add"><a>Add Item</a></Link>
            </li>
          </ul>
        </nav>
      </main>
      <style jsx>{`
        header {
          background-color: #f0f4f8;
          color: #333;
          padding: 2rem;
          text-align: center;
        }
        main {
          padding: 1rem;
        }
        nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
        }
        nav ul li {
          margin: 0 1rem;
        }
        a {
          color: #5d647b;
          text-decoration: none;
          font-size: 1.25rem;
        }
        a:hover {
          color: #4a90e2;
        }
      `}</style>
    </>
  );
}

export default HomePage;