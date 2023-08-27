import { fetchDataFromApi } from "./utils/api.js";
import React,{ useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./slice/homeSlice.js";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"




import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import Home from "./pages/home/Home.js";
import Detail from "./pages/details/Detail.js";
import SearchResult from "./pages/searchResult/SearchResult.js";
import Explore from "./pages/explore/Explore.js";
import PageNotFound from "./pages/404/PageNotFound.js";




function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state=>state.home));
  // console.log(url);
  useEffect(()=>{
    fetchApiConfig();
    genresCall()
  },[])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) =>{
        // console.log(res);

        const imageUrl ={
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(imageUrl))
      })
  }

  const genresCall = async() => {
    let promises = [];
    let endPoint = ['tv', 'movie'];
    let allGenres = {}

    endPoint.forEach((url)=> {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    // console.log(data)
    data.map(({genres})=>{
        return genres.map((item)=> (allGenres[item.id] = item ))
    });
    // console.log(allGenres)
    dispatch(getGenres(allGenres))

  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/:mediaType/:id" Component={Detail}  />
        <Route exact path="/search/:query" Component={SearchResult} />
        <Route exact path="/explore/:mediaType" Component={Explore } />
        <Route path="*" Component={PageNotFound}  />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

//option checking