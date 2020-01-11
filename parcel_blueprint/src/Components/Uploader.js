import React from 'react'
import styled from 'styled-components'
import { Upload, Icon, message } from 'antd';
const { Dragger } = Upload;

import "antd/dist/antd.css";

const UploadWidgetWrapper = styled.div`
    width: 80%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin: 0 auto;
`

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Uploader = ({ uid, setForUserId, setProfileImageUrl }) => {
	const props = {
        name: 'photo',
        multiple: false,
        action: 'https://delilah.pr0con.com:3000/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                
                setForUserId(uid)
                setProfileImageUrl(`/uploads/${info.file.name}`)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
   
   return (
	    <UploadWidgetWrapper>
	        <Container>
	            <Dragger {...props}>
	                <div style={{width: '100%'}}>
	                    <p className="ant-upload-drag-icon">
	                        <Icon type="inbox" />
	                    </p>
	                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
	                </div>
	            </Dragger>
	        </Container>
	    </UploadWidgetWrapper>
    )	
	
}

export default Uploader;