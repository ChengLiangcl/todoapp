import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../Button/Button';
export default function CardView({ cardButton }) {
  const defaultButton = [
    { btnName: 'Delete', variant: 'contained', color: 'error' },
    { btnName: 'Complete', variant: 'contained', color: 'success' },
    { btnName: 'View', variant: 'contained', color: 'warning' },
  ];
  cardButton = cardButton || defaultButton;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQnJBGVNQ7vcqT67zTdcZRTn1Ts968sB2cZnZqNU8L90SfL8lA3n_ahkpZWZl05pALHH3_sk_uTCLEQS314DG6mtQ"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        {cardButton.map((button, index) => {
          return (
            <Button
              key={index}
              btnName={button.btnName}
              variant={button.variant}
              color={button.color}
            />
          );
        })}
      </CardActions>
    </Card>
  );
}
