import { Song } from './../models/songsModel.js';
import { Album } from './../models/albumModel.js';
import cloudinary from './../lib/cloudinary.js';


//helper function for cloudinary for uplaod
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    })

    return result.secure_url
  } catch (error) {
    console.log("Error in uploading to cloudinary", error);
    throw new Error("Error in uploading to cloudinary")
  }
}


// creating song
export const createSong = async (req, res, next) => {
  try {
    // Validate file presence
    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({ message: "Audio and image are required", success: false });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audio;
    const imageFile = req.files.image;

    // Validate file types
    if (!audioFile.mimetype.startsWith("audio/") || !imageFile.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Invalid file type", success: false });
    }

    // Upload files to Cloudinary concurrently
    const [audioUrl, imageUrl] = await Promise.all([
      uploadToCloudinary(audioFile),
      uploadToCloudinary(imageFile),
    ]);

    // Create song document
    const song = new Song({
      title,
      artist,
      albumId: albumId || null,
      imageUrl,
      audioUrl,
      duration,
    });
    await song.save();

    // Update album if albumId is provided
    if (albumId) {
      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).json({ message: "Album not found", success: false });
      }
      album.songs.push(song._id);
      await album.save();
    }

    res.status(201).json({ message: "Song created successfully", success: true, song });
  } catch (error) {
    console.error("Error creating song", error);
    next(error);
  }
};




// deleting song
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if(song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: {
          songs: song._id
        }
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting song", error);
    next(error);
  }
}


// creating album
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const {imageFile} = req.files;


    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    await album.save();

    res.status(201).json({ message: "Album created successfully", success: true, album });
  } catch (error) {
    console.error("Error creating album", error);
    next(error);
  }
}



// delteing album
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting album", error);
    next(error);
  }
}



// checking admin 
export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ message: "Admin", success: true , admin: true});
}


