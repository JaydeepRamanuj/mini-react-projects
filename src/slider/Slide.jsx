function Slide({ url }) {
  return (
    <div className="rounded-md overflow-hidden h-[500px] min-w-full">
      <img src={url} alt="" className="h-100 w-100 object-cover" />
    </div>
  );
}

export default Slide;
