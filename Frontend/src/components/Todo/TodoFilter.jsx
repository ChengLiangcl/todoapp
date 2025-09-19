import { Grid, FormControl, Box } from '@mui/material';
import Button from '../Button/Button';
import Input from '../Input/Input';

const TodoFilter = () => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={3} md={3}>
          <FormControl fullWidth size="small">
            <Input
              options={['All', 'Work', 'Personal', 'Urgent']}
              type="select"
              label="Todo Category"
              id="categoryFilter"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Input
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search keyword for todo title"
          />
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <Input
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search keyword for todo content"
            sx={{ mb: { xs: 1, sm: 0 } }}
          />
        </Grid>

        <Grid item xs={12} sm={3} md="auto">
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none', width: '100%' }}
            btnName="Apply Filters"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodoFilter;
