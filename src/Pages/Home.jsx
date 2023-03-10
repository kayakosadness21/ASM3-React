import Banner from "../Comps/Components/HomePage/Banner";
import Categories from "../Comps/Components/HomePage/Categories";
import OtherInfo from "../Comps/Components/HomePage/OtherInfo";
import TopProducts from "../Comps/Components/HomePage/TopProducts";

function Home() {
  return (
    <div className="bg-white">
      <Banner />
      <Categories />
      <TopProducts />
      <OtherInfo />
    </div>
  );
}

export default Home;
