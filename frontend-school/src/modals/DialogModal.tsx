const DialogModal = () => {



    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="py-4">Are you sure you want to delete this student?</p>

                    <div className="modal-action">
                        <button className="btn btn-error">Delete</button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )

}

export default DialogModal;