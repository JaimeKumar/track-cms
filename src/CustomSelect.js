import React from 'react'
import SelectOption from './SelectOption'

export default function CustomSelect({ profile, clickedOption, expandSelect, fileCat, cats, forUpload, mode }) {
    function clickOption(option) {
        clickedOption(option);
    }

    let style = 'fileSelectContainer';
    if (forUpload) style = 'fileSelectUpload';

  return (
    <div className={style}>
        <div className='fileSelect' onClick={expandSelect}>
            <span className={'selectOption ' + mode.find(m => m.selected).text.toLowerCase()}>{fileCat.txt}</span>
            <span style={{position: 'absolute', right: '15px', color: 'var(--fg)', zIndex: '4'}}>▼</span>
            {cats.map(cat => {
                return <SelectOption key={cat.key} option={cat} optionClick={clickOption} mode={mode}/>
            })}
        </div>
    </div>
  )
}
