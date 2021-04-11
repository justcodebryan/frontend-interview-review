import React, { useContext, useState } from 'react';
import './App.css';

const defaultContext = {
  currPath: '/',
  prevPath: '/',
  pathDispatch: () => { }
};

const HistoryContext = React.createContext(defaultContext);

const Router = ({ children }) => {
  const [history, setHistory] = useState({
    currPath: '/',
    prevPath: '/',
    pathDispatch: (data) => {
      setHistory({
        ...data,
        pathDispatch
      });
    }
  });

  const pathDispatch = (data) => {
    setHistory({
      ...data,
      pathDispatch
    });
  };

  return (
    <HistoryContext.Provider value={{ ...history, pathDispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

const Route = ({
  path,
  children
}) => {
  const context = useContext(HistoryContext);

  console.log('path -> ', path);

  return path === context.currPath ? children : null;
};

const Link = ({
  to,
  children
}) => {
  const context = useContext(HistoryContext);

  const onClick = (e) => {
    e.preventDefault();
    const prevPath = window.location.hash;
    window.location.hash = to;
    console.log('prevPath -> ', prevPath);
    console.log('currPath -> ', window.location.hash);
    console.log(context);
    context.pathDispatch({
      currPath: to,
      prevPath
    });
  };

  return <a href={to} onClick={onClick}>{children || to}</a>;
};

const ComA = () => {
  return <div>ComA</div>;
};

const ComB = () => {
  return <div>ComB</div>;
};

function App() {
  return (
    <div className="App">
      <Link to='/' /><br />
      <Link to='/ComA' /><br />
      <Link to='/ComB' /><br />

      <Router>
        <Route path='/'><div>index</div></Route>
        <Route path='/ComA'><ComA /></Route>
        <Route path='/ComB'><ComB /></Route>
      </Router>
    </div>
  );
}

export default App;
