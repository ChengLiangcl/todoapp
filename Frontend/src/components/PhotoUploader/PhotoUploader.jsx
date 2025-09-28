// src/components/PhotoUploader.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography } from '@mui/material';

// Hide the input visually
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

export default function PhotoUploader({
  buttonText = 'Upload cover photo',
  maxFileSizeMB = 5,
  name,
  onChange,
  coverPhoto,
  setCoverPhoto,
}) {
  const [previewUrl, setPreviewUrl] = React.useState(
    () => coverPhoto?.[0]?.path || null
  );
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (coverPhoto) {
      setPreviewUrl(coverPhoto[0]?.path);
    }
  }, [setPreviewUrl, coverPhoto]);

  React.useEffect(() => {
    console.log(previewUrl);
  }, [previewUrl]);
  const handleFileChange = (event) => {
    setError('');
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    // validate file size
    if (selectedFile.size / 1024 / 1024 > maxFileSizeMB) {
      setError(`File must be ≤ ${maxFileSizeMB}MB`);
      return;
    }
    setCoverPhoto((prev) => ({
      ...prev,
      [name]: selectedFile,
    }));

    setPreviewUrl(URL.createObjectURL(selectedFile));

    if (onChange) {
      onChange(selectedFile);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          marginBottom: '1rem',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Cover preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No cover photo uploaded
          </Typography>
        )}
      </div>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        {buttonText}
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name={name}
        />
      </Button>

      {/* Error message */}
      {error && (
        <Typography
          color="error"
          variant="body2"
          style={{ marginTop: '0.5rem' }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

PhotoUploader.propTypes = {
  buttonText: PropTypes.string,
  maxFileSizeMB: PropTypes.number,
  onChange: PropTypes.func,
};
