import { Album } from "../models/albumModel.js";


// Getting All albums
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({});
    res.status(200).json({ albums });
  } catch (error) {
    next(error);
  }
}


// Getting Album by Id
export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");

    if(!album) {
      return res.status(404).json({ message: "Album not found", success: false });
    }

    res.status(200).json({ album });
  } catch (error) {
    next(error);
  }
}