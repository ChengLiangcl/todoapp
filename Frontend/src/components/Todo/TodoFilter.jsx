import { Box, FormControl } from '@mui/material';
import Button from '../Button/Button';
import Input from '../Input/Input';
const TodoFilter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        p: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <FormControl sx={{ minWidth: 150 }} size="small">
        <Input
          options={['All', 'Work', 'Personal', 'Urgent']}
          type="select"
          label="Todo Category"
          id="categoryFilter"
        />
      </FormControl>
      <Input
        variant="outlined"
        size="small"
        placeholder="Search keyword..."
        sx={{ flexGrow: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none' }}
        btnName="Apply Filters"
      />
    </Box>
  );
};
export default TodoFilter;
