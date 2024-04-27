const Admin = require("../models/Admin");
const User = require("../models/User")
const Albums = require("../models/Albums")
const Songs = require("../models/Songs")
const Playlist = require("../models/PlayLists")



const multer = require('multer')
const path = require('path')
const fs = require('fs')


const viewusers = async (request, response) => 
{
   try 
   {
     const users = await User.find();
     if(users.length==0)
     {
       response.status(200).send("DATA NOT FOUND");
     }
     else
     {
       response.json(users);
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };
  const deleteuser = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const user = await User.findOne({"email":email})
      if(user!=null)
      {
        await User.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './albums/'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // File naming convention
    }
  });
  
  const upload = multer({ storage: storage }).single('file');

  const createalbum = async (req, res) =>
    {
      try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { name } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newAlbums = new Albums({
            name,
            file: fileName // Save only the file name
          });
    
          await newAlbums.save();
          res.status(200).send('Album Created Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };

  const viewalbums = async (req, res) => 
{
  try 
  {
    const albums = await Albums.find();
    res.status(200).json(albums);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};
const createplaylist = async (req, res) =>
{
  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      const { name } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newPlaylist = new Playlist({
        name,
        file: fileName // Save only the file name
      });

      await newPlaylist.save();
      res.status(200).send('Album Created Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};
// const viewplaylists = async (req, res) => 
// {
//   try 
//   {
//     const playlist = await Playlist.find();
//     res.status(200).json(playlist);
//   } 
//   catch (error) 
//   {
//     res.status(500).send(error.message);
//   }
// };


    
const albumimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../albums', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}

const playlistimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../albums', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}

const songstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './songs/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const songupload = multer({ storage: songstorage }).single('file');

const addsong = async (req, res) =>
{
  try 
  {
    songupload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      const { moviename, songname, date, singers, image } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name
          
    const ext = path.extname(fileName).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream

if (ext === '.mp3') {
      const newSong = new Songs({
        moviename,
        songname,
        date,
        singers,
        image,
        file: fileName // Save only the file name
      });

      await newSong.save();
      res.status(200).send('Song Added Successfully');
    }
    else{
      res.status(200).send('Invalid file format');
    }
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const songaudio = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../songs', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream

if (ext === '.mp3') {
  contentType = 'audio/mpeg';
} 

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}

const viewsongs = async (req, res) => 
{
  const moviename = req.params.moviename;
  try 
  {
    const songs = await Songs.find({'moviename':moviename});
    res.status(200).json(songs);
    
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const viewplaylist = async (req, res) => 
{
  // const moviename = req.params.moviename;
  try 
  {
    const songs = await Songs.find({});
    res.status(200).json(songs);
    
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const viewalbumimg = async (req, res) => 
{
  const moviename = req.params.moviename;
  try 
  {
    const album = await Albums.findOne({'moviename':moviename});
    res.status(200).json(album);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

// const fetchimg = async (req, res) => 
// {
//   try 
//   {
//     const album = req.params.album
//     const img = await Albums.findOne({album});
//     res.json(img);
//   } 
//   catch (error) 
//   {
//     res.status(500).send(error.message);
//   }
// };

const playsong = async (req, res) => 
{
  const songname = req.params.songname;
  try 
  {
    const song = await Songs.find({'songname':songname});
    // console.log(song)
    res.status(200).json(song);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

  module.exports = {viewusers,deleteuser,checkadminlogin,createalbum,viewalbums,albumimage,addsong,songaudio,viewsongs,viewalbumimg,playsong,viewplaylist,createplaylist,playlistimage}