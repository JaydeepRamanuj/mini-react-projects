function Card() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid gap-10">
        <div className="rounded overflow-hidden shadow-lg flex flex-col">
          <a href="#"></a>
          <div className="relative">
            <a href="#">
              <img
                className="w-full"
                src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                alt="Sunset in the mountains"
              ></img>
              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </a>
            <a href="#!">
              <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                Cooking
              </div>
            </a>
          </div>
          <div className="px-6 py-4 mb-auto">
            <a
              href="#"
              className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
            >
              Simplest Salad Recipe ever
            </a>
            <p className="text-gray-500 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
            <span
              href="#"
              className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
            >
              <span className="ml-1">6 mins ago</span>
            </span>

            <span
              href="#"
              className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
            >
              <span className="ml-1">39 Comments</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
