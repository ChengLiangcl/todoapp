import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TodoCardViewButtonGroup from './TodoCardViewButtonGroup';

export default function CardView({
  title,
  content,
  todo,
  onDelete,
  onUpdate,
  onComplete,
  id,
}) {
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.natgeofe.com/n/6c02ad5a-977b-4f12-b9c0-02ffb0736e07/metropolitan-cathedral-zocalo-mexico-city.JPG"
        title="Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <TodoCardViewButtonGroup
          id={id}
          onDelete={onDelete}
          onComplete={onComplete}
          onUpdate={onUpdate}
          todo={todo}
        />
      </CardActions>
    </Card>
  );
}
