import React from "react";
import { useState, useEffect } from "react";
import './selectedMovie.css'

const api_Key = '7d58ee24c13cc8835141ecd3e5aca05a'

export default ({idMovie}) => {

    const c = (cl) => document.querySelector(cl)

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
        if( idMovie ) {
            feature()
        }
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

    function closeModalMovieInfo() {
        c('.modal-movie-info').style.display = 'none'
    }

    return (
        <div className="modal-movie-info">
            <div className="modal-movie-info2" style={{backgroundImage: `url(https://image.Tmdb.org/t/p/original${saveMovieInfo.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="modal-movie-info-opacity">
                    <div className="modal-movie-info-principal">
                        <div className="modal-movie-info-title">{saveMovieInfo.original_title}</div>
                        <div className="modal-movie-info-buttons">
                            <div className="modal-watch-button">► Assistir</div>
                            <div className="modal-add-movie-button">+ Lista</div>
                        </div>
                        <div className="modal-genres">Gêneros:{saveMovieGenres.map((item) => <div>{item}</div>)}</div>
                        
                        <div className="modal-movie-overview">{saveSizeOverview}</div>
                        <div className="closeModal" onClick={closeModalMovieInfo}>X</div>
                    </div>
                </div>
            </div>
        </div>
    )
}