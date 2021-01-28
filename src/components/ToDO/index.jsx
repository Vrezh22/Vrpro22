import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import TodoForm from '../TodoForm';
import Task from '../Task';
import { connect } from 'react-redux';

class Todo extends React.Component {
    state = {
        inputValue: ''
    }
    handleOnChange = ({ target }) => {
        this.setState({
            inputValue: target.value
        })
    }
    handleSubmitForm = (event) => {
        if (!this.state.inputValue)
            return;
        this.props.addPost(this.state.inputValue);
        this.setState({
            inputValue: ''
        })
    }
    handleDeleteForm = (_id) => {
        return this.props.deletePost(_id);
    }


    render() {
        const { tasks } = this.props;
        const { inputValue } = this.state;
        const tasksJSX = tasks.map(task => {

            return (
                <Col key={task._id} xs={12} sm={6} md={4} style={{ border: '1px solid black' }}>
                    <Task task={task} handleDeleteForm={this.handleDeleteForm} />
                </Col>
            )
        })

        return (
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <TodoForm
                            inputValue={inputValue}
                            handleOnChange={this.handleOnChange}
                            handleSubmitForm={this.handleSubmitForm}
                        />
                    </Row>
                    <Row>
                        {tasksJSX}
                    </Row>
                </Container>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.todoState.tasks
    }
}
const mapDispacthToProps = (dispatch) => {
    return{
        addPost: (text)=> dispatch({type:'ADDPOST' , text:text}),
        deletePost:(_id)=> dispatch({type:'DELETEPOST', _id:_id})
    }
}
const TodoContainer = connect(mapStateToProps,mapDispacthToProps)(Todo);

export default TodoContainer;