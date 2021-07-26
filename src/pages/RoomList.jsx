import React, {useState} from 'react';

//components
import Template from '../components/Template';
import AddRoomModal from '../components/AddRoomModal';

//elements
import Button from '../elem/Button';

const RoomList = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }
	return (
		<Template>
			<div>roomlist</div>
      <Button _onClick={openModal}>방 생성하기</Button>
      <AddRoomModal showModal={showModal} closeModal={closeModal} />
		</Template>
	);
};

export default RoomList;
