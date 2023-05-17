import React from 'react'

export default function Message({msg, people, username}) {

  let message = msg.message;
  let names = people.map(p => (p.name.toUpperCase().replace(' ', '')))
  let msgStyle = 'message';
  let msgArray = message.split(' ');

  msgArray.forEach((word, i) => {
    if (names.includes(word.toUpperCase()) || names.includes(word.toUpperCase().replace('@', ''))) {
      if (username.toUpperCase() === word.toUpperCase() || username.toUpperCase() === word.toUpperCase().replace('@', '')) {
        msgStyle += ' atYou'
      }
      msgArray[i] = (<div className='at'>{word}&nbsp;</div>)
    } else {
      msgArray[i] = (<>{word}&nbsp;</>)
    }
  });



  return (
    <div className={msgStyle}>
      <strong>{msg.sender.name + ':'}</strong>
      &nbsp; 
      {/* {returnHTML()} */}
      {msgArray.map(word => (
        word
      ))}
    </div>
  )
}
