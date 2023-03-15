import "../App.css";
import MyBody from "../components/Body";
import Header from "../components/Header";
import Courses from "../components/Courses";
import About from "../components/About";
import Topsubjects from "../components/Topsubjects";
import Bodyend from "../components/Bodyend";
import Footer from "../components/Footer";
function Home() {
  return (
    <>
        <Header />
        <MyBody />
        <Courses/>
        <About/>
        <Topsubjects/>
        <Bodyend/>
        <Footer/>
    </>
  );
}

export default Home;
