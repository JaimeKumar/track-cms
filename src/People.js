import React from 'react';
import Person from './Person.js';

export default function People({profile, rightClickPerson, imgs}) {
    function clickPerson(e, id) {
        rightClickPerson(e, id)
    }


    let people = [];
    if (profile.projSelected >= 0) {
        people = profile.projects[profile.projSelected].people;
    } else {
        return (
            <div className="scrollBox">
                <i>Select a project to manage people.</i>
            </div>
        )
    }


        return (
            <div className='scrollBox'>
                {people.map(p => {
                    return <Person key={p.id} person={p} clickPerson={clickPerson} mode={profile.mode[0].selected} imgs={imgs} />
                })}
            </div>
        )
}
