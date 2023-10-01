import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';

import { TareaItem } from './TareaItem'
import { TareaItemForm } from './TareaItemForm';

export const TareaList = () => {
    const lista = [
        {
            id:1,
            descripcion:'Hacer algo',
            marca:false,
        },
        {
            id:2,
            descripcion:'Hacer otra cosa',
            marca:true,
        },
        {
            id:3,
            descripcion:'No olvidarse de ...',
            marca:false,
        }
    ]

  const [setshowDetalle, setSetshowDetalle] = useState(false);

  const [tareaActiva, setTareaActiva] = useState();

  const [listaTareas, setListaTareas] = useState(lista);

  const handleMarkTask = (tarea) => {
        const listUpdated = listaTareas.map(item => {
            if(item.id === tarea.id)
                return {...tarea,marca:!item.marca}            
            else 
                return item;
        });
        setListaTareas(listUpdated);        
        setTareaActiva(tarea);
  }  

  const handleDeleteTask = (tarea) => {
        const listUpdated = listaTareas.filter(item => item.id !== tarea.id);                
        setListaTareas(listUpdated);
        localStorage.setItem('listaTareas',JSON.stringify(listUpdated));        
  }  

  const handleNewTask = () =>{    
    const lastTarea = listaTareas.slice(-1).pop();  
    setTareaActiva({
        id:lastTarea !== undefined  ? lastTarea.id + 1 : 1,
        descripcion:'',
        marca:false,
    });
  }

  const handleGuardarTarea =({id,descripcion:auxDescripcion,marca})=>{  
    let newListTareas = listaTareas.filter(tarea => tarea.id !== id);
    const newListTareasUpdated = [...newListTareas,{id,descripcion:auxDescripcion,marca}];    
    setListaTareas(newListTareasUpdated);
    setTareaActiva();
    localStorage.setItem('listaTareas',JSON.stringify(newListTareasUpdated));
  }

  const handleCancelTask =()=>{
    setTareaActiva(null);
  }

  

   useEffect(() => {

    let listaTareasStored = null;
    if(localStorage.getItem('listaTareas')!== null){
        listaTareasStored = JSON.parse(localStorage.getItem('listaTareas'));     
        setListaTareas(listaTareasStored);    
    } else
        setListaTareas([]);

   }, []);
  

  return (
    
    <div className="container-fluid mt-5">  
        
        <div className="d-flex justify-content-center">
            <div className="mx-5">
                <div className="d-flex justify-content-between">
                    <h1 className='text-center mb-3 align-items-center'>Lista de Tareas</h1>
                    <Icon icon="carbon:add-filled" color="#d1e7dd" width="60" 
                     onClick={handleNewTask}/>                    
                </div>                    
                <div className="list-group">
                    {listaTareas.map((item)=>{
                        return <TareaItem key={item.id} {...item} 
                                   handleMarkTask={handleMarkTask}
                                   handleDeleteTask={handleDeleteTask}/>
                        })
                    }
                </div>
            </div>
            
            <div className="col-12 col-md-4">
                <div className="mx-5">
                    <div className="d-flex justify-content-between">
                        <h1 className='text-center mb-3 align-items-center'>Detalle Tarea</h1>                                     
                    </div>  
                    {!!tareaActiva
                        ?<TareaItemForm {...tareaActiva} 
                            handleGuardarTarea={handleGuardarTarea} 
                            handleCancelTask={handleCancelTask}
                            />
                        :''
                    }              
                </div>    
            </div>
        </div>
    </div>
  )
}
