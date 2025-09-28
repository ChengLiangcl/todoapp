import React, { useEffect } from 'react';
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
  imgUrl,
}) {
  const coverPhotoList = todo.files.filter(
    (file) => file.type === 'Cover photo'
  );
  const url =
    coverPhotoList[0]?.path ||
    'https://www.planetware.com/wpimages/2019/09/mexico-in-pictures-most-beautiful-places-to-visit-mexico-city.jpg';
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia sx={{ height: 140 }} image={url} title="Image" />
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
