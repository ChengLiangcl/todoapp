import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TodoCardViewButtonGroup from './TodoCardViewButtonGroup';
import Tag from '@components/Tag/Tag';
import { Box, Grid } from '@mui/material';

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
  // Default image
  let url =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgK6215AJAJEDGxprzHthwlnbP3sn8rylUMg&s';

  // Use Cover photo if exists
  if (todo.files && todo.files.length > 0) {
    const coverPhotoList = todo.files.filter(
      (file) => file.type === 'Cover photo'
    );
    url = coverPhotoList[0]?.path || url;
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          width: '100%',
          margin: { xs: '10px 0', sm: '20px' },
        }}
      >
        <CardMedia
          component="img"
          image={url}
          alt="Todo Image"
          sx={{
            width: '100%',
            height: { xs: 120, sm: 140, md: 160 },
            objectFit: 'cover',
          }}
        />

        {/* Content */}
        <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
          {/* Responsive heading */}
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              wordBreak: 'break-word',
            }}
          >
            {title}
          </Typography>

          {/* Tag / Status */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              marginBottom: 1,
            }}
          >
            <Tag tagName={props.tagName} color={props.color} />
          </Box>

          {/* Body content */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            {content}
          </Typography>
        </CardContent>

        {/* Buttons */}
        <CardActions
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            // gap: 1,
            padding: { xs: 1, sm: 2 },
          }}
        >
          <TodoCardViewButtonGroup
            id={id}
            onDelete={onDelete}
            onComplete={onComplete}
            onUpdate={onUpdate}
            todo={todo}
            tagName={props.tagName}
          />
        </CardActions>
      </Card>
    </Grid>
  );
}
