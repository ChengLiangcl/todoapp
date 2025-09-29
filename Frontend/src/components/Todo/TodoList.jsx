import Grid from '@mui/material/Grid';
import CardView from '../CardView/CardView';
import Paper from '@mui/material/Paper';
const TodoList = ({ todos, onDelete }) => {
  const setTag = (todo) => {
    const dueDate = new Date(todo.dueDate);
    const currentDate = new Date();
    if (todo.isCompleted) return ['Completed', 'success'];
    if (!todo.isCompleted && dueDate >= currentDate)
      return ['Ongoing', 'primary'];
    if (!todo.isCompleted && dueDate < currentDate)
      return ['Overdue', 'warning'];

    return ['Uncategorized', 'warning'];
  };
  return (
    <Paper
      elevation={2}
      sx={{
        border: '1px solid',
        borderColor: 'primary.light',
        borderRadius: '20px',
        m: '6px auto',
        p: 6,
        width: { xs: '100%', sm: '95%', md: '75%' },
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 3,
        },
      }}
    >
      <Grid container justifyContent="flex-start">
        {todos?.map((todo, index) => {
          const [tagName, color] = setTag(todo);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardView
                id={todo._id}
                title={todo.title}
                content={todo.content}
                startDate={todo.startDate}
                dueDate={todo.dueDate}
                onDelete={() => onDelete(todo._id)}
                onUpdate={() => onDelete(todo._id)}
                todo={todo}
                color={color}
                tagName={tagName}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
export default TodoList;
