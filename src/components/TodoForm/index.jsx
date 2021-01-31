import styles from './todoForm.module.css';

const TodoForm = ({ inputValue, handleOnChange, handleSubmitForm, disabled }) => {
    return (
        <div className={styles.todoForm}>
            <input
                type='text'
                placeholder='Գրիր նոր նյութ'
                value={inputValue}
                onChange={handleOnChange}
                disabled={disabled}
            />
            <input
                type='button'
                value='Add'
                onClick={handleSubmitForm}
                disabled={disabled}
            />
        </div>
    )

}
export default TodoForm;