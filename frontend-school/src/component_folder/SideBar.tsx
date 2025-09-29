import {NavLink, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {http} from "../services/http.ts";


function Sidebar() {
    const navigate = useNavigate();

    const logoutFunction = async () => {
        return await http.post('/api/logout').then((res) => {
            console.log(res)
            navigate('/');
        }).catch((err) => {
            console.log(err)
        })
    }

    const logout = useMutation({
        mutationFn: logoutFunction,
    })


    return (
        <>
            <div className="sidebar bg-[#3c5137] flex flex-col">
                <div className="flex items-center gap-5 p-4">
                    <span className="icon-[logos--eventbrite-icon] text-[45px]"></span>
                    <h1 className="text-white text-2xl font-semibold">School</h1>
                </div>

                <ul className="flex flex-col gap-5 grow py-7 px-3 w-[250px]">
                    <h2 className="text-white font-medium py-1">Menu</h2>

                    <NavLink
                        to={"/dashboard"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        {/* <Menu size={48} /> */}
                        <span className="icon-[material-symbols--dashboard] text-2xl"></span>
                        <span className="">Dashboard</span>
                    </NavLink>

                    <NavLink
                        to={"/lists"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        <span className="icon-[picon--student] text-2xl"></span>
                        <span className="">Students</span>
                    </NavLink>

                    <NavLink
                        to={"/teachers"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        <span className="icon-[mdi--teacher] text-2xl"></span>
                        <span className="">Teachers</span>
                    </NavLink>

                    <NavLink
                        to={"/subjects"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        <span className="icon-[famicons--book] text-2xl"></span>
                        <span className="">Subjects</span>
                    </NavLink>

                    <NavLink
                        to={"/classes"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        <span className="icon-[entypo--blackboard] text-2xl"></span>
                        <span className="">Classes</span>
                    </NavLink>
                </ul>

                <div className="flex flex-col gap-5 py-5 px-3">
                    <NavLink
                        to={"/settings"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        <span className="icon-[weui--setting-filled] text-2xl"></span>
                        <span className="">Settings</span>
                    </NavLink>

                    <button type="button" onClick={() => logout.mutate()} className="p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                    text-white">
                        <span className="icon-[ion--exit] text-2xl "></span>
                        <span className="">Logout</span>
                    </button>

                    {/*<NavLink
                        to={"/logout"}
                        className={({isActive}) =>
                            `p-3 flex items-center gap-5 cursor-pointer font-bold text-md rounded-lg
                 ${isActive ? "bg-[#B5D3B0] text-[#3B3B3B]" : "text-white"}`
                        }
                    >
                        <span className="icon-[ion--exit] text-2xl"></span>
                        <span className="">Logout</span>
                    </NavLink>*/}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
