import React from "react";


const ToDoItem = props => {

    function dragStartHendler(e, card) {
        e.preventDefault();

    }

    function dragEndHendler(e) {
        e.preventDefault();

    }

    function dragOverHendler(e) {
        e.preventDefault();

    }

    function dropHendler(e, card) {
        e.preventDefault();
    }

    return (
        <div  
            // onDragStart={(e) => dragStartHendler(e, card)}
            // onDragLeave={(e) => dragEndHendler(e)}
            // onDragEnd={(e) => dragEndHendler(e)}
            // onDragOver={(e) => dragOverHendler(e)}
            // onDrop={(e) => dropHendler(e, card)}
            // draggable={true}
            className={ props.completed == true ? "todo-item is-completed" : "todo-item"}
            onMouseMove={(e) => {e.target.closest(".todo-item").querySelector(".cross").style.display="block"}}
            onMouseLeave={(e) => {e.target.closest(".todo-item").querySelector(".cross").style.display="none"}}>
            { 
            props.completed == true 
                ? 
                <div className="circle-input completed-true" onClick={props.handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                </div>
                :
                <div className="circle-input completed-false" onClick={props.handleChange}>
                    <div className="completed-false-circle"></div>
                </div>
            }
            <div className="description">{props.description}</div>
            {/* Хрестик при наведенні */}
            <div className="cross"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></div>
        </div>
    )
}

export default ToDoItem;