import React, {useState, useEffect} from 'react'

const api_IMG = 'https://image.tmdb.org/t/p/w500/'

export default ({movie}) => {
    const [listPosition, setListPosition] = useState(0)

    const previous = () => {
        let x = listPosition + Math.round(window.innerWidth / 2)

        if(x > 0) {
            x = 0
        }
        setListPosition( x )
    }

    const next = () => {
        let x = listPosition - Math.round(window.innerWidth / 2)
        let listNumber = movie.item.length * 220
        if(window.innerWidth - listNumber > x) {
            x = (window.innerWidth - listNumber) - 220
        }
        setListPosition( x )
    }

  return ( 
    <div className="lists">
        <div className="list-less" onClick={previous}>-</div>
        <div className="list-plus" onClick={next}>+</div>
        <div className="list-tag">{movie.tag}</div>
        <div className="list-movies" style={{marginLeft: listPosition, width: movie.item.length * 220}}>
            {movie.item.map((poster) =><div><img className={`M${poster.id}`} src={api_IMG + poster.poster_path} /></div> )}
        </div>
    </div>
  )
}


