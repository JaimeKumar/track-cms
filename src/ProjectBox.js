import React from 'react'
import Project from './Project'

export default function ProjectBox({profile, functions, deselect, imgs}) {
    let prof = {...JSON.parse(profile)}

    function projectsOut(e) {
        deselect(e)
    }

  return (
    <div className='scrollBox' onClick={projectsOut}>
        {prof.projects.map((proj) => {
            return <Project key={proj.id} proj={proj} functions={functions} profile={prof} imgs={imgs}/>
        })}
    </div>
  )
}
