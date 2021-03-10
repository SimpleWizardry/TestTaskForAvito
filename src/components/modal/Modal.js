import React,{useState,useEffect} from 'react';
import axios from 'axios';
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ModalContent from './ModalContent'

const area = 'fullImage';

const Modal = ({closeModal,url}) => {

    const [fullImage,setFullImage] = useState(null)
    const { promiseInProgress } = usePromiseTracker({ area })


    useEffect(() => {
        trackPromise(axios.get(url), area).then(({ data }) => {
            setFullImage(data);
            console.log('request')
        });
    }, [setFullImage,url]);

    return (
    <div className='modal-screen' onClick={closeModal}>
        <div className='modal-container'>
            <span className='close-btn' onClick={closeModal}>

            </span>
            {promiseInProgress
                ? <LoadingSpinner/>
                : fullImage && <ModalContent data={fullImage}/>
            }
        </div>
    </div>
    )
}

export default Modal;