import { useEffect } from 'react';
import StreamListComponent from '../components/StreamList/StreamList';
import { useStreamList } from '../hooks/useStreamList';
import { storageService } from '../services/storage';

export default function StreamListPage() {
  const { streamList, addStream, removeStream } = useStreamList();

  // Save to local storage whenever stream list changes
  useEffect(() => {
    storageService.saveStreamList(streamList);
  }, [streamList]);

  return (
    <div className="page-container">
      <StreamListComponent
        items={streamList}
        onAdd={addStream}
        onRemove={removeStream}
      />
    </div>
  );
}
