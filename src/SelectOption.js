import React from 'react'

export default function SelectOption({option, optionClick, mode}) {

    function clickOption(e) {
        optionClick(option)
    }

  return (
    <div className='selectOption' onClick={clickOption}>
      <div className="selectHover"></div>
      <p>{option.txt}</p>
    </div>
  )
}
