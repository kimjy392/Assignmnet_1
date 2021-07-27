import './style.css';

const Card = (props) => {

    const {commentId, commentEmail, commentBody} = props;

    return (
        <>
            <section className='card'>
                <div>
                    <span className='title'>Comment Id</span>
                    <span id='commentId'>{commentId}</span>
                </div>
                <div>
                    <span className='title'>Email</span>
                    <span id='commentEmail'>{commentEmail}</span>
                </div>
                <div>
                    <p className='title'>Comment</p>
                    <span id='commentBody'>{commentBody}</span>
                </div>
            </section>
        </>
    )
}

export default Card;