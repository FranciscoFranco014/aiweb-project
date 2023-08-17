import { useState } from "react"
import { Link } from "midu-router"

export default function ImagePage() {
    const [prompt, setPrompt] = useState('')
    return(
        <>
        <div>
            <h1>Create your image</h1>
        </div>
        <div>
            <form onSubmit={(e) =>{
                e.preventDefault()
                console.log(prompt)
            }}>
            <input
                
                type='text'
                placeholder='write your prompt'
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt} 
            />
            <button>Generate Image</button>

            </form>
            <br />
            <Link to='/'>ir al Home</Link>
        </div>
      </> 
    )
}