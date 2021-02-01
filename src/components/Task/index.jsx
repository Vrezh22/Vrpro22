import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
const Task = ({ task, handleDeleteForm, setEditTask, toggleSetAnyTasks,disabled }) => {

    return (
        <>
            <div >
                <input type="checkbox" onClick={() => toggleSetAnyTasks(task._id)} />
            </div>
            <p>Title: {task.text.slice(0, 15)}</p>
            <p>Text: {task.text}</p>
            <div>
                <button className="btn btn-danger" onClick={() => handleDeleteForm(task._id)} disabled={disabled}>
                    <FontAwesomeIcon icon={faTrash} />
                </button >
                <button
                    className="btn btn-warning"
                    style={{ marginLeft: '15px' }}
                    onClick={() =>{
                        console.log('Tak CLick');
                        setEditTask(task);
                    }}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button >
            </div>
        </>
    )
}
export default Task;