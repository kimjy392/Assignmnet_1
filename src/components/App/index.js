import './style.css';
import api from '../../utils/apis';
import Card from '../Card';
import { useState, useEffect, useRef, useCallback } from 'react';


function App() {

    const { fetchComment } = api;
    const [commentData, setCommentData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);

    const observerTarget = useRef(null);
    const getComment = useCallback(async () => {
        let resData;
        try {
            resData = await fetchComment(pageIndex, 10);
        } catch (e) {
            alert(e)
            console.log(e)
        }
        console.log(resData)
        setCommentData(preData => [...preData, ...resData]);
        setPageIndex((preState) => preState + 1);
    }, [pageIndex]);


    useEffect(() => {
        getComment()
    }, [])

    useEffect(() => {
        let observer;
        console.log(observerTarget.current)
        if (observerTarget.current){
            let observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        getComment();
                    }
                });
            });
            observer.observe(observerTarget.current);
        }
        return () => observer && observer.disconnect();
    }, [pageIndex])

    

  return (
    <div className="App">
      <main className="comments">
        {commentData.map((e, idx) => {
            return (
                <Card
                ref={commentData.length - 1 === idx ? observerTarget : null}
                key={e.id}
                commentId={e.id}
                commentEmail={e.email}
                commentBody={e.body}
                />
            )
        })}
      </main>
    </div>
  );
}

export default App;
