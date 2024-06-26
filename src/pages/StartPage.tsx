import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Start.css';
import { layouts } from '../data/Layouts';

export function StartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [layoutIndex, setLayoutIndex] = useState('0')
  const [currGame, setCurrGame] = useState('1');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const layoutIndexFromUrl = params.get('layoutIndex');
    const currGameFromUrl = params.get('currGame') // repeat game three times -> 1, 2, 3

    if (layoutIndexFromUrl !== null) {
      setLayoutIndex(layoutIndexFromUrl)
    }

    if (currGameFromUrl !== null) {
      setCurrGame(currGameFromUrl);
    }
  }, [location.search]);

  return (
    <div className='page'>
      <h1 className='title'>Card Elimination</h1>
      <p className='instructions'>
        <span className='bold'>Goal:</span> Keep your maximum hand size low. <br />
        <span className='bold'>How to play:</span> Take cards from the top of the stacks and match three-of-a-kind of one color in your hand to eliminate them. <br />
      </p>
      <div className='layouts'>
        {/* {layouts.map((layout, index) => 
          <button id='start-btn' onClick={() => navigate(index.toString())}>
            <p id='start-btn-label'>
              Layout {index + 1}
            </p>
          </button>
        )} */}
        <button id='start-btn' onClick={() => navigate(`${layoutIndex.toString()}?currGame=${currGame}`)}><p>Start</p></button>
      </div>
    </div>
  );
}