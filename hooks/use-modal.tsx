import { useCallback, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [modalData, setModalData] = useState(null);

  const handleOpenModal = useCallback(() => {
    // setModalData(data);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // setModalData(null);
  }, []);

  const handleToggleModal = useCallback((val: boolean) => {
    console.log("✨ ~ file: use-modal.tsx:18 ~ handleToggleModal ~ val:", val);
    setIsModalOpen(val);
  }, []);

  return {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    handleToggleModal,
    // modalData,
  };
};
