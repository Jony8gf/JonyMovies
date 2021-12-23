import Image from 'next/image'
import Link from 'next/link'

const Person = ({person}) => {

    // console.log(person)

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <Link href="/">
                            <h1 className="logo d-flex justify-content-center my-5">Jony Movies</h1>
                        </Link>

                        <h2 className="text-white text-center mt-5">{person.name} ({person.known_for_department})</h2>

                        <div className="pelicula d-flex justify-content-center mt-4 mb-4 ">
                            {person.profile_path ? <Image className="poster-xl" src={'https://image.tmdb.org/t/p/w500'+person.profile_path} width={400} height={400}></Image>
                                                    :  <Image className="poster-xl" src={'https://cdn-icons-png.flaticon.com/512/121/121693.png'} width={400} height={400}></Image>}
                        </div>

                        {person.biography ? 
                            <div className='biography p-1'>
                                <h3 className='d-flex justify-content-center mt-2'>Biografía:</h3>
                                <p className='mt-2 mb-3 mx-5'>{person.biography}</p>
                            </div>
                         : <p className='mb-5 mx-5'></p>}

                        

                        <div className='info p-1 my-3'>
                            <h3 className='d-flex justify-content-center mt-2'>Información:</h3>
                            <p className='mb-1 mx-5'>Nombre: {person.name}</p>
                            <p className='mb-1 mx-5'>Lugar de Nacimiento: {person.place_of_birth}</p>
                            <p className='mb-1 mx-5'>Fecha de Nacimiento: {person.birthday}</p>
                            {person.deathday ? <p className='mb-1 mx-5'>Fecha de Defunción: {person.deathday}</p> : <p className='mb-3 mx-5'></p>}
                            
                        </div>

                        {person.combined_credits.cast ? 
                            <div className='cast p-1 my-3'>
                                <h3 className='d-flex justify-content-center mt-2'>Trabajos como Interprete:</h3>
                                <ul className="list-group ">
                                    {person.combined_credits.cast.map(x =>

                                        <Link key={x.id + "-" + x.title + "-" + x.character} href={`../movies/${x.id}`}>
                                            <li className="list-group-item d-flex p2">
                                                        {x.poster_path ? <Image className="mini-poster" src={'https://image.tmdb.org/t/p/w500'+x.poster_path} width={40} height={40}></Image>
                                                            :  <Image className="mini-poster" src={'https://img1.picmix.com/output/stamp/normal/5/6/9/7/47965_9cd3f.png'} width={40} height={40}></Image>}
                                                        <p className='mt-4 mx-3'>{x.title} ({x.character})</p>
                                            </li>
                                        </Link>
                                        
                                    )}
                                </ul>
                            </div> 
                        : ""}


                        {person.combined_credits.crew ? 
                            <div className='cast p-1 my-3'>
                                <h3 className='d-flex justify-content-center mt-2'>Trabajos como equipo de producción:</h3>
                                <ul className="list-group ">
                                    {person.combined_credits.crew.map(x =>

                                        <Link key={x.id + "-" + x.title + "-" + x.job} href={`../movies/${x.id}`}>
                                            <li className="list-group-item d-flex p2 ">
                                                        {x.poster_path ? <Image className="mini-poster" src={'https://image.tmdb.org/t/p/w500'+x.poster_path} width={40} height={40}></Image>
                                                            :  <Image className="mini-poster" src={'https://img1.picmix.com/output/stamp/normal/5/6/9/7/47965_9cd3f.png'} width={40} height={40}></Image>}
                                                        <p className='mt-4 mx-3'>{x.title} ({x.job})</p>
                                            </li>
                                        </Link>
                                        
                                    )}
                                </ul>
                            </div> 
                        : ""}




                    </div>
                </div>
            </div>        
        </div>
    )
}


export default Person

export const getServerSideProps = async ({params}) => {
    const urlApi = `https://api.themoviedb.org/3/person/${params.id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&append_to_response=combined_credits`
    const response = await fetch(urlApi)
    const person = await response.json()
    return{props: {person}}
}