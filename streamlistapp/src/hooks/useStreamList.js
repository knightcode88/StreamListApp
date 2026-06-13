import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useStreamList = () => {
  const { state, dispatch } = useContext(AppContext);

  const addStream = (title) => {
    if (!title.trim()) return;
    dispatch({
      type: 'ADD_STREAM',
      payload: { id: Date.now(), title },
    });
  };

  const removeStream = (id) => {
    dispatch({ type: 'REMOVE_STREAM', payload: id });
  };

  const clearStreams = () => {
    dispatch({ type: 'CLEAR_STREAMS' });
  };

  return {
    streamList: state.streamList,
    addStream,
    removeStream,
    clearStreams,
  };
};