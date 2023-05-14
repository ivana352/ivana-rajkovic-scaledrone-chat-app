import { useState } from "react";

const NewMessage = (props) => {
    const [text, setText] = useState("");

    const onChange = (event) => {
        setText(event.target.value)
    };

    const onSendMessage = () => {
        setText("");
        props.sendMessage(text);
    };
    
    return(
        <div className="new-message-container">
            <input
                onChange={(event) => onChange(event)}
                value={text}
                type="text"
                placeholder="Enter your message here."
                autoFocus= {true}
            />
                        
             <button onClick={() => onSendMessage()} disabled={text.length === 0}> Send ▶ </button>

                    
        </div>          
    )
};
        


export default NewMessage;