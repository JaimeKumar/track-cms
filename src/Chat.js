import React, { useEffect } from "react";
import Message from './Message'

export default function Chat({profile, chatInputRef, handleKey, sendMessage, sendScroll, m}) {

    useEffect(() => {
      sendScroll()
    }, [])

    let sbID = 'chatScroll';
    if (m) {
      sbID += 'Mobile'
    }

    let chat = [];
    if (profile.projSelected >= 0) {
        chat = [...profile.projects[profile.projSelected].chat];
    } else {
      return (
        <div className="chatContainer">
          <div className="scrollBox">
            <i>Select a project to chat.</i>
          </div>
        </div>
      )
    };

  return (
    <div className='chatContainer'>
        <div id={sbID} className='scrollBox' style={{userSelect: 'auto'}}>
            {chat.map((message) => {
                return <Message key={message.id} msg={message} mode={profile.mode} people={profile.projects[profile.projSelected].people} username={profile.name}/>
            })}
      </div>

      <div className='chatInputContainer'>
        <input disabled={(profile.projSelected < 0)} autoComplete='off' id='chatInput' className='chatInput' ref={chatInputRef} onKeyDown={handleKey} type="text" ></input>
        <div className='sendMsg' alt='send message button' onClick={sendMessage}> </div>
      </div>

    </div>
  )
}
