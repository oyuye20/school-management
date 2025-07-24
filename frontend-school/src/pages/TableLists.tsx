import {
  BadgeQuestionMark,
  Building2,
  Camera,
  ChartPie,
  Eye,
  Menu,
  Pencil,
  Settings,
  Trash,
  UserRound,
} from "lucide-react";
import Sidebar from "../component_folder/sidebar";
import NavBar from "../component_folder/NavBar";
import { useSearchParams } from "react-router-dom";
import { useState, type FormEvent } from "react";
import Table from "../component_folder/Table";
import Pagination from "../component_folder/Pagination";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    first_name: z.string().nonempty("First name required"),
    middle_name: z.string().default("qwewq").nullable(),
    last_name: z.string().nonempty("Last name required"),
    birthday: z.string().nonempty("Birthday required"),
    house_no: z.string().nonempty("House number required"),
    street: z.string().nonempty("Street required"),
    province: z.string().nonempty("Province required"),
    city: z.string().nonempty("City required"),
    barangay: z.string().nonempty("Barangay required"),
    email: z.email().nonempty("Email required"),
    password: z
      .string()
      .nonempty("Password required")
      .min(6, "Password must minimum of length of 6"),
    confirm_pass: z.string(),
  })
  .refine((data) => data.password === data.confirm_pass, {
    error: "Password don't match",
    path: ["confirm_pass"],
  });

type StudentFields = z.infer<typeof schema>;

function TableLists() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFields>({
    resolver: zodResolver(schema),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleMiddleName, setMiddleName] = useState(true);

  const query = searchParams.get("q");
  const [term, setTerm] = useState(query || "");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams((prev) => ({ ...prev, q: term }));
  };

  const saveStudent = (data: StudentFields) => {
    console.log(data);
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-[600px] overflow-auto max-h-[600px]">
          <h1 className="font-bold text-2xl flex items-center gap-2">
            Add new student
            <span className="icon-[ion--people] text-2xl"></span>
          </h1>

          {/* <button className="btn" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).close()}>Close modal</button> */}

          <form
            className="py-4 flex flex-col gap-4"
            onSubmit={handleSubmit(saveStudent)}
          >
            <div className="personal-info flex flex-col gap-4 pb-2">
              <h2 className="font-semibold text-lg">Personal Details</h2>

              <div className="flex flex-col gap-4">
                <div className="form-group flex flex-col gap-2">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    placeholder="Input here.."
                    {...register("first_name")}
                    className="input w-full"
                    id="first_name"
                    name="first_name"
                  />
                  {errors.first_name && (
                    <span className="text-red-500 font-semibold text-md">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>

                <div className="form-group flex flex-col gap-2">
                  {toggleMiddleName && (
                    <>
                      <label htmlFor="first_name">Middle Name</label>
                      <input
                        type="text"
                        placeholder="Input here.."
                        {...register("middle_name")}
                        className="input w-full"
                        id="middle_name"
                        name="middle_name"
                      />
                    </>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="no_middleName"
                      name="no_middleName"
                      onClick={() => setMiddleName(!toggleMiddleName)}
                    />
                    <label htmlFor="no_middleName">No middle name</label>
                  </div>
                </div>

                <div className="form-group flex flex-col gap-2">
                  <label htmlFor="first_name">Last Name</label>
                  <input
                    type="text"
                    placeholder="Input here.."
                    {...register("last_name")}
                    className="input w-full"
                    id="last_name"
                    name="last_name"
                  />
                  {errors.last_name && (
                    <span className="text-red-500 font-semibold text-md">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>

                <div className="form-group flex flex-col gap-2">
                  <label htmlFor="first_name">Birthday</label>
                  <input
                    type="date"
                    placeholder="Birthday"
                    {...register("birthday")}
                    className="input w-full"
                    id="birthday"
                    name="birthday"
                  />
                  {errors.birthday && (
                    <span className="text-red-500 font-semibold text-md">
                      {errors.birthday.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-[#3B3B3B]" />

            <div className="address-info flex flex-col gap-4">
              <h2 className="font-semibold text-lg">Address Details</h2>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="house_no">House no. / Building no.</label>
                <input
                  type="text"
                  {...register("house_no")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="house_no"
                  name="house_no"
                />
                {errors.house_no && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.house_no.message}
                  </span>
                )}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  {...register("street")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="street"
                  name="street"
                />

                {errors.street && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.street.message}
                  </span>
                )}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  {...register("province")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="province"
                  name="province"
                />
                {errors.province && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.province.message}
                  </span>
                )}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="city">Municipality / City</label>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="city"
                  name="city"
                />
                {errors.city && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="barangay">Barangay</label>
                <input
                  type="text"
                  {...register("barangay")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="barangay"
                  name="barangay"
                />
                {errors.barangay && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.barangay.message}
                  </span>
                )}
              </div>
            </div>

            <hr className="border-[#3B3B3B]" />

            <div className="account-info flex flex-col gap-4">
              <h2 className="font-semibold text-lg">Account Details</h2>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="email"
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Input here.."
                  className="input w-full"
                  id="password"
                  name="password"
                />
                {errors.password && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label htmlFor="confirm_pass">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Input here.."
                  {...register("confirm_pass")}
                  className="input w-full"
                  id="confirm_pass"
                  name="confirm_pass"
                />
                {errors.confirm_pass && (
                  <span className="text-red-500 font-semibold text-md">
                    {errors.confirm_pass.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button type="submit" className="btn bg-[#72AF72] text-white">
                {" "}
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  ).close()
                }
              >
                Close
              </button>
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

            <form
              onSubmit={handleSearch}
              className="searchBar1 flex my-5 justify-between items-center gap-5"
            >
              <div className="searchBox flex grow">
                <input
                  type="text"
                  className="input w-full bg-transparent focus:outline-0
                                outline-0 focus:outline-[#3B3B3B]"
                  placeholder="Search something..."
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </div>

              <button className="btn btn-primary">Search</button>
            </form>

            <Table />

            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableLists;
