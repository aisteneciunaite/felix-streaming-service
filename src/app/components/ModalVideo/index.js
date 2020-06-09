import React from 'react';
import './index.scss';

function ModalVideo({ setShowModal, video }) {
  function hideModal() {
    setShowModal(false);
  }
  return (
    <div className="Modal" onClick={hideModal}>
      <iframe title="video" src={video} frameBorder="0" allowFullScreen />
    </div>
  );
}

export default ModalVideo;
