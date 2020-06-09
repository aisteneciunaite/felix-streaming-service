import React, { useRef } from 'react';
import './index.scss';

function ModalVideo({ setShowModal, video }) {
  const modal = useRef(null);
  function hideModal(e) {
    if (e.target !== modal) {
      setShowModal(false);
    }
  }
  return (
    <div className="Modal" onClick={hideModal}>
      <iframe title="video" src={video} frameBorder="0" allowFullScreen ref={modal} />
    </div>
  );
}

export default ModalVideo;
