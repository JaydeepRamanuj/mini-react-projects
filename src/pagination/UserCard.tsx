import type { UserCardType } from "./Pagination";

function UserCard({ name, email, url }: UserCardType) {
  return (
    <div className="p-2 rounded shadow-md w-fit flex items-center">
      <img src={url} alt={name} className="size-9 rounded-full object-cover" />
      <div>
        <span className="text-lg text-slate-600">{name}</span>
        <span className="text-gray-400">{email}</span>
      </div>
    </div>
  );
}

export default UserCard;
