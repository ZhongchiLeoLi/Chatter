import { useState } from 'react';
import { sendMessage } from 'react-chat-engine';
import TextareaAutosize from 'react-textarea-autosize';
import FeatherIcon from 'feather-icons-react';


const ChatForm = (props) => {
    const { chatId, creds } = props;
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent browser from refreshing
        const text = value.trim();
        if(text.length) sendMessage(creds, chatId, { text });
        setValue('');
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            handleSubmit(event);
          }
    }

    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: '' });
    }

    return(
        <form className='chat-form' onSubmit={handleSubmit}>
            <TextareaAutosize 
                className='message-input'
                placeholder='Type a message ...'
                maxRows={5}
                value={value}
                onChange={handleChange}
                onKeyDown={handleEnter}
                onSubmit={handleSubmit}
            />
            <label className='upload-button' htmlFor='upload-button'>
                <span className='image-button'>
                    <FeatherIcon className='image-icon' icon="image" size='20' />
                </span>
            </label>
            <input 
                type='file'
                multiple={false}
                id='upload-button'
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <button type='submit' className='send-button'>
                <FeatherIcon className='send-icon' icon="send" size='20' />
            </button>
        </form>
    );
}

export default ChatForm;