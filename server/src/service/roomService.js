import {
  addRoom,
  deleteRoom,
  getRoomNotFull,
  setRoomIsFullTrue,
} from "../database/repos/roomsRepo.js";


import {
  getRoomIdByUserId,
  getUsersIdByRoomId,
  removeRoomIdFromUser,
  updateRoomIdByUserId,
} from "../database/repos/usersRepo.js";


export async function findAvailableRoom(userId) {
  let room = await getRoomIdByUserId(userId);
  if (room) {
    console.log(userId, "already in room", room)

    return room
  }

  room = await getRoomNotFull();
  if (room) {
    await setRoomIsFullTrue(room.id);
    await updateRoomIdByUserId(userId, room.id);
    console.log(userId, "entered room", room.id, "Now 2 in room", )
  } else {
    await addRoom();
    room = await getRoomNotFull();
    await updateRoomIdByUserId(userId, room.id);
    console.log(userId, "entered room", room.id, "Now 1 in room", )

  }
  return room.id
}

export async function leaveRoom(roomId) {
  
  await deleteRoom(roomId);
  const users = await getUsersIdByRoomId(roomId);
  users.forEach((user) => removeRoomIdFromUser(user.id));
}
