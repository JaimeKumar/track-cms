import React from 'react'

export default function RoleSuggestion({role, roleClicked, highlighted}) {

    function doClick() {
        roleClicked(role)    
    }

    let styling = 'listItem';
    if (highlighted) {
        styling += ' roleHighlighted'
    }

  return (
    <li className={styling} onClick={doClick}>
      {role}
    </li>
  )
}
