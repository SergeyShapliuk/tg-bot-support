import Modal from "react-modal";

Modal.setAppElement("#root");

type ModalProps = {
    error: { isOpen: boolean, message: string }
    close: () => void
}

function ModalError({error, close}: ModalProps) {
    return (
        <Modal isOpen={error.isOpen} onRequestClose={close} style={{
            overlay: {pointerEvents: "none", background: "rgba(0,0,0,0.7)", zIndex: 999}, content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                border: "none",
                borderRadius: 12,
                background: "#1c1c1e"
            }
        }}>
            <div style={{textAlign: "center"}}>
                {error.message !== "" ?
                    <>
                        <h3> An error has occurred:</h3>
                        <p>{error.message}</p>
                        <p>Try again later</p>
                    </>
                    :
                    <>
                        <h3>Something went wrong.</h3>
                        <p>Try again later</p>
                    </>
                }
            </div>
        </Modal>
    );
}

export default ModalError;
