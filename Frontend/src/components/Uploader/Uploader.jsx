import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomIconButton from '../IconButton/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Uploader({ icon, downloadIcon, sx }) {
  const [files, setFiles] = React.useState([]);
  const defaultIcon = icon || <CloudUploadIcon />;
  const defaultDownloadIcon = downloadIcon || DownloadIcon;
  const defaultIconProps = { color: 'primary', sx: { fontSize: '20px' } };
  const defaultButtonProps = {
    sx: {
      ml: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
    },
  };
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <Box>
      <Button component="label" variant="contained" startIcon={defaultIcon}>
        Upload files
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>

      {files.length > 0 && (
        <Box mt={2}>
          {files.map((file, index) => (
            <Box key={index} sx={sx} mb={1}>
              <Typography variant="body2" flexGrow={1}>
                📄 {file.name}
              </Typography>
              <CustomIconButton
                icon={defaultDownloadIcon} // ✅ pass the component type
                iconProps={defaultIconProps}
                buttonProps={defaultButtonProps}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
