import { Song } from "../models/songsModel.js";
import { User } from "../models/userModel.js";
import { Album } from "../models/albumModel.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums", // Ensure "albums" matches the actual collection name
              pipeline: [],
            },
          },
          {
            $match: { artist: { $exists: true, $ne: null } }, // Ensure only documents with an artist are counted
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists.length > 0 ? uniqueArtists[0].count : 0, // Safe fallback
    });
  } catch (error) {
    next(error);
  }
};
