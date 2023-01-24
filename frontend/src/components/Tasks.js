import "../styles/components/Tasks.css";

function Tasks({ tasks }) {
  const emojis = ["🎉", "✨", "🔖", "💡", "⚡", "🚀", "🐳", "📦"];
  const randomIndex = Math.floor(Math.random() * emojis.length);

  return (
    <div className="tasks">
      {tasks.map((task) => (
        <p key={task.id} className="task">
          {emojis[randomIndex]} {task.text}
        </p>
      ))}
    </div>
  );
}

export default Tasks;
