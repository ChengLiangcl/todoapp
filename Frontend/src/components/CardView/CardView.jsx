import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TodoCardViewButtonGroup from './TodoCardViewButtonGroup';
import Tag from '@components/Tag/Tag';
import { Box } from '@mui/material';
export default function CardView({
  title,
  content,
  todo,
  onDelete,
  onUpdate,
  onComplete,
  id,
  ...props
}) {
  let url =
    'https://www.planetware.com/wpimages/2019/09/mexico-in-pictures-most-beautiful-places-to-visit-mexico-city.jpg';
  if (todo.files !== undefined && todo.files.length > 0) {
    const coverPhotoList = todo.files.filter(
      (file) => file.type === 'Cover photo'
    );
    url = coverPhotoList[0]?.path;
  }
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia sx={{ height: 140 }} image={url} title="Image" />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Box>
          <Tag tagName={props.tagName} color={props.color} />
        </Box>
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
