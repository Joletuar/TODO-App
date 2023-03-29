import { Todo } from '../components';

export const ListTodoView = ({ todos }) => {
    return (
        <div className='container-xl mt-4'>
            <div className='row gap-2 justify-content-center'>
                {todos.map((todo) => (
                    <Todo key={todo._id} todo={todo} />
                ))}
            </div>
        </div>
    );
};
