import AlertDialog from '../Dialog/Dialog';

const DeleteTodoDialog = ({ open, onClose, onConfirm }) => {
  return (
    <AlertDialog
      title="Are you sure you want to delete this item?"
      dialogContentText="Choose Yes to delete this item, or No to cancel the action."
      confirmBtnName="Yes"
      cancelBtnName="No"
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
    />
  );
};
export default DeleteTodoDialog;
