import type { NextPage } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetcher, requests } from '../lib/utils/requests';
import useSWR from 'swr';

const Home: NextPage = () => {
  // Example get request
  const { data: products } = useSWR('/api/products', fetcher, {
    refreshInterval: 1000,
  });

  // Example post request
  const createProduct = async () => {
    await requests.post('/api/product', {
      name: 'New Product',
      description: 'New Product Description',
      price: 100,
    });
  };

  return (
    <div>
      <Header />
      <main>This is workers example :)</main>
      <Footer />
    </div>
  );
};

export default Home;
