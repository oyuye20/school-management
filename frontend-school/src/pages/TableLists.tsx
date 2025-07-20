import { BadgeQuestionMark, Building2, Camera, ChartPie, Eye, Menu, Pencil, Settings, Trash, UserRound } from "lucide-react"
import Sidebar from "../component_folder/sidebar";
import NavBar from "../component_folder/NavBar"
import { useSearchParams } from "react-router-dom"
import { useState, type FormEvent } from "react";
import Table from "../component_folder/Table";
import Pagination from "../component_folder/Pagination";

function TableLists() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [term, setTerm] = useState(query || "");

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams((prev) => ({ ...prev, q: term }))
    }





    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-[600px] overflow-auto max-h-[600px]">


                    <h3 className="font-bold text-lg flex items-center gap-2">
                        Add new student
                        <span className="icon-[ion--people] text-2xl"></span>
                    </h3>


                    {/* <button className="btn" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).close()}>Close modal</button> */}

                    <form className="py-4 flex flex-col gap-4">


                        <div className="personal-info flex flex-col gap-4 pb-2">
                            <div className="flex flex-col gap-4">
                                <div className="form-group flex flex-col gap-2">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" placeholder="Input here.." className="input w-full" id="first_name" name="first_name" />
                                </div>

                                <div className="form-group flex flex-col gap-2">
                                    <label htmlFor="first_name">Middle Name</label>
                                    <input type="text" placeholder="Input here.." className="input w-full" id="middle_name" name="middle_name" />
                                </div>

                                <div className="form-group flex flex-col gap-2">
                                    <label htmlFor="first_name">Last Name</label>
                                    <input type="text" placeholder="Input here.." className="input w-full" id="last_name" name="last_name" />
                                </div>


                                <div className="form-group flex flex-col gap-2">
                                    <label htmlFor="first_name">Birthday</label>
                                    <input type="date" placeholder="Birthday" className="input w-full" id="birthday" name="birthday" />
                                </div>
                            </div>
                        </div>

                        <hr className="border-[#3B3B3B]" />

                        <div className="address-info flex flex-col gap-4">
    
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="house_no">House no. / Building no.</label>
                                <input type="text" placeholder="Input here.." className="input w-full" id="house_no" name="house_no" />
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="street">Street</label>
                                <input type="text" placeholder="Input here.." className="input w-full" id="street" name="street" />
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="street">Province</label>
                                <input type="text" placeholder="Input here.." className="input w-full" id="street" name="street" />
                            </div>


                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="city">Municipality / City</label>
                                <input type="text" placeholder="Input here.." className="input w-full" id="city" name="city" />
                            </div>
                            
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="barangay">Barangay</label>
                                <input type="text" placeholder="Input here.." className="input w-full" id="barangay" name="barangay" />
                            </div>
                        </div>




                        <div className="flex justify-end gap-3">

                            <button type="button" className="btn" onClick={() =>
                                (document.getElementById('my_modal_1') as HTMLDialogElement).close()}>Close</button>

                            <button type="submit" className="btn bg-[#72AF72] text-white"> Submit</button>
                        </div>

                        {/* <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div> */}

                    </form>

                </div>
            </dialog>


            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="py-4">Are you sure you want to delete this student?</p>
                </div>

            </dialog>


            <div className="bg-[#c8eac2] h-dvh flex">
                <Sidebar />


                <div className="main grow overflow-auto">
                    <NavBar />

                    <div className="p-4 bg-[#f2fef0] m-4 rounded-lg">

                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-[#3B3B3B]">Students</h1>

                            <button className="btn btn-primary"
                                onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}
                            >Add new students</button>
                        </div>


                        <form onSubmit={handleSearch} className="searchBar1 flex my-5 justify-between items-center gap-5">
                            <div className="searchBox flex grow">
                                <input type="text" className="input w-full bg-transparent focus:outline-0
                                outline-0 focus:outline-[#3B3B3B]" placeholder="Search something..." value={term}
                                    onChange={(e) => setTerm(e.target.value)} />
                            </div>

                            <button className="btn btn-primary">Search</button>
                        </form>


                        <Table />

                        <Pagination />
                    </div>


                </div>
            </div >
        </>
    )
}

export default TableLists