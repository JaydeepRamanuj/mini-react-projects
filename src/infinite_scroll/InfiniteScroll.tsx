import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

type UserType = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

function InfiniteScroll() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const page = useRef(10);
  const hasFetched = useRef(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const baseUrl = "https://randomuser.me/api/";
      const response = await fetch(
        `${baseUrl}?&results=10&seed=xyz&page=${page.current}&&inc=picture,name,email,location`
      );

      if (response.ok) {
        const result = await response.json();
        // console.log("result =>", result);

        setUsers((prev) => [...prev, ...result.results]);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error getting users", error);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    const nearEnd = scrollTop > scrollHeight - clientHeight - 200;
    if (nearEnd) {
      console.log("Reached near end");
      if (!loading && !hasFetched.current) {
        hasFetched.current = true;
        page.current += 1;
        getUsers();
      }
    }

    if (!nearEnd) {
      hasFetched.current = false;
    }
  };

  useEffect(() => {
    getUsers();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <h1 className="text-blue-800 text-3xl font-semibold text-center">
        InfiniteScroll
      </h1>

      <div className=" mt-20 w-fit mx-auto flex flex-col gap-6">
        {users.map((user, i) => {
          return (
            <div
              key={i}
              className="max-w-[300px] p-4 bg-gray-100 rounded-lg shadow hover:bg-blue-100 hover:shadow-lg hover:scale-[1.05] flex flex-col items-center"
            >
              <img
                src={user.picture.medium}
                alt={user.name.first}
                className="size-40 rounded-full"
              />
              <h1 className="text-2xl text-blue-500 font-semibold">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
              <p className="flex items-center gap-3">
                <MdEmail /> {user.email}
              </p>
              <p className="flex items-center gap-3">
                <FaLocationDot />{" "}
                {`${user.location.city} ${user.location.country}`}
              </p>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-4 text-blue-500 font-semibold w-fit mx-auto">
          <span className="block size-10 rounded-full border-4 border-b-transparent animate-spin mx-auto my-3"></span>
          <span className="">Loading more users...</span>
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
