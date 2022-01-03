import React from 'react'
import { Upload, message } from 'antd';
import '../../CSS/Uploader.scss';
import uploadLogo from '../../Images/UploadLogo.png';
const { Dragger } = Upload;

const Uploader = () => {

    const props = {
        name: 'photo',
        multiple: false,
        action: 'http://localhost:3001/photo',
        onChange(info) {
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
    };


    return (
            <Dragger {...props}>
                <div className='uploader'>
                    <img src={uploadLogo} className='uploadLogo' alt="uploadLogo"/>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </div>
            </Dragger>
    )
}

export default Uploader;