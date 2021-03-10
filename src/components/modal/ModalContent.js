import React,{useReducer, memo} from 'react';
import axios from "axios";

const ModalContent = ({data}) => {
    const [inputValues, setInputValues] = useReducer((state, newState) => ({ ...state, ...newState }),
        {name: '', comment: ''}
    );

    const handleOnChange = e => {
        const { name, value } = e.target;
        setInputValues({ [name]: value });
    };

    const postChanges = () => {
        let newPost = {name: inputValues.name, comment: inputValues.comment}
        axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${data.id}/comments`, newPost)
            .then((response) => {
            console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className='modal-container--img-wrapper'>
                <img src={data.url} className='modal-container--img-wrapper__img' alt=''
                />
                <div className='modal-container--img-wrapper__comments'>
                    { !data.comments.length ?
                    <div className='comment'>
                        <p className='comment--date'>Здесь еще нет комментариев,будьте первым</p>
                    </div>
                        :
                    data.comments.map((comment) =>
                        <div className='comment' id={comment.id} key={comment.id}>
                            <p className='comment--date'>
                                {new Date(comment.date).toLocaleString("ru",
                                    {day: 'numeric', month: 'numeric', year: 'numeric'})
                            }</p>
                            <p className='comment--text'>{comment.text}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='modal-container--input-group'>
                <input
                    name='name'
                    className='modal-container--input-group__input-field browser-default'
                    type='text'
                    placeholder='Ваше имя'
                    onChange={handleOnChange}
                />
                <input
                    name='comment'
                    className='modal-container--input-group__input-field browser-default'
                    type='text'
                    placeholder='Ваш комментарий'
                    onChange={handleOnChange}
                />
                <button onClick={postChanges} type='submit' className='modal-container--input-group__add-comm-btn'>Оставить комментарий
                </button>
            </div>
        </>
    )
}

export default memo(ModalContent);
