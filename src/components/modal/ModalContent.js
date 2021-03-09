import React from 'react'


//РЕНДЕРИТСЯ ДВАЖДЫ ДО ПОЛУЧЕНИЯ ОТВЕТА В КОМПОНЕНТЕ MODAL
const ModalContent = ({data}) => {
    console.log(data)
    return (
        <>
            <div className='modal-container--img-wrapper'>
                <img src={data.url} className='modal-container--img-wrapper__img'/>
                <div className='modal-container--img-wrapper__comments'>
                    {data.comments.map((comment) =>
                        <div className='comment' id={comment.id} key={comment.id}>
                            <p className='comment--date'>{comment.date}</p>
                            <p className='comment--text'>{comment.text}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='modal-container--input-group'>
                <input name='name' className='modal-container--input-group__input-field browser-default' type='text'
                       placeholder='Ваше имя'/>
                <input name='comment' className='modal-container--input-group__input-field browser-default' type='text'
                       placeholder='Ваш комментарий'/>
                <button type='submit' className='modal-container--input-group__add-comm-btn'>Оставить комментарий
                </button>
            </div>
        </>
    )
}

export default ModalContent;

/*
<ModalContent data={fullImage}/>
 */