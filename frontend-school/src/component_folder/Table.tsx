import {Eye, Pencil, Trash} from "lucide-react";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {http} from "../services/http";

interface StudentData {
    id: number;
    first_name: string;
    last_name: string;
    student_id: string;
    email: string;
    role: string;
}

interface Students {
    data: StudentData[]
    links: {
        first: string
        last: string
        next: string
        prev: string
    }
}


function Table() {
    const getAllStudents = async (): Promise<Students> => {
        return await http
            .get("api/v1/students")
            .then((res) => {
                console.log(res.data);

                return res.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    };

    const students = useQuery({
        queryKey: ["students"],
        queryFn: getAllStudents,
    });

    const userLists = [
        {
            name: "Hart Hagerty",
            studentID: 123213123,
            grade: 5,
            phone: 9281232315,
            address: "Manila",
            imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
            section: "2B",
        },

        {
            name: "Hart Hagerty",
            studentID: 123213123,
            grade: 5,
            phone: 9281232315,
            address: "Manila",
            imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
            section: "2B",
        },

        /* {
                name: 'Brice Swyre',
                companyName: 'Carroll Group',
                country: "China",
                job: "Tax Accountant",
                favoriteColor: "Red",
                imageUrl: 'https://img.daisyui.com/images/profile/demo/3@94.webp'
            }, */
    ];

    if (students.isLoading) return <h1>loading....</h1>;

    return (
        <>
            <div className="overflow-x-auto">
                <div className="py-4">
                    <table className="table text-[#3B3B3B] font-semibold table-sm">
                        <thead className="font-extrabold text-md">
                        <tr>
                            <th></th>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>


                        {students.data?.data.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox"/>
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
                                                <div className="font-bold">{student.first_name}</div>
                                                <div className="text-sm opacity-50">
                                                    "No data"
                                                </div>
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
                </div>
            </div>
        </>
    );
}

export default Table;
