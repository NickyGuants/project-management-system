import React, {useEffect} from 'react'
import './task.css'
import { useSelector, useDispatch } from 'react-redux'
import {getTasks} from '../../redux/actions/taskActions'

const Task = () => {
    const { tasks } = useSelector(state => state.tasks)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <div>
            {tasks?.map((task) => {
                return (
                    <div key={task.task_id} className="project-card">
                        <h1>{task.task_name}</h1>
                        <p>{ task.task_description}</p>
                        <p>Complete Tasks = 13/20</p>
                        <p>Due Date: 20 Dec</p>
                    </div>
                )
            })}
       </div> 
    )

    // return (
    //     <div className="task-card">
    //         <h1>My Tasks (10)</h1>
    //         <div className="task-item">
    //             <p>1</p>
    //             <p>Create Wireframe</p>
    //             <p>icon</p>
    //         </div>
    //         <div className="task-item">
    //             <p>1</p>
    //             <p>Logo Design</p>
    //             <p>icon</p>
    //         </div>
    //         <div className="task-item">
    //             <p>1</p>
    //             <p>Dashboard design</p>
    //             <p>icon</p>
    //         </div>
    //         <div className="task-item">
    //             <p>1</p>
    //             <p>Redux integration</p>
    //             <p>icon</p>
    //         </div>
    //         <div className="task-item">
    //             <p>1</p>
    //             <p>Create header</p>
    //             <p>icon</p>
    //         </div>
    //     </div>
    // )
}

export default Task
