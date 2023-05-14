import React, { useEffect, useState } from "react";
import "./App.css";

import Messages from "./Messages/Messages";
import NewMessage from "./NewMessage/NewMessage";


function randomName() {
    const adjectives = ["Ivan", "Ivana", "Marin", "Marina", "Viktor", "Viktorija", "Karlo", "Karla", "Tomislav", "Tomislava"];
    const nouns = ["Horvat", "Peric", "Ivic", "Petrovic", "Stanek", "Ivancan", "Lipic", "Novak"];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    //return adjective + '' + noun;
    return `${adjective} ${noun}`;
}

function randomColor() {
    // return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    const colors = [ '#6600CC', '#00FF66', '#FF3399', '#FF6666', '#00695C', '#FF5722', '#546E7A', '#1976D2', '#9C27B0', '#660000', '#336633', '#000066', '#003366', '#99FF00', '#990066' ];

    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function App () {
    const [messages, setMessages] = useState([]);

    const [username, setUsername] = useState(randomName());

    const [clientId, setClientId] = useState();
    
    const [color, setColor] = useState(randomColor());

    const [drone, setDrone] = useState();

    const roomName = 'observable-red-rum'


    useEffect(function() {
        const drone = new window.Scaledrone("r3L2NUYI7CY6rDnq", {
            data: {
                name: username,
                color: color
            },
        });

        drone.on("open", (error) => {
            if (error) {
                return console.log(error);
            }
            setClientId(drone.clientId)
        });

        const room = drone.subscribe(roomName);

        room.on("message", (message) => {
            console.debug(message + "is added");
            const { data, id, clientId, member} = message

            setMessages(oldMessages => {
                if (!messages) {
                    console.error("messages je prazan")
                }
                return[...oldMessages, {member, text: data}];
            });
        });

        setDrone(drone);

        return () => {
            room.unsubscribe();
            drone.close();
        }
    }, []);

    const sendMessageToChat = (message) => {
        drone.publish({
            room: roomName,
            message
        });
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1>Welcome, user!</h1>
            </div>
            <Messages 
                messages={messages}
                currentMember={{
                    username, color, clientId
                }}
            />

            <NewMessage sendMessage = {sendMessageToChat}/>
        </div>

    );

}

export default App;