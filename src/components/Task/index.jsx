import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
const Task = ({ task, handleDeleteForm, setEditTask, toggleSetAnyTasks, disabled }) => {
    return (
        <>
            <div >
                <input type="checkbox" onClick={() => toggleSetAnyTasks(task.id)} />
            </div>
            <p>Title: {task.title.slice(0, 15)}</p>

            <div>
                <button className="btn btn-danger" onClick={() => handleDeleteForm(task.id)} disabled={disabled}>
                    <FontAwesomeIcon icon={faTrash} />
                </button >
                <button
                    className="btn btn-warning"
                    style={{ marginLeft: '15px' }}
                    onClick={(e) => setEditTask(task)}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button >
                <button
                    className="btn btn-primary"
                    style={{ marginLeft: '15px' }}
                >
                    {task.complited ? 'InActive' : 'Active'}</button>
            </div>
        </>
    )
}
export default memo(Task);