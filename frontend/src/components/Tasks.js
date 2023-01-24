function Tasks({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <p key={task.id}>
          {task.text}: {task.id}
        </p>
      ))}
    </div>
  );
}

export default Tasks;
