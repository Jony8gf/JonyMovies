import Image from 'next/image'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel';

const Movie = ({data, dataMovie}) => {
    // console.log(data)
    // console.log(dataMovie)

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Link href="/">
                        <h1 className="logo d-flex justify-content-center my-5">Jony Movies</h1>
                    </Link>
                    <h2 className="text-white text-center mt-5">{data.title}</h2>
                    <div className="pelicula d-flex justify-content-center mt-4 mb-4 ">
                        {data.poster_path ? <Image className="poster-xl" src={'https://image.tmdb.org/t/p/w500'+data.poster_path} width={400} height={400}></Image>
                            :  <Image className="poster-xl bg-white" src={'https://img1.picmix.com/output/stamp/normal/5/6/9/7/47965_9cd3f.png'} width={400} height={400}></Image>}
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <a className="imdb-logo">IMDb</a>
                        <h4 className='nota text-white mt-2'>{data.vote_average}</h4>
                    </div>
                    <div className='sipnosis p-1'>
                        <h3 className='d-flex justify-content-center mt-2'>Sipnosis:</h3>
                        <p className='mt-2 mb-3 mx-5'>{data.overview}</p>
                    </div>
                    <div className='info p-1 my-3'>
                        <h3 className='d-flex justify-content-center mt-2'>Información Adiccional:</h3>
                        <div className='mt-2 mb-1 mx-5 d-flex'>Generos: {data.genres.map(x =>
                             <p className='mx-1 my-0' key={x.id}> {x.name} </p>)}
                        </div>
                        <p className='mb-1 mx-5'>Presupuesto: {data.budget}$</p>
                        <p className='mb-1 mx-5'>Ingresos: {data.revenue}$</p>
                        <p className='mb-1 mx-5'>Fecha de lanzamiento: {data.release_date}</p>
                        <div className='mt-2 mb-1 mx-5 d-flex'>Productoras: {data.production_companies.map(x =>
                             <p className='mx-1 my-0' key={x.id}> {x.name} </p>)}
                        </div>
                        <div className='mt-2 mb-1 mx-5 d-flex'>Países de producción: {data.production_countries.map(x =>
                             <p className='mx-1 my-0' key={x.id}> {x.name} </p>)}
                        </div>
                        <p className='mb-1 mx-5'>Titulo original: {data.original_title}</p>
                        <p className='mb-1 mx-5'>Votos en IMBD: {data.vote_count}</p>
                    </div>
                    <Carousel>
                        {dataMovie.videos.results.map(x =>
                                <Carousel.Item>
                                    <iframe width="560" height="315" className="d-block w-100" src={`https://www.youtube.com/embed/${x.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                
                                )}
                    </Carousel>
                    <div className='cast p-1 my-3'>
                        <h3 className='d-flex justify-content-center mt-2'>Reparto:</h3>
                        <ul className="list-group ">
                            {data.credits.cast.map(x =>

                                <Link  href={`../person/${x.id}`}>
                                    <li className="list-group-item d-flex p2" key={x.id +"-"+ x.title +"-"+ x.name +"-"+ x.character}>
                                                {x.profile_path ? <Image className="rounded-circle" src={'https://image.tmdb.org/t/p/w500'+x.profile_path} width={40} height={40}></Image>
                                                    :  <Image className="rounded-circle" src={'https://cdn-icons-png.flaticon.com/512/121/121693.png'} width={40} height={40}></Image>}
                                                <p className='mt-4 mx-3'>{x.name} ({x.character})</p>
                                    </li>
                                </Link>
                                
                            )}
                        </ul>
                    </div>
                    <div className='crew p-1 my-3'>
                        <h3 className='d-flex justify-content-center mt-2'>Equipo de producción:</h3>
                        <ul className="list-group ">
                            {data.credits.crew.map(x =>

                            <Link  href={`../person/${x.id}`}>
                                <li className="list-group-item d-flex p2" key={x.id +"-"+ x.title +"-"+ x.name +"-"+ x.job +"-"+ x.known_for_department} >
                                            {x.profile_path ? <Image className="rounded-circle" src={'https://image.tmdb.org/t/p/w500'+x.profile_path} width={40} height={40}></Image>
                                                :  <Image className="rounded-circle" src={'https://cdn-icons-png.flaticon.com/512/121/121693.png'} width={40} height={40}></Image>}
                                            <p className='mt-4 mx-2 font-weight-bold'>{x.name}</p>
                                            <p className='mt-4 mx-0'>{x.job} ({x.known_for_department})</p>
                                </li>
                            </Link>
                            )}
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Movie

// export const getStaticProps = async ({params}) => {
//     const urlApi = `https://api.themoviedb.org/3/movie/${params.id}?api_key=192e0b9821564f26f52949758ea3c473&language=es`
//     const response = await fetch(urlApi)
//     const data = await response.json()
//     return{props: {data}}
// }

export const getServerSideProps = async ({params}) => {
    //https://api.themoviedb.org/3/person/3?api_key=192e0b9821564f26f52949758ea3c473&append_to_response=combined_credits
    const urlApi = `https://api.themoviedb.org/3/movie/${params.id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&append_to_response=credits`
    const response = await fetch(urlApi)
    const data = await response.json()
    const urlApiMovie = `https://api.themoviedb.org/3/movie/${params.id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&append_to_response=videos`
    const responseMovie = await fetch(urlApiMovie)
    const dataMovie = await responseMovie.json()
    return{props: {data, dataMovie}}
}