import {
  addRoom,
  deleteRoom,
  getRoom,
  setRoomIsFullTrue,
} from "../database/repos/rooms/roomsRepo.js";
import {
  getUserById,
  getUsersIdByRoomId,
  removeRoomIdFromUser,
  updateRoomIdByUserId,
} from "../database/repos/usersRepo.js";

export async function findAvailableRoom(userId) {
  let room = await getRoom();

  if (room) {
    await setRoomIsFullTrue(room.id);
    await updateRoomIdByUserId(userId, room.id);
  } else {
    await addRoom();
    room = await getRoom();
    await updateRoomIdByUserId(userId, room.id);
  }
}

export async function closeRoom(roomId) {
  deleteRoom(roomId);
  const users = await getUsersIdByRoomId(roomId);
  users.forEach((user) => removeRoomIdFromUser(user.id))
}

// async function run() {
//   const userId = 1;
//   let user = await getUserById(userId);
//   console.log(user);

//   await findAvailableRoom(userId);
//   user = await getUserById(userId);
//   console.log(user);
//   await closeRoom(3);
//   user = await getUserById(userId);
//   console.log(user);
// }
// run();
