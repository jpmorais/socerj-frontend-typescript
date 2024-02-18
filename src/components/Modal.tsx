const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>{" "}
      <div className="modal-box">{children}</div>
    </div>
  );
};
export default Modal;
