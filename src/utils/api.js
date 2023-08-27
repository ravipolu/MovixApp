import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3'

// const TMDB_TOKEN = process.env.TMDB_API_TOKEN;
// console.log(TMDB_TOKEN)
const headers = {
    Authorization : "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWVmYzBjNzk5MWNiNDYwNWM2NzJiZDFkYTk4MzIwZiIsInN1YiI6IjY0NzM0NmY4NWNkMTZlMDEzM2UxZGMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MWTjeVSIyfvDQjf3ccIQTiiWnxaQPa5Pay29rzUp-KU"}

export const fetchDataFromApi = async (url,params) =>{
        try {
            const {data} = await axios.get(BASE_URL + url ,{
                headers,
                params,
            });
            return data; 
        } catch (error) {
            console.log(error);
            return error;
        }
}
