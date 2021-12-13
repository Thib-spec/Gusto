import React from 'react'
import styled from 'styled-components'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const Uploader = () => {

const props = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info) {

      console.log(info.file)
      const { status } = info.file;
      
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return(
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
    </Dragger>
    
    
  );
  }
export default Uploader;


