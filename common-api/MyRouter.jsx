import React, { useContext, useState } from 'react';
import './App.css';

const defaultContext = {
  currPath: '#/',
  prevPath: '#/',
  historyDispatch: () => {},
};

const HistoryContext = React.createContext(defaultContext);

const Route = ({ path, children }) => {
  const context = useContext(HistoryContext);

  const { currPath } = context;

  return path === currPath.slice(1) ? <>{children}</> : null;
};

const Link = ({ to, children }) => {
  const context = useContext(HistoryContext);

  const { historyDispatch } = context;

  const onClick = (e) => {
    e.preventDefault();
    const prevPath = window.location.hash;
    const currPath = `#${to}`;
    window.location.hash = currPath;

    console.log('currPath -> ', currPath);
    console.log('prevPath -> ', prevPath);

    historyDispatch({
      currPath,
      prevPath,
    });
  };

  return (
    <a href={to} onClick={onClick}>
      {children || to}
    </a>
  );
};

const Router = ({ children }) => {
  return <div>{children}</div>;
};

const ComA = () => {
  return <div>ComA</div>;
};

const ComB = () => {
  return <div>ComB</div>;
};

function App() {
  const [history, setHistory] = useState(defaultContext);

  const historyDispatch = (data) => {
    setHistory({
      ...data,
      historyDispatch,
    });
  };

  return (
    <HistoryContext.Provider value={{ ...history, historyDispatch }}>
      <div className='App'>
        <Link to='/' />
        <br />
        <Link to='/ComA' />
        <br />
        <Link to='/ComB' />
        <br />
        <br />
        <Router>
          <Route path='/'>
            <div>index</div>
          </Route>
          <Route path='/ComA'>
            <ComA />
          </Route>
          <Route path='/ComB'>
            <ComB />
          </Route>
        </Router>
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
