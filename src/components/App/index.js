import './style.css';
import Card from '../Card';
import useScroll from './hook';

function App() {
  const [ commentData, observerTarget ] = useScroll();
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
