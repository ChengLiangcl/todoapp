import { Box } from '@mui/system';
import Button from '../Button/Button';
const ModalFormWrapper = ({
  children,
  onSubmit,
  handleClose,
  negativeBtn = 'Close',
  positiveBtn = 'Confirm',
}) => {
  return (
    <form
      method="POST"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderTop: '1px solid #ddd',
          flexShrink: 0,
        }}
      >
        <Button
          btnName={negativeBtn}
          color="error"
          variant="contained"
          onClick={handleClose}
        />
        <Button
          btnName={positiveBtn}
          color="primary"
          variant="contained"
          type="submit"
        />
      </Box>
    </form>
  );
};

export default ModalFormWrapper;
