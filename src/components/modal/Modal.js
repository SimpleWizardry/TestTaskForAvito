import React,{useState,useEffect} from 'react';
import axios from 'axios';
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ModalContent from './ModalContent'

const area = 'fullImage';

const Modal = ({isVisible,closeModal,url}) => {

    const [fullImage,setFullImage] = useState({})
    const { promiseInProgress } = usePromiseTracker({ area })

    useEffect(() => {console.log(isVisible,closeModal,url)},[])

    useEffect(() => {
        trackPromise(axios.get(url), area).then(({ data }) => {
            setFullImage(data);
        });
    }, [setFullImage]);

/*
    if (!isVisible) {
        return null;
    }
 */

    return (
    <div className='modal-screen'>
        <div className='modal-container'>
            <span className='close-btn' onClick={closeModal}>

            </span>
            {promiseInProgress
                ? <LoadingSpinner/>
                : <ModalContent data={fullImage}/>
            }
        </div>
    </div>
    )
}

export default Modal;