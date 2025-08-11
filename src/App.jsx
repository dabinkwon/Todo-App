import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ]);

  return (
    <>
      <h1 className="title">ToDoList</h1>
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />      
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="todo-input">
      <input className="todo-input-text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="할 일을 입력하세요."
      />
      <button className="todo-input-btn"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
      등록
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todoList">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  //  수정 button 숨길지 말지 결정하기 위한 상태 변화
  const [inputHide, setInputHide] = useState(false);
  const toggleInput = () => {
    setInputHide((prev) => !prev);
  };
  return (
    <li className="todo">
      <input
        className= "input-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, completed: !el.completed } : el
            )
          );
        }}
      />
      <span className="todo-item">{todo.content}</span>
      {/* 처음에는 무조건 toggleInput이 false로 수정이 보여짐 */}
      {/* 삼항 연산자를 이용해서 false일때 수정버튼만 보이게 만들기 */}
      {/* true가 되면 input칸이 보여지며 수정할 수 있는 환경 만들기 */}
      {inputHide ? (
        <>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="modify-completed-btn"
            onClick={() => {
              toggleInput(),
                setTodoList((prev) =>
                  prev.map((el) =>
                    el.id === todo.id ? { ...el, content: inputValue } : el
                  )
                );
            }}
          >
            수정완료
          </button>
        </>
      ) : (
        <button className="modify-btn" onClick={toggleInput}>수정</button>
      )}

      <button className="delete-btn"
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
