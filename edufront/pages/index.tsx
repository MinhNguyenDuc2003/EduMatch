import { NextPage } from 'next';
import { Banner } from 'modules/home/components';

const Home: NextPage = () => {
  return (
    <div>
      <Banner />
      Hello world
    </div>
  );
};
export default Home;