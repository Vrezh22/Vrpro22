import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faEdit} from '@fortawesome/free-solid-svg-icons'
const Task = ({ task , handleDeleteForm}) => {
    return (
        <>
            <p>Title: {task.text.slice(0, 15)}</p>
            <p>Text: {task.text}</p>
            <div>
                <button clasName="btn btn-danger" onClick={()=>handleDeleteForm(task._id)}>
                <FontAwesomeIcon icon={faTrash} />
                </button >
                <button clasName="btn btn-warning" >
                <FontAwesomeIcon icon={faEdit} />
                </button >
            </div>
        </>
    )
}
export default Task;