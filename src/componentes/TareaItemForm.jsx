import React, { useEffect, useState } from 'react'

export const TareaItemForm = ({id,descripcion,marca,handleGuardarTarea,handleCancelTask}) => {

    const [auxDescripcion, setAuxDescripcion] = useState(descripcion);

    const onChangeDescripcion=(e)=>{
        setAuxDescripcion(e.target.value);
    }

    const onClickCancel=()=>{
        handleCancelTask();
    }

    const onClickGuardar=()=>{        
        handleGuardarTarea({id,descripcion:auxDescripcion,marca});
    }

    useEffect(() => {
      setAuxDescripcion(descripcion);    
    }, [id])
    

  return (
    <div className='border rounded border-success-subtle p-5'>
        <span> ID : {id}</span>
        <input 
        className="form-control" type="text" placeholder="Descripcion tarea" 
        aria-label="descripcion tare" 
        value={auxDescripcion}
        onChange={onChangeDescripcion}/>

        <div className="d-flex justify-content-evenly mt-5">
            <button                 
                onClick={onClickGuardar}
                type="button" className="btn btn-outline-primary">Guardar</button>
            <button 
                onClick={onClickCancel}
                type="button" className="btn btn-outline-secondary">Cancelar</button>
        </div>

    </div>
  )
}
