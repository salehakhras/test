import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen min-h-fit">
        <div className=" bg-base-200 sm:shadow-md p-10 items-center flex flex-col space-y-5 h-full sm:h-fit w-full sm:w-fit ">
          <div className="flex flex-col w-2xs sm:w-85 space-y-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
