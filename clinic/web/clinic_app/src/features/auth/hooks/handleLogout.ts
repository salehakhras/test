import type { AppDispatch } from "../../../store/store";
import { logout } from "../slices/authThunk";

interface LogoutPayLoad {
  dispatch: AppDispatch;
}

export const handleLogout =
  ({ dispatch }: LogoutPayLoad) =>
  async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(logout());
  };
