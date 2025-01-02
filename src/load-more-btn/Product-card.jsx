function ProductCard({ title, price, reviewsCount, rating, url }) {
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl min-w-[200px] max-w-[300px]">
        <img
          className="h-48 w-full object-cover object-end"
          src={url}
          alt="Home in Countryside"
        />
        <div className="p-4">
          <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
            {title}
          </h4>

          <div className="text-start mt-1">
            <span>${price}</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-teal-600 font-semibold">
              <span>
                {[...Array(5)].map((_, index) => (
                  <i
                    className={`bi bi-star-fill ${
                      index < Math.floor(rating)
                        ? 'text-teal-600'
                        : 'text-zinc-300'
                    }`}
                    key={index}
                  ></i>
                ))}
                {/* <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i> */}
              </span>
              <span className="ml-2 text-gray-600 text-sm">
                {reviewsCount} reviews
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
