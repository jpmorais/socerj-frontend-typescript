import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const UserMenu = ({ children }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
      {children}
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
      >
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};
export default UserMenu;
