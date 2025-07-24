import NavBar from "../component_folder/NavBar";
import Sidebar from "../component_folder/sidebar";

function Settings() {
  return (
    <>
      <div className="bg-[#D4F0CF] h-dvh flex">
        <Sidebar />

        {/* MAIN MENU CARD */}
        <div className="main grow overflow-auto">
          <NavBar />

          <div className="p-4">
            <h1 className="font-semibold py-4 text-xl">Profile Info</h1>

            <div className="profileInfo flex items-center gap-10 px-11 py-5 shadow-lg rounded-lg">
              <div className="avatar">
                <div className="w-23 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>

              <div className="font-semibold flex flex-col gap-2">
                <p>Jane Doe</p>
                <p>Admin</p>
                <p>Philippines</p>
              </div>
            </div>

            <div className="profileInfo flex flex-col items-center gap-5 px-11 py-10 shadow-lg rounded-lg">
              <div className="form-group w-full flex flex-col gap-2">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  className="input focus:outline-0 w-full"
                  value={`Jane Doe`}
                  readOnly
                />
              </div>

              <div className="form-group w-full flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="input focus:outline-0 w-full"
                  value={`haha@gmail.com`}
                  readOnly
                />
              </div>

              <div className="form-group w-full flex flex-col gap-2">
                <label htmlFor="">Grade</label>
                <input
                  type="text"
                  className="input focus:outline-0 w-full"
                  value={`11`}
                  readOnly
                />
              </div>

              <div className="form-group w-full flex flex-col gap-2">
                <label htmlFor="">Section</label>
                <input
                  type="text"
                  className="input focus:outline-0 w-full"
                  value={`Earth`}
                  readOnly
                />
              </div>

              <button className="w-full btn btn-success">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
