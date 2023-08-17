import { useState, useEffect } from "react";
import { Link } from "midu-router";

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";


 const API_KEY = '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';


export default function ChatBot() {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hi, I am your chat assistant.",
            sender: "ChatGPT"
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }

        const newMessages = [...messages, newMessage] // contiene todos los mensajes viejos, mas los nuevos

        setMessages(newMessages)

        setTyping(true)
        await processMessageToChatGPT(newMessages)
    }

    async function processMessageToChatGPT(chatMessages){

        let apiMessages = chatMessages.map((messageObject) => {
            let role = ""
            if(messageObject.sender === "ChatGPT"){
                role = "assistant"
            
            } else {
                role = "user"
            }
            return { role: role, content: messageObject.message}
        })

        const systemMessage = {
            role: "system",
            content: "Explain all concepts like I am 10 years old"
        }



        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages":
            [
                systemMessage,
                ...apiMessages
            ]
        }
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then((data)=> {
            console.log(data)
            console.log(data.choices[0].message.content)
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            )
            setTyping(false)
        })
    }
    return (
    <>
        <div className="App"> 
            <h1>Chatbot Page</h1> 
            <div style={{position: "relative", height: '650px', width: '600px', color: "black"}}>
                <MainContainer>
                    <ChatContainer style={{backgroundColor: "#4E6956"}}>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing"/> : null}>
                            {messages.map((message, i) => {
                                return <Message key={i} model={message}/>
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type your prompt here" onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        
            <br />
            <Link to='/'>Ir al home</Link>
        </div>
    </>
     );
}



// async function getCompletion(){
//     const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//             model : 'gpt-3.5-turbo',
//             messages: [{'role': 'user', 'content': 'Hello!'}],
//             temperature: 0.8,
//             max_tokens: 7,
//         })
//     })
//     const data = await response.json()
//     console.log(data)
//     return data
//     }
//  export default function Chatbot() {
//     const [inputPrompt, setInputPrompt] = useState("");
//     const [outputText, setOutputText] = useState("");

//     async function onSubmit(e){
//         e.preventDefault()
//         try{
//             const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     model: 'text-davinci-003',
//                     prompt,
//                     // model : 'gpt-3.5-turbo',
//                     // messages: [{"role": "system", "content": "You are a helpful assistant."},{'role': 'user', 'content': 'Hello!'}],
//                     temperature: 0.8,
//                     max_tokens: 7,
//                 })
//             })

//             const data = await response.json()
//             if(response.status !== 200){
//                 throw data.error || new Error(`Request failed with status ${response.status}`)
//             }

//             setOutputText(data.outputText)
//             setInputPrompt('')
//         } catch(error){
//             console.log(error)
//             alert(error.message)
//         }
//     }

//     const handleButtonClick = async () => {
//         if (!inputPrompt) {
//           window.alert("Please enter a prompt");
//           return;
//     }

//     const response = await getCompletion(prompt.value);
//     console.log(response)
// }