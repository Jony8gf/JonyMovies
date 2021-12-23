import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react';
import useInView from "react-cool-inview";

export default function Movies({ movies }) {

  const [mov, setMov] = useState(movies)
  const { observe, inView } = useInView();
  
  const buscarPelicula = () => {
    const text = document.getElementById("text").value;
    console.log(text)
    if(text != null && text != undefined && text != ""){
      llamadaApiPelicula(text)
    }else{
      llamadaApiPorDefecto()
    }
  }

  const llamadaApiPelicula = async (text) => {
      const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=192e0b9821564f26f52949758ea3c473&query='+text)
      const data = await response.json()
      // console.log(data)
      const dataAux = data.results.filter((task) => task.backdrop_path != null );
      // console.log(dataAux)
      setMov(dataAux)
  }

  const llamadaApiPorDefecto = async () => {
    const response1 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=1')
    const response2 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=2')
    const response3 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=3')
    const response4 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=4')
    const response5 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=5')
    var data1 = await response1.json()
    const data2 = await response2.json()
    const data3 = await response3.json()
    const data4 = await response4.json()
    const data5 = await response5.json()
    
    setMov(data1.results.concat(data2.results).concat(data3.results).concat(data4.results).concat(data5.results))
    // console.log(data1.results)

  }

  // async function llamadaApiScroll() {
  // const llamadaApiScroll = async () => {
  //   num++;
  //   const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page='+num)
  //   const data = await response.json()
  //   console.log(data.results)
  //   //setMov(data.results.concat(mov)) 
  // }

  return (
    <div className='container'>
      <div className='row'>
        <div  className='col-12'>
          {/* <h1 className='text-white d-flex justify-content-center mt-4 mb-2'>Jony Movies</h1> */}
          <Link href="/">
                        <h1 className="logo d-flex justify-content-center my-5">Jony Movies</h1>
          </Link>
          <div className='row d-flex justify-content-center mt-4'>
            <div className="col-9">
              <input id="text" className="form-control form-control-lg" type="text" placeholder="Buscar pelicula" onChange={buscarPelicula} ></input>
            </div>
          </div>
          <div className="contenedor">
            {mov.map(movie => <Link key={movie.title} href={`/movies/${movie.id}`}>
                                    <div className="pelicula">
                                      <Image className="poster" src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} width={400} height={400}></Image>
                                    </div>
                                  </Link>
            )}
          </div>
          <div ref={observe}>
            {/* comments will load when inView is true */}
            {/* {inView && setAuxView(inView)} */}
            {inView}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  
  const response1 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=1')
  const response2 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=2')
  const response3 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=3')
  const response4 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=4')
  const response5 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=5')
  var data1 = await response1.json()
  const data2 = await response2.json()
  const data3 = await response3.json()
  const data4 = await response4.json()
  const data5 = await response5.json()

  data1 = data1.results.concat(data2.results).concat(data3.results).concat(data4.results).concat(data5.results)

  return{
    props: {movies: data1}
  }
}