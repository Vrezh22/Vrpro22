import idGenerator from '../helpers/idGenerator';
import { renderComponentsTree } from '../index';

const store = {
    state: {
        toDo: {
            tasks: [
                {
                    _id: idGenerator(),
                    text: 'Կումայրի քաղաքը այժմյան Գյումրեցիների բնակված տարածքն է եղել և քաղաքի հին անունը պայմանավորված է Կիմերական ցեղերի բրոնզեդարյան շրջանում այդտեղ բնակեցմամբ'
                },
                {
                    _id: idGenerator(),
                    text: 'Լենինական քաղաքը այժմյան Գյումրեցիների բնակված տարածքն  և քաղաքի  անունը դրված է այդժամ ԽՍՀՄ ղեկավար Վլադիմիր Լենինի պատվին '
                },
                {
                    _id: idGenerator(),
                    text: 'Ալեքսանդրապոլ  քաղաքը այժմյան Գյումրեցիների բնակված տարածքն  և քաղաքի  անունը դրված է այդժամ Ռուս ցար Պյոտր 1-ի կնոջ Ալեքսանդրայի պատվին և հանդիսացել է թագուհու անձնական նստավայրը'
                }
            ],
        }
    },
    getState: function () {
        return this.state;
    },
    setState: function (newState) {
        this.state = { ...newState };
        return renderComponentsTree();
    },
    dispatch: function (action) {
        switch (action.type) {
            case 'onChange': {


                break;
            }
            case 'ADDPOST': {
                const tasks = [...this.state.toDo.tasks];
                tasks.push({
                    _id: idGenerator(),
                    text: action.text
                })
                this.setState({
                    ...this.state,
                    toDo: {
                        ...this.state.toDo,
                        tasks
                    }
                })
                break;
            }
            case 'DELETEPOST': {
                let tasks = [...this.state.toDo.tasks];
                const { _id } = action;
                tasks = tasks.filter(task => task._id !== _id);
                this.setState({
                    ...this.state,
                    toDo: {
                        ...this.state.toDo,
                        tasks
                    }
                })
                break
            }

            default: return;
        }

    }
}
export const dispatch = store.dispatch.bind(store);

export default store;