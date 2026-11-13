import { Song } from "../models/songsModel.js";
import { Album } from "../models/albumModel.js";
import { uploadToS3, deleteFromS3 } from "../lib/s3.js";

export const createSong = async (req, res, next) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload all files" });
		}

		const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		const [audioUrl, imageUrl] = await Promise.all([
			uploadToS3(audioFile, "songs"),
			uploadToS3(imageFile, "images"),
		]);

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			albumId: albumId || null,
		});

		await song.save();

		// if song belongs to an album, update the album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}
		res.status(201).json(song);
	} catch (error) {
		console.log("Error in createSong", error);
		next(error);
	}
};

export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);
		if (!song) {
			return res.status(404).json({ message: "Song not found" });
		}

		// if song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);
		await Promise.all([deleteFromS3(song.audioUrl), deleteFromS3(song.imageUrl)]);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		if (!req.files || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload an image" });
		}
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToS3(imageFile, "albums");

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		const album = await Album.findById(id);
		if (!album) {
			return res.status(404).json({ message: "Album not found" });
		}
		const songs = await Song.find({ albumId: id });
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		await Promise.all([
			deleteFromS3(album.imageUrl),
			...songs.flatMap((s) => [deleteFromS3(s.audioUrl), deleteFromS3(s.imageUrl)]),
		]);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};