import {useState} from "react";
import {keepPreviousData, useQuery, type UseQueryResult} from "@tanstack/react-query";
import {http} from "../services/http";
import Pagination from "./Pagination";
import type {Students} from "../types/types";
import {useSearchParams} from "react-router-dom";


interface TableProps{
    data: UseQueryResult<Students>,
}

function Table({data}: TableProps){

    const [page, setPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

    /* SEARCH FUNCTIONS */
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        params.set("search", searchValue)
        setSearchParams(params);

        if (searchValue === "" || null) {
            params.delete("search")
            setSearchParams(params);
        }
    };
    /* END OF SEARCH FUNCTIONS */

    /* SORT BY AND ORDER BY FUNCTIONS*/
    const sortBy1 = searchParams.get("sortBy") || "";
    const orderBy = searchParams.get("orderBy") || "asc";

    const sortBtnToggle = (sortBy: string) => {

        if (sortBy1 == sortBy) {
            params.set("orderBy", orderBy === "asc" ? "desc" : "asc")
        } else {
            params.set("sortBy", sortBy)
            params.set("orderBy", "desc")
        }
        setSearchParams(params);
    }
    /* END OF SORT BY AND ORDER BY FUNCTIONS*/

    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    if (data.isLoading) return <h1>loading....</h1>;
    const totalPages = data.data?.last_page;

    return (
        <>
            <form
                onSubmit={handleSearchSubmit}
                className="searchBar1 flex my-5 justify-between items-center gap-5"
            >
                <div className="searchBox flex grow">
                    <input
                        type="text"
                        className="input w-full bg-transparent focus:outline-0
                                outline-0 focus:outline-[#3B3B3B]"
                        placeholder="Search something..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={data.isFetching}>Search</button>
            </form>


            <div className="overflow-x-auto">
                <div className="py-4">
                    {data.isFetching ? (
                        <h1>Loading...</h1>
                    ) : (
                        <table className="table text-[#3B3B3B] font-semibold table-sm">
                            <thead className="font-extrabold text-md">
                            <tr>
                                <th></th>
                                <th></th>
                                <th>

                                    <button className="flex items-center gap-2"
                                            onClick={() => sortBtnToggle("student_id")}>
                                        Student ID

                                        {sortBy1 === "student_id" && orderBy === "desc" ? (
                                            <span className="icon-[lucide--sort-desc] text-xl"></span>
                                        ) : (
                                            <span className="icon-[lucide--sort-asc] text-xl"></span>
                                        )}
                                    </button>


                                </th>
                                <th>

                                    <button className="flex items-center gap-2"
                                            onClick={() => sortBtnToggle("first_name")}>
                                        First Name

                                        {sortBy1 === "first_name" && orderBy === "desc" ? (
                                            <span className="icon-[lucide--sort-desc] text-xl"></span>
                                        ) : (
                                            <span className="icon-[lucide--sort-asc] text-xl"></span>
                                        )}
                                    </button>

                                </th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.data?.data.map((student, index) => {
                                return (
                                    <tr key={index}>
                                        <th>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    onChange={() => toggleSelect(student.id)}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {student.first_name}
                                                    </div>
                                                    <div className="text-sm opacity-50">"No data"</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                        <span className="bg-white p-2 rounded-lg">
                          {student.student_id}
                        </span>
                                        </td>

                                        <td>{student.first_name}</td>
                                        <td>{student.last_name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.role}</td>

                                        <td className="flex gap-1">
                                            <button className="btn btn-success p-2">
                                                <span className="icon-[mdi--eye] text-xl"></span>
                                            </button>

                                            <button className="btn btn-warning p-2">
                                                <span className="icon-[mdi--pencil] text-xl"></span>
                                            </button>

                                            <button
                                                className="btn btn-error p-2"
                                                onClick={() =>
                                                    (
                                                        document.getElementById(
                                                            "my_modal_2"
                                                        ) as HTMLDialogElement
                                                    ).showModal()
                                                }
                                            >
                                                <span className="icon-[mdi--trash] text-xl"></span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Pagination
                currentPage={page}
                totalPages1={totalPages!}
                onPageChange={setPage}
                isFetching={data.isFetching}
            />
        </>
    );
}

export default Table;
