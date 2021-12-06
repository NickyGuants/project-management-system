import React, {useEffect} from 'react'
import './project.css'
import { useSelector, useDispatch } from 'react-redux'
import {getProjects} from '../../redux/actions/projectActions'

const Project = () => {

    const { projects } = useSelector(state => state.projects)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    return (
        <div>
            {projects?.map((project) => {
                return (
                    <div key={project.project_id} className="project-card">
                        <h1>{project.project_name}</h1>
                        <p>{ project.project_description}</p>
                        <p>Complete Tasks = 13/20</p>
                        <p>Due Date: 20 Dec</p>
                    </div>
                )
            })}
       </div> 
    )
}
export default Project

