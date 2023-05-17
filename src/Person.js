import React from 'react'

export default function Person({person, clickPerson, mode, m, imgs}) {

  function rightClick(e) {
    clickPerson(e, person.id)
  }

  let settingsClass = 'settingsButton';
  let img = imgs[0];

  if (mode) {
    img = imgs[1];
  }

  return (
    <div className='projectBox'>
      <div className='h1'>{person.name}</div>
      <p>{person.role}</p>
      <img className={settingsClass} src={img} alt="Edit Person" onClick={rightClick} />
    </div>
  )
}
