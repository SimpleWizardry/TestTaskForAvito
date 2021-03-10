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

    const getFullImage = (e) => {
        setIsModalVisible(true)
        let url = 'https://boiling-refuge-66454.herokuapp.com/images/' + e.target.id;
        setFullImageURL(url);

    }

    const closeModal = (e) => {
        if (e.target.className !== 'modal-screen' && e.target.className !== 'close-btn') { return }
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
            <div className='container main'>
                <div className='row main--heading'>
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
