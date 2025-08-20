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
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQnJBGVNQ7vcqT67zTdcZRTn1Ts968sB2cZnZqNU8L90SfL8lA3n_ahkpZWZl05pALHH3_sk_uTCLEQS314DG6mtQ"
        title="green iguana"
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
