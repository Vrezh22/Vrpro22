import styles from './todoForm.module.css';

const TodoForm = ({inputValue , handleOnChange , handleSubmitForm})=>{
    return(
        <div className={styles.todoForm}>
            <input
            type='text'
            placeholder='Գրիր նոր նյութ'
            value={inputValue}
            onChange={handleOnChange}
            />
            <input
             type='button'
             value='Add'
             onClick={handleSubmitForm}
            />
        </div>
    )

}
export default TodoForm;