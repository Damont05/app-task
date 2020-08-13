import React, { Component } from 'react';


class App extends Component{

    constructor() {
        super();
        this.state = {
          title: '',
          description: '',
          _id: '',
          tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }
    
    //Crear Tareas
    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`/api/task/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: this.state.title,
              description: this.state.description
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: 'TAREA ACTUALIZADA'});
              this.setState({_id: '', title: '', description: ''});
              this.fetchTasks();
            });
        } else {
          fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              window.M.toast({html: 'TAREA GUARDADA'});
              this.setState({title: '', description: ''});
              this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
    
    }

    //Eliminar tareas
    deleteTask(id){

        let mensaje = confirm('¿Estas seguro que quieres eliminar esta tarea?');

        if(mensaje) {

            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {

                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'TAREA ELIMINADA'});
                    this.fetchTasks();
                });
        }  
    }

     //Editar tareas

    editTask(id) {
        fetch(`/api/task/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              title: data.title,
              description: data.description,
              _id: data._id
            });
        });
    }
    
      componentDidMount() {
        this.fetchTasks();
    }
    
    fetchTasks() {
        fetch('/api/task')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
        });
    }


    render() {
        return (

            <div >
                {/*NAVIGATION*/}
            
                <nav className="grey darken-4">

                    <div className="container">

                        <div className="nav-wrapper">
                            
                            <a href="/" className="brand-logo">TASKDAMONT</a>
                            
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/">Salir</a></li>
                            </ul>
                        </div>
                    </div> 
                </nav>

                <div className= "container">
                    
                    <div className= "row">

                        <div className= "col s5">

                            <div className="card ">

                                <div className="card-content grey darken-4">

                                    <form onSubmit={this.addTask}>

                                        <div className="row">

                                            <div className="input-field col s12">

                                                <input name= "title" type="text" onChange={this.handleChange} value={this.state.title} style={{color: "white"}} placeholder="Titulo de la Tarea" autoFocus/>
                                                
                                            </div> 

                                        </div>

                                        <div className="row">

                                            <div className="input-field col s12">

                                                <textarea name="description" onChange={this.handleChange} value={this.state.description} style={{color: "white"}} cols="30" rows="10" placeholder="Descripcion de la Tarea por hacer" className="materialize-textarea"></textarea>
                                          
                                            </div> 

                                        </div>

                                        <button type="submit" className="btn" style={{color: "black"}}> Guardar 

                                        <i class="material-icons right" style={{color: "black"}}>save</i>
                                        
                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>


                        <div className= "col s7">

                            <div className= "card grey darken-2">

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Descripcion</th>

                                        </tr>

                                    </thead>

                                    <tbody>


                                        {
                                            this.state.tasks.map(task => {
                                                return(
                                                    <tr key={task._id}>
                                                        <td >{task.title}</td>
                                                        <td>{task.description}</td>
                                                        <td>
                                                            <button onClick={() => this.editTask(task._id)} className="btn"  style={{margin: '4px'}}>
                                                                <i className="material-icons" style={{color: "black"}}>edit</i>
                                                            </button>

                                                            <button className="btn" onClick={() => this.deleteTask(task._id)}>
                                                                <i class="material-icons" style={{color: "black"}}>delete_forever</i>
                                                            </button>
                                                            
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>


                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>       
        )
    }
}

export default App;