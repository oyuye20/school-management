import Sidebar from "../component_folder/sidebar";
import NavBar from "../component_folder/NavBar";
import {useSearchParams} from "react-router-dom";
import {useState, type FormEvent, useEffect} from "react";
import Table from "../component_folder/Table";
import AddStudentModal from "../modals/AddStudentModal.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import type {Students} from "../types/types.ts";
import {http} from "../services/http.ts";
import Pagination from "../component_folder/Pagination.tsx";
import {getAllStudents} from "../api/studentAPI.ts";

function StudentLists() {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const students = useQuery({
        queryKey: ["students", params.get("page"), params.get("sortBy"), params.get("orderBy"), params.get("search")],
        queryFn: () => getAllStudents(parseInt(params.get("page")!, 10), params.get("sortBy")!, params.get("orderBy")!, params.get("search")!),
        placeholderData: keepPreviousData,
        staleTime: 60 * 1000,
    });

    return (
        <>
            <AddStudentModal elementId={"my_modal_1"}/>

            {/* Open the modal using document.getElementById('ID').showModal() method */}


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

            <div className="bg-[#c8eac2] h-dvh flex">
                <Sidebar/>

                {/* MAIN TABLE WITH STUDENTS*/}
                <div className="main grow overflow-auto">
                    <NavBar/>

                    <div className="p-4 bg-[#f2fef0] m-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-[#3B3B3B]">
                                Students
                            </h1>

                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    (
                                        document.getElementById("my_modal_1") as HTMLDialogElement
                                    ).showModal()
                                }
                            >
                                Add new students
                            </button>
                        </div>




                        <Table data={students}/>

                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentLists;
