import React from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerModalProps {
  audioFile: string | null;
  onClose: () => void;
  fileName: string|null;
}

const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({ audioFile, onClose,fileName }) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div>
      {audioFile && (
        <div className="audio-modal">
          {fileName && <div className="">{fileName}</div>}
          <div className="audio-modal-content">
            <H5AudioPlayer src={audioFile} autoPlay />
            <div className='flex  bg-rose-600 justify-center'><button onClick={handleCloseModal} >Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerModal;
