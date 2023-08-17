import { Link } from "midu-router";

export default function HomePage(){
    return(
        <>
            <h2>Home</h2>
            <p>Esto es una muestra de que funciona</p>
            <Link to='/about'>Ir al about</Link>
            <br />
            <Link to='/image'>Ir al ImagePage</Link>
            <br />
            <Link to='/chat'>Ir al ChatPage</Link>
            
        </>
    )
}