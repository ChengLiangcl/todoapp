import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography, Stack, Chip } from '@mui/material';

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

export default function FileUploader({
  files = [],
  setFiles,
  buttonText,
  maxFiles = 5,
  maxFileSizeMB = 5,
}) {
  const [error, setError] = React.useState('');
  const text = buttonText || 'Upload files';

  const handleFileChange = (event) => {
    setError('');

    const selectedFiles = Array.from(event.target.files);

    const oversizedFiles = selectedFiles.filter(
      (file) => file.size / 1024 / 1024 > maxFileSizeMB
    );
    if (oversizedFiles.length > 0) {
      setError(`Each file must be ≤ ${maxFileSizeMB}MB`);
      return;
    }

    const combinedFiles = [...files, ...selectedFiles]; // now `files` comes from props

    if (combinedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    const uniqueFiles = Array.from(
      new Map(combinedFiles.map((file) => [file.name, file])).values()
    );
    console.log(files);

    setFiles(uniqueFiles);
  };

  const handleDelete = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        {text}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*,.pdf,.doc,.docx"
        />
      </Button>

      {error && (
        <Typography
          color="error"
          variant="body2"
          style={{ marginTop: '0.5rem' }}
        >
          {'not very good'}
        </Typography>
      )}

      {files.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected files:
          </Typography>
          <Stack direction="column" spacing={1}>
            {files.map((file, idx) => (
              <Chip
                key={idx}
                label={file.name}
                onDelete={() => handleDelete(idx)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
}
