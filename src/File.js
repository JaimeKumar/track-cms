import React from 'react'

export default function File({file, fileClick, mode, rightClickFile, imgs}) {
  let style = 'file';
  let tickedClass = 'tickBox'

  let img = imgs[0]
  if (mode[0].selected) {
    img = imgs[1];
  }

  if (file.selected) {
    tickedClass += ' ticked'
  }

  function clickFile(e) {
    fileClick(file.id)
  }

  function fileRightClick(e) {
    e.preventDefault();
    rightClickFile(e, file.id);
  }

  if (mode[0].selected) {
    style += ' lightModeItem'
  }

  return (
    <div className={style} onClick={clickFile}>
      <div id={file.id + 'tick'} className={tickedClass}></div>
      <span style={{maxWidth: '80%'}}>{file.name}</span>
      <img className='settingsButton smaller' src={img} onClick={fileRightClick} alt='File Settings' />
    </div>
  )
}
