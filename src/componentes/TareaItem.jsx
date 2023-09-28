import React, { useEffect, useState } from 'react'

export const TareaItem = ({id,descripcion,marca,handleMarkTask,handleDeleteTask}) => {

   const [checked, setChecked] = useState(marca);
  
  const handleCheckbox = ()=>{   
    handleMarkTask({id,descripcion,marca})
  }

  const handleBtnDeleteTask = ()=>{   
    handleDeleteTask({id,descripcion,marca})
  }

  useEffect(() => {
    setChecked(marca);      
  }, [marca])
  

  return (
    <>        
        <li className={`list-group-item list-group-item-success d-flex`}>
            <input className="form-check-input me-1" 
                    type="checkbox" 
                    value="" 
                    id={`taskId${id}`}
                    checked={checked}
                    onChange={handleCheckbox}                   
                />
            <label className="form-check-label px-2" htmlFor={`taskId${id}`}>{descripcion}</label> 
            <button type="button" className="btn btn-danger ms-auto p-2"
                onClick={handleBtnDeleteTask}>X</button>           
        </li>
    </>
  )
}
