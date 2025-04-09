import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../../skl/sidebar";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = () => {
  const { getUser, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const filteredUsers = showOnlineOnly
    ? users.filter((value) => onlineUsers?.includes(value._id))
    : users;
  console.log(filteredUsers, "filteredUsers");
  console.log(onlineUsers, "onlineUsers");

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers?.length || 0} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((value) => (
          <button
            key={value._id}
            onClick={() => setSelectedUser(value)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === value._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={
                  value.profilePic ||
                  "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/refs/heads/master/frontend/public/avatar.png"
                }
                alt={value.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers!.includes(value._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{value.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers?.includes(value._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;