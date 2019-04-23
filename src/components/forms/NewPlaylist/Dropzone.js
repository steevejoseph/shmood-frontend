import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Box, Image } from 'bloomer';

const renderDropzoneInput = field => {
  const files = field.input.value;
  const [binString, setBinString] = useState('');


  return (
    <Box style={{ maxWidth: '50rem' }}>
      <Dropzone
        name={field.name}
        onDrop={(filesToUpload, e) => {
          field.input.onChange(filesToUpload);

          const reader = new FileReader();
          filesToUpload.forEach(file => reader.readAsDataURL(file));

          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
            setBinString(reader.result);
          };
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag your photo here (or click to select photo)</p>
            </div>
          </section>
        )}
      </Dropzone>
      {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        // <ul>
        //   {files.map((file, i) => (
        //     <li key={i}>{file.name}</li>
        //   ))}
        // </ul>
        <div>
          <p>Photo preview</p>
          <Image src={binString} alt="img" width="10%" />
        </div>
      )}
    </Box>
  );
};

export default renderDropzoneInput;
