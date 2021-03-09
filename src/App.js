import React,{useState, useEffect} from 'react';
import ImagesList from './components/imagesList/ImagesList'
import axios from 'axios';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import './App.scss';
import Modal from './components/modal/Modal'

const area = 'images';

function App() {
    const [images, setImages] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    //const [fullImage,setFullImage] = useState({})
    const [fullImageURL,setFullImageURL] = useState('')
    const { promiseInProgress } = usePromiseTracker({ area })


    useEffect(() => {
        trackPromise(axios.get('https://boiling-refuge-66454.herokuapp.com/images'), area).then(({ data }) => {
            setImages(data);
        });
    }, [setImages]);

    /*
    const getFullImage = (e) => {
        setIsModalVisible(true)
        let url = 'https://boiling-refuge-66454.herokuapp.com/images/' + e.target.id;
        axios.get(url).then(({ data }) => {
            console.log(data);
            setFullImage(data)
        })
    }

    useEffect(() => {
        setIsModalVisible(true)
    },[fullImageURL])
*/


    const getFullImage = (e) => {
        setIsModalVisible(true)
        let url = 'https://boiling-refuge-66454.herokuapp.com/images/' + e.target.id;
        setFullImageURL(url);

    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

  return (
      <div className="screen">
          {!isModalVisible ?
              null :
              <Modal
                  isVisible={isModalVisible}
                  closeModal={closeModal}
                  url={fullImageURL}
              />
          }
          {/*
          <div className={'modal-screen ' + (isModalVisible && 'visible')}>
            <div className='modal-container'>
                <span className='close-btn'>

                </span>
                <div className='modal-container--img-wrapper'>
                    <div className='modal-container--img-wrapper__img'>

                    </div>
                    <div className='modal-container--img-wrapper__comments'>
                        <div className='comment'>
                            <p className='comment--date'>18.12.2019</p>
                            <p className='comment--text'>Отличное фото</p>
                        </div>
                        <div className='comment'>
                            <p className='comment--date'>18.12.2019</p>
                            <p className='comment--text'>Я тут был, очень понравилось</p>
                        </div>
                    </div>
                </div>
                <div className='modal-container--input-group'>
                    <input name='name' className='modal-container--input-group__input-field browser-default' type='text' placeholder='Ваше имя'/>
                    <input name='comment' className='modal-container--input-group__input-field browser-default' type='text' placeholder='Ваш комментарий'/>
                    <button type='submit' className='modal-container--input-group__add-comm-btn'>Оставить комментарий</button>
                </div>
            </div>
          </div>
          */}
            <div className='container main'>
                <div className='row main--heading' onClick={() => console.log(fullImageURL)}>
                    TEST APP
                </div>
                <div className='row main--img-wrapper'>
                    {promiseInProgress
                        ? <LoadingSpinner />
                        : <ImagesList images={images} clickHandler={getFullImage}/>
                    }
                </div>
                <div className='row main--copyrights'>
                    &#169; 2018-2019
                </div>
            </div>
      </div>
  );
}

export default App;
