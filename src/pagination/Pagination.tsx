import { useEffect, useRef, useState } from "react";
import UserCard from "./UserCard";

export type UserCardType = {
  name: string;
  email: string;
  url: string;
};
function Pagination() {
  const baseURL = "https://dummyjson.com/users";
  const [users, setUsers] = useState<UserCardType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const totalUsers = useRef(0);
  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${baseURL}?limit=${10}&skip=${(currentPage - 1) * 10}`
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        totalUsers.current = result.total;
        setUsers(result.users);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <div>
      <h1>Pagination</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          {users.map((user, index) => (
            <UserCard
              key={index}
              email={user.email}
              name={user.name}
              url={user.url}
            />
          ))}
        </div>
      )}
      {/* <div className="mt-6 flex gap-3">
        {Array.from({ length: totalUsers.current / 10 }).map((item, index) => (
          <button
            key={index}
            className="w-fit text-blue-800 px-4 py-2 rounded-lg bg-blue-100"
            onClick={() => {
              setCurrentPage((currentPage) => currentPage + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
      <div className="mt-6 flex gap-3">
        {currentPage > 1 && (
          <button
            className="w-fit text-blue-800 px-4 py-2 rounded-lg bg-blue-100"
            onClick={() => {
              setCurrentPage((currentPage) => currentPage - 1);
            }}
          >
            Previous
          </button>
        )}
        <button
          className="w-fit text-blue-800 px-4 py-2 rounded-lg bg-blue-100"
          onClick={() => {
            setCurrentPage((currentPage) => currentPage - 1);
          }}
        >
          {currentPage - 1}
        </button>
        <button
          className="w-fit text-blue-800 px-4 py-2 rounded-lg bg-blue-200"
          onClick={() => {
            setCurrentPage((currentPage) => currentPage);
          }}
        >
          {currentPage}
        </button>
        <button
          className="w-fit text-blue-800 px-4 py-2 rounded-lg bg-blue-100"
          onClick={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}
        >
          {currentPage + 1}
        </button>

        {currentPage < totalUsers.current && (
          <button
            className="w-fit text-blue-800 px-4 py-2 rounded-lg bg-blue-100"
            onClick={() => {
              setCurrentPage((currentPage) => currentPage + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
