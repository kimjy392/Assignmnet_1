import './style.css';
import api from '../../utils/apis';
import Card from '../Card';
import { useState, useEffect, useRef, useCallback } from 'react';


function App() {

    const { fetchComment } = api;
    const [commentData, setCommentData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);

    const observerTarget = useRef();
    const getComment = useCallback(async() => {
        let resData;
        try {
            resData = await fetchComment(pageIndex, 10);
        } catch (e) {
            alert(e)
            console.log(e)
        }
        setCommentData(preData => [...preData, ...resData]);
        setPageIndex((preState) => preState + 1);
    }, [pageIndex]);


    useEffect(() => {
        let observer = new IntersectionObserver((entries) => {
            console.log(entries);
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getComment();
                }
            });
        });
        observer.observe(observerTarget.current);

        return () => observer && observer.disconnect();
    }, [pageIndex])

  return (
    <div className="App">
      <main className="comments">
        {commentData.map((e) => {
            return (
                <Card
                key={e.id}
                commentId={e.id}
                commentEmail={e.email}
                commentBody={e.body}
                />
            )
        })}
        <footer style={{height: '10px'}} ref={observerTarget}/>
      </main>
    </div>
  );
}

export default App;
