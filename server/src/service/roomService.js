import {
  addRoom,
  deleteRoom,
  getRoom,
  getRoomById,
  setRoomIsFullTrue,
} from "../database/repos/rooms/roomsRepo.js";
import {
  addRoomTracks,
  deleteRoomTracksByRoomId,
} from "../database/repos/rooms/roomTracksRepo.js";
import { deleteRoomUserCarsByRoomId } from "../database/repos/rooms/roomUserCarsRepo.js";
import { getTracksByRoomId } from "../database/repos/tracksRepo.js";
import {
  getUserById,
  getUsersIdByRoomId,
  removeRoomIdFromUser,
  updateRoomIdByUserId,
} from "../database/repos/usersRepo.js";
import  {getUserCarsByRoomId } from "../database/repos/userCarsRepo.js";
export async function findAvailableRoom(userId) {
  let room = await getRoom();

  if (room) {
    await setRoomIsFullTrue(room.id);
    await updateRoomIdByUserId(userId, room.id);
  } else {
    await addRoom();
    room = await getRoom();
    await updateRoomIdByUserId(userId, room.id);
    await addRoomTracks(room.id);
  }
}

export async function closeRoom(roomId) {
  await deleteRoomTracksByRoomId(roomId);
  await deleteRoomUserCarsByRoomId(roomId);
  await deleteRoom(roomId);
  const users = await getUsersIdByRoomId(roomId);
  users.forEach((user) => removeRoomIdFromUser(user.id));
}

export async function getRoomCascading(roomId) {
  const room = await getRoomById(roomId);
  if (!room) return null;

  const userIds = await getUsersIdByRoomId()
  
  const tracks = await getTracksByRoomId(roomId)


  const userCars = await getUserCarsByRoomId(); // disse skal mappes.
}







async function run() {
  // const userId = 1;
  // let user = await getUserById(userId);
  // console.log(user);

  // await findAvailableRoom(userId);
  // user = await getUserById(userId);
  // console.log(user);
  await closeRoom(7);
  // user = await getUserById(userId);
  // console.log(user);
}
run();
