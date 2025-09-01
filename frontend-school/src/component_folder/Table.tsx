import { Eye, Pencil, Trash } from "lucide-react";
import React from "react";

function Table() {
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
  return (
    <>
      <div className="overflow-x-auto">
        <div className="py-4">
          <table className="table text-[#3B3B3B] font-semibold table-sm">
            {/* head */}
            <thead className="font-extrabold text-md">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Student ID</th>
                <th>Grade</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userLists.map((user, index) => {
                return (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.imageUrl}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">
                            {user.section}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="bg-white p-2 rounded-lg">
                        {user.studentID}
                      </span>
                    </td>
                    <td>{user.grade}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>

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

              {/* <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Brice Swyre</div>
                                                <div className="text-sm opacity-50">China</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Carroll Group
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                                    </td>
                                    <td>Red</td>
                                    <th>
                                        <button className="btn btn-success">Details</button>
                                    </th>
                                </tr> */}
            </tbody>

            {/* foot */}
            {/* <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                    <th></th>
                                </tr>
                            </tfoot> */}
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
