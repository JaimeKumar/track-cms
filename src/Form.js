import React from 'react'

export default function Form({profile, nameRef, emailRef}) {
  return (
    <div className="guiInner" style={{height: '70%'}}>
        <span>Name</span>
        <input ref={nameRef} defaultValue={profile.name}></input>
        <span>Email</span>
        <input ref={emailRef} defaultValue={profile.email}></input>
    </div>
  )
}
