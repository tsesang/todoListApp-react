const ShowTodo = ({todoList,children})=>{
    return(
        <>
        <h3>todo list ---</h3>
        <div>
            {
                todoList.map((todo,index)=>(
                    <div key={index}>
                        <p>{todoList.title}</p>
                        <p>{todoList.description}</p>
                    </div>
                ))
            }
        </div>
        <p>children</p>
        </>
    )
}

export default ShowTodo;