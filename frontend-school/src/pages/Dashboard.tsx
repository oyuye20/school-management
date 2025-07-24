import {
  BadgeQuestionMark,
  Building2,
  Camera,
  ChartPie,
  Menu,
  Settings,
  UserRound,
} from "lucide-react";
import NavBar from "../component_folder/NavBar";
import Sidebar from "../component_folder/sidebar";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const userLists = [
    {
      name: "Hart Hagerty",
      companyName: "Zemlak, Daniel and Leannon",
      country: "United States",
      job: "Desktop Support Technician",
      favoriteColor: "Purple",
      imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },

    {
      name: "Brice Swyre",
      companyName: "Carroll Group",
      country: "China",
      job: "Tax Accountant",
      favoriteColor: "Red",
      imageUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      name: "Brice Swyre",
      companyName: "Carroll Group",
      country: "China",
      job: "Tax Accountant",
      favoriteColor: "Red",
      imageUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      name: "Brice Swyre",
      companyName: "Carroll Group",
      country: "China",
      job: "Tax Accountant",
      favoriteColor: "Red",
      imageUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      name: "Brice Swyre",
      companyName: "Carroll Group",
      country: "China",
      job: "Tax Accountant",
      favoriteColor: "Red",
      imageUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
  ];

  /* bg-[#D4F0CF] */
  return (
    <>
      <div className="bg-[#c8eac2] h-dvh flex">
        <Sidebar />

        {/* MAIN MENU CARD */}
        <div className="main grow overflow-auto">
          <NavBar />

          <div className="flex p-4 gap-3">
            <div className="left-main grow">
              {/* CARDS */}
              <div className="div flex gap-4 text-[#3B3B3B]">
                <div
                  className="cards grow p-4 rounded-lg flex
                        flex-col gap-4 bg-[#f2fef0]"
                >
                  <h1 className="font-bold">Total of students</h1>
                  <p className="font-semibold text-2xl">3,300</p>
                </div>

                <div
                  className="cards grow p-4 rounded-lg flex
                        flex-col gap-4 bg-[#f2fef0]"
                >
                  <h1 className="font-bold">Total of students</h1>
                  <p className="font-semibold text-2xl">3,300</p>
                </div>

                <div
                  className="cards grow p-4 rounded-lg flex
                        flex-col gap-4 bg-[#f2fef0]"
                >
                  <h1 className="font-bold">Total of students</h1>
                  <p className="font-semibold text-2xl">3,300</p>
                </div>
              </div>

              {/* TABLE */}
              <div className="py-4">
                <table className="table text-[#3B3B3B] font-semibold bg-[#f2fef0]">
                  {/* head */}
                  <thead className="font-extrabold text-md">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
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
                                  {user.country}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {user.companyName}
                            <br />
                            <span className="badge badge-ghost badge-sm">
                              {user.job}
                            </span>
                          </td>
                          <td>{user.favoriteColor}</td>
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

            <div className="right-main min-w-[300px] overflow-auto">
              <div className="bg-[#f2fef0] rounded-lg p-1 py-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="icon-[material-symbols--event] text-2xl text-[#3B3B3B]"></span>
                  <h1 className="text-center font-semibold text-xl text-[#3B3B3B]">
                    Events
                  </h1>
                </div>

                <div className="card p-2 flex gap-5">
                  <div className="shadow-md flex flex-col gap-4 p-4">
                    <h1 className="font-semibold text-[#3B3B3B] text-center ">
                      Holiday
                    </h1>

                    <div className="w-[300px] overflow-scroll h-[200px]">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat ex quaerat, obcaecati amet ipsum sequi atque
                        voluptate recusandae odit, quas officiis. Corporis, iste
                        alias. Culpa ad a modi ex sapiente! ecati amet ipsum
                        sequi atque voluptate recusandae odit, quas officiis.
                        Corporis, iste alias. Culpa ad a modi ex sapiente! ecati
                        amet ipsum sequi atque voluptate recusandae odit, quas
                        officiis. Corporis, iste alias. Culpa ad a modi ex
                        sapiente! ecati amet ipsum sequi atque voluptate
                        recusandae odit, quas officiis. Corporis, iste alias.
                        Culpa ad a modi ex sapiente!
                      </p>
                    </div>
                  </div>

                  <div className="shadow-md flex flex-col gap-4 p-4">
                    <h1 className="font-semibold text-[#3B3B3B] text-center ">
                      Holiday
                    </h1>

                    <div className="w-[300px] overflow-scroll h-[200px]">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat ex quaerat, obcaecati amet ipsum sequi atque
                        voluptate recusandae odit, quas officiis. Corporis, iste
                        alias. Culpa ad a modi ex sapiente! ecati amet ipsum
                        sequi atque voluptate recusandae odit, quas officiis.
                        Corporis, iste alias. Culpa ad a modi ex sapiente! ecati
                        amet ipsum sequi atque voluptate recusandae odit, quas
                        officiis. Corporis, iste alias. Culpa ad a modi ex
                        sapiente! ecati amet ipsum sequi atque voluptate
                        recusandae odit, quas officiis. Corporis, iste alias.
                        Culpa ad a modi ex sapiente!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
