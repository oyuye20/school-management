import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchemaZod } from "../schemas/schemas.ts";
import { addStudents } from "../api/apiCalls.ts";

import { useMutation } from "@tanstack/react-query";
import z from "zod";

interface AddStudentProps {
  elementId: string;
}

type StudentFields = z.infer<typeof studentSchemaZod>;

const AddStudentModal: React.FC<AddStudentProps> = ({ elementId }) => {
  const {
    reset,
    setError,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFields>({
    resolver: zodResolver(studentSchemaZod),
    defaultValues: {
      hasNoMiddleName: false,
      middle_name: null,
    },
  });

  const hasNoMiddleName = watch("hasNoMiddleName");

  const mutationStudent = useMutation({
    mutationFn: async (dataField: StudentFields) => {
      await addStudents(dataField);
    },

    onError: (err) => {
      Object.entries(err.response.data.errors).forEach(([field, messages]) => {

        setError(field as keyof StudentFields, {
            type: "server",
            message: (messages as string[]).join("\n")
        })

        /* setError(field as keyof StudentFields, {
          type: "server",
          message: (messages as string[]).join("\n"), // Join multiple errors
        }); */

        // console.log(messages);
      });

      /* setError("email", {
        type: "server",
        message: err.response.data.message,
      }); */
    },
    onSuccess: () => {
      console.log("success..");

      //   reset();
    },
  });

  const saveStudent = (data: StudentFields) => {
    mutationStudent.mutate(data);

    console.log(data);
  };

  return (
    <>
      <dialog id={elementId} className="modal">
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
                  {!hasNoMiddleName && (
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
                      {errors.middle_name && (
                        <span className="text-red-500 font-semibold text-md">
                          {errors.middle_name.message}
                        </span>
                      )}
                    </>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      {...register("hasNoMiddleName")}
                      className="checkbox"
                      id="hasNoMiddleName"
                      name="hasNoMiddleName"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setValue("hasNoMiddleName", checked);
                        if (checked) {
                          setValue("middle_name", "NA"); // auto-clear middleName when checked
                        }
                      }}
                    />
                    <label htmlFor="hasNoMiddleName">No middle name</label>
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

                <div className="form-group flex flex-col gap-2">
                  <label htmlFor="first_name">Contact number</label>
                  <input
                    type="text"
                    placeholder="Input here.."
                    {...register("contact_number")}
                    className="input w-full"
                    id="contact_number"
                    name="contact_number"
                  />

                  {errors.contact_number && (
                    <span className="text-red-500 font-semibold text-md">
                      {errors.contact_number.message}
                    </span>
                  )}
                </div>

                <p>Gender</p>
                <div className="form-group flex gap-2">
                  <div className="radioBtn flex gap-2">
                    <input
                      id="male"
                      type="radio"
                      className="radio"
                      value="male"
                      {...register("gender")}
                    />
                    <label htmlFor="male">Male</label>
                  </div>

                  <div className="radioBtn flex gap-2">
                    <input
                      id="female"
                      type="radio"
                      className="radio"
                      value="female"
                      {...register("gender")}
                    />
                    <label htmlFor="female">Female</label>
                  </div>

                  <div className="radioBtn flex gap-2">
                    <input
                      id="others"
                      type="radio"
                      className="radio"
                      value="others"
                      {...register("gender")}
                    />
                    <label htmlFor="male">Others</label>
                  </div>
                </div>
              </div>

              {errors.gender && (
                <span className="text-red-500 font-semibold text-md">
                  {errors.gender.message}
                </span>
              )}
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
              <button
                type="submit"
                className="btn bg-[#72AF72] text-white"
                disabled={mutationStudent.isPending}
              >
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
    </>
  );
};

export default AddStudentModal;
