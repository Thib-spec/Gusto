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
    
    
    onChange(info) {

      console.log(info.file)
      
      
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


