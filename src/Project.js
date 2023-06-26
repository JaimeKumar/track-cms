import React from 'react'

export default function Project({proj, functions, profile, imgs, mode}) {

  function selectProject() {
    functions.projectSelect(proj.id);
  }

  let img = imgs[0];

  if (mode[0].selected) {
    img = imgs[1];
  }

  function editProject(e) {
    e.preventDefault();
    functions.editProj(proj.id);
  }

  let subTitle = '';
  if (proj.people.find(p=>p.role==='Artist')) {
    subTitle = 'with ' + proj.people.find(p=>p.role==='Artist').name;
  } else {
    subTitle = 'with ' + proj.people[0].name;
  }

  if (proj.people.length-1 > 0) {
    subTitle += ' and ' + (proj.people.length-1) + ' others'
  }

  let styling = 'projectBox';

  if (functions.projSelected >= 0 && profile.projects[functions.projSelected].id === proj.id) {
    styling += ' selected'
  }

  return (
    <div className={styling} onClick={selectProject} onContextMenu={e => e.preventDefault()}>
      <h2>{proj.name}</h2>
      <p>{subTitle}</p>
      <img src={img} alt="Project Settings" onClick={editProject} />
    </div>
  )
}
