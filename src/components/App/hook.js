import api from '../../utils/apis';
import { useState, useEffect, useRef, useCallback } from 'react';

const useScroll = () => {
  const [commentData, setCommentData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const observerTarget = useRef(null);

  const getComment = useCallback(async () => {
    let resData;
    try {
        resData = await api.fetchComment(pageIndex, 10);
    } catch (e) {
        alert(e)
        console.log(e)
    }
    setCommentData(preData => [...preData, ...resData]);
    setPageIndex((preState) => preState + 1);
  }, [pageIndex]);

  useEffect(() => {
    let observer;
    if (observerTarget.current){
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getComment();
                }
            });
        });
        observer.observe(observerTarget.current);
    }
    return () => {
      observer && observer.disconnect()
    };
  }, [pageIndex])

  useEffect(() => {
    getComment()
  }, [])

  

  return [commentData, observerTarget]
}

export default useScroll