import { addRoomUserCars, getRoomUserCarsByRoomId } from "../database/repos/rooms/roomUserCarsRepo";


export async function addUserCarsToRoom(roomId, userCarIds) {
    await addRoomUserCars(roomId, userCarIds);
    const roomUserCars = await getRoomUserCarsByRoomId(roomId);

    if (roomUserCars.length == 10) {
        console.log("Both players are ready")
    }

}