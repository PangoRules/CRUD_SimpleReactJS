import React, {useState} from 'react';
import { nanoid } from 'nanoid';

function App() {
    const [tarea, setTarea] = useState({id:0, NombreTarea: ''});

    const [tareasList, setTareasList] = useState([]);

    const [modoEdicion, setModoEdicion] = useState(false);

    const [error, setError] = useState(null);


    /**
     * Función encargada de agrear una nueva tarea.
     * @param {Object} e - Objeto con el evento del formulario.
     */
    const agregarTask = e =>{
        e.preventDefault();
        if(!tarea.NombreTarea.trim()){
            setError('Ingrese una tarea válida');
            return;
        }
        setTarea({id:0, NombreTarea: ''});
        setTareasList(
            [...tareasList,{id: nanoid(), NombreTarea: tarea.NombreTarea}]
        );
    }

    /**
     * Función encargada de eliminar una tarea.
     * @param {Object} tarea - Objeto con los datos de la tarea a eliminar del arreglo de tareas.
     */
    const eliminarTarea = tarea =>{
        // var respuesta = confirm('¿Desea eliminar la tarea: '+tarea.NombreTarea+'?');
        if(true){
            let newTareasList = tareasList.filter(item => item.id !== tarea.id);
            setTareasList(newTareasList);
            setModoEdicion(false);
        }
    }

    /**
     * Función encargada de preparar el formulario de edición
     * @param {Object} tarea - Objeto con los datos de la tarea seleccionada para ser seteados en el formulario de edición
     */
    const setForm = tarea =>{
        setModoEdicion(true);
        setTarea({id: tarea.id, NombreTarea: tarea.NombreTarea});
        setError(null);
    }

    /**
     * Función encargada de editar la tarea seleccionada.
     * @param {Object} e - Objeto con los eventos del formulario. 
     */
    const editarTask = e =>{
        e.preventDefault();
        if(!tarea.NombreTarea.trim()===false){
            let newTareasList = tareasList.map(item => (
                item.id === tarea.id ? {...item, NombreTarea : tarea.NombreTarea} : item
            ));
            setTareasList(newTareasList);
            setModoEdicion(false);
            setTarea({id:0, NombreTarea: ''});
            return;
        }
        setError('Ingrese una tarea válida');
    }

    return (
        <div className="container">
            <h1 className="text-center my-4">CRUD Simple</h1>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de tareas</h4>
                    <ul className="list-group">
                        {
                            tareasList.length === 0 ?
                            (<li className="list-group-item">
                                <span className="lead" >No hay tareas</span>
                            </li>)
                            :
                            tareasList.map((item,index) => (
                                <li key={item.id} className="list-group-item">
                                    <span className="lead" >{ item.NombreTarea }</span>
                                    <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => eliminarTarea(item)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-right" onClick={() => setForm(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">{ modoEdicion ? 'Editar Tarea' : 'Agregar Tarea' }</h4>
                    <form onSubmit={ modoEdicion ? editarTask : agregarTask}>
                        <input type="text" className="form-control mb-2" placeholder='Ingrese Tarea' onChange={e => setTarea({id: tarea.id, NombreTarea: e.target.value})} value={tarea.NombreTarea}/>
                        {
                            error ? <span className="text-danger mb-4">{error}</span> : null
                        }
                        {
                            modoEdicion ? 
                            (<button className="btn btn-warning btn-block text-white my-2" type="submit">Editar</button>) : (<button className="btn btn-dark btn-block my-2" type="submit">Agregar</button>)
                        }
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
