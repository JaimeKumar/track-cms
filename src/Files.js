import React from 'react'
import File from './File'

export default function Files({profile, fileCat, clickFile, clickFileRight, imgs}) {
    let files = [];
    if (profile.projSelected >= 0) {
        files = profile.projects[profile.projSelected].files;
    } else {
      return (
        <div className="scrollBox">
          <i>Select a project to manage files.</i>
        </div>
      )
    }

    function fileclickRight(e, id) {
      clickFileRight(e, id);
    }

  return (
    <div className='scrollBox'>
        {files.map(file => {
          if (fileCat.id === file.cat || fileCat.id === 0) {
              return <File key={file.id} file={file} fileClick={clickFile} mode={profile.mode} rightClickFile={fileclickRight} imgs={imgs} />
          }
        })}
    </div>
  )
}
