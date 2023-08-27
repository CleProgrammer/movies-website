import { useEffect, useState } from "react"
import MovieInfo from "./MovieInfo"
import PreviousNext from "./PreviousNext"
import SelectedMovie from "./selectedMovie"
import './Tmdb.css'

const api_Key = '7d58ee24c13cc8835141ecd3e5aca05a'
const link_Base = 'https://api.themoviedb.org/3'

const catchMovies = async (link) => {
    const req = await fetch(`${link_Base}${link}`)
    const json = await req.json()
    return json.results
}

export default ()   => {
    const c = (cl) => document.querySelector(cl)

    const [saveMovies, setSaveMovies] = useState([])
    const [saveRandomId, setSaveRandomId] = useState([])
    const [checkMovieInfo, setCheckMovieInfo] = useState(true)
    const [saveIdModal, setsaveIdModal] = useState()

    const movies = async () => { 
        return [
        {   tag: 'Mais Vistos',
            item: await catchMovies(`/discover/tv?with_network=213&language=pt-BR&api_key=${api_Key}`)
        },
        {
            tag: 'Ação',
            item: await catchMovies(`/trending/all/week?language=pt-BR&api_key=${api_Key}`)
        },
        {
            tag: 'Clássicos',
            item: await catchMovies(`/movie/top_rated?language=pt-BR&api_key=${api_Key}`)
        }
    ]}

    useEffect(() => {
        const getMovies = async () => {
            let list = await movies()
            setSaveMovies(list)
        }
        getMovies()
    }, [])

    const getMovieId = async () => {
        //Feature
        if(checkMovieInfo === true) {
            let saveId = saveMovies.map((movie) => movie.item.map((idMovie) => idMovie.id))
            let randomId = Math.floor(Math.random() * saveId[1].length)
            let saveIdRandom = saveId[1][randomId]
            setSaveRandomId( saveIdRandom )
            setCheckMovieInfo( false )
        }
    }

    function getIdMovie(e) {
        c('.modal-movie-info').style.display = 'flex'
        setsaveIdModal( e.target.id )
    }

    useEffect(() => {
        getMovieId()
    })
    
    return (
        <>  
            {<SelectedMovie idMovie={saveIdModal} />}
            {<MovieInfo idMovie={saveRandomId} />}
            
            <div className="main-list">{saveMovies.map((movie) => 
                <PreviousNext movie={movie} getIdMovie={getIdMovie} />
            )}</div>
            
        </>
    )
}

