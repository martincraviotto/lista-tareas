import React, { useState } from 'react'
import { Icon } from '@iconify/react';

import { TareaItem } from './TareaItem'

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

  const [listaTareas, setListaTareas] = useState(lista);

  const handleMarkTask = (tarea) => {
        const listUpdated = listaTareas.map(item => {
            if(item.id === tarea.id)
                return {...tarea,marca:!item.marca}            
            else 
                return item;
        });
        setListaTareas(listUpdated);
  }  

  const handleDeleteTask = (tarea) => {
        const listUpdated = listaTareas.filter(item => item.id !== tarea.id);                
        setListaTareas(listUpdated);
  }  

  return (
    
    <div className="container-fluid mt-5">  
        
        <div className="d-flex justify-content-center">
            <div className="">
                <div className="d-flex justify-content-between">
                    <h1 className='text-center mb-3 align-items-center'>Lista de Tareas</h1>
                    <Icon icon="carbon:add-filled" color="#d1e7dd" width="60" />                    
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
                <h1 className='text-center mb-3'>
                    Detalle de Tarea                     
                </h1>                
            </div>
        </div>
    </div>
  )
}
