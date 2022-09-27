import React, {useState, useEffect} from "react";
import './MovieInfo.css'

const api_Key = '7d58ee24c13cc8835141ecd3e5aca05a'

export default ({idMovie}) => {
    const [saveSizeOverview, setSaveSizeOverview] = useState([])
    const [saveMovieInfo, setSaveMovieInfo] = useState('')
    const [saveMovieGenres, setSaveMovieGenres] = useState([])

    const feature = async () => {
            let selectedMovie = await getMovieInfo(idMovie, 'movie')
            setSaveMovieInfo( selectedMovie )
            setSaveMovieGenres( saveMovieInfo.genres.map((item) => item.name) )

            let sizeOverview = saveMovieInfo.overview
            if(sizeOverview.length > 200) {
                sizeOverview = sizeOverview.substring(0, 200) + '...'
            }
            setSaveSizeOverview( sizeOverview )
    }

    useEffect(() => {
        feature()
    })

    const getMovieInfo = async (movieId, type) => {
        let json = {}

        if(movieId) {
            switch(type) {
                case 'movie':
                    let info = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR&api_key=${api_Key}`);
                    json = info.json()
                break;
                case 'tv':
                    info = await fetch(`/tv/${movieId}?language=pt-BR&api_key=${api_Key}`);
                break
                default:
                    info = null
                break
            }
        }

        return json
    }

    return (
        <div className="movie-info" style={{backgroundImage: `url(https://image.Tmdb.org/t/p/original${saveMovieInfo.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="movie-info-opacity">
                <div className="movie-info-principal">
                    <div className="movie-info-title">{saveMovieInfo.original_title}</div>
                    <div className="movie-info-buttons">
                        <div className="watch-button">► Assistir</div>
                        <div className="add-movie-button">+ Lista</div>
                    </div>
                    <div className="genres">Gêneros:{saveMovieGenres.map((item) => <div>{item}</div>)}</div>
                    
                    <div className="movie-overview">{saveSizeOverview}</div>
                </div>
            </div>
        </div>
    )
}
