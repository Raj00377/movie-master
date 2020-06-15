import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';


//exact always remains true in js , until we explicitly changes the value exact = {false}
ReactDom.render(<App />,document.getElementById('root'));

