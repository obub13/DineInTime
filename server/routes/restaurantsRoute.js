const Restaurant = require('../models/restaurants');
const restaurantsRoute = require('express').Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const multer = require('multer');  //installed and imported to handle images
const fs = require('fs') //imported to create new folder for images incase theres no folder
const admin = require('firebase-admin');
const { default: axios } = require('axios');

// const storage = admin.storage();
// const storageRef = storage.ref();

const firebaseConfig = {
    apiKey: 'AIzaSyAdm5EqMtxOPBNwE8hqROVz6cjLxyEISLY',
    authDomain: 'dineintime-5ccb4.firebaseapp.com',
    projectId: 'dineintime-5ccb4',
    storageBucket: 'dineintime-5ccb4.appspot.com',
    messagingSenderId: '268164995282',
    appId: '1:268164995282:web:dc0713848b6bd8cc89f50b',
  };

  // console.log(firebaseConfig);
//   firebase.initializeApp(firebaseConfig);
  admin.initializeApp(firebaseConfig)
  

// Upload the photo
// const file = 'path_to_your_photo.jpg'; // Replace with the actual path to your photo
// const photoRef = storageRef.child('images/' + file);

// photoRef.put(file).then(snapshot => {
//   console.log('Uploaded a file!', snapshot);
// }).catch(error => {
//   console.error('Error uploading file:', error);
// });

// // Get the download URL
// photoRef.getDownloadURL().then(downloadURL => {
//     console.log('Download URL:', downloadURL);
  
//     // Here you can save the `downloadURL` to your MongoDB database.
//     // You can use your MongoDB driver to perform this operation.
//   }).catch(error => {
//     console.error('Error getting download URL:', error);
//   });

//   const document = {
//     imageUrl: downloadURL,
//     // ...other data you want to store
//   };
//   restaurantsRoute.post('upload', async (req, res) =>{
//     try {
//         let data = await Restaurant.Upload(id, imageUrl);
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error:error.message })
//     }
//   })



restaurantsRoute.get('/', async (req, res) => {
    try {
        let data = await Restaurant.FindAllRestaurants();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await Restaurant.FindById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.get('/:id/orders', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await Restaurant.FindById(id);
        let orders = data.orders || [];
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.get('/email/:email', async (req, res) => {
    try {
        let { email } = req.params;
        let data = await Restaurant.FindByEmail(email);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        let data = await Restaurant.LoginRestaurant(username, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//creating images folder and saving image file.
// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         const uploadDestination = 'images/';
//         //checks for images folder, if not found creates images folder
//         if(!fs.existsSync(uploadDestination)){
//             fs.mkdirSync(uploadDestination)
//         }
//         cb(null, uploadDestination);
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// const upload = multer({storage: storage})

// restaurantsRoute.post('/add', upload.single('image'), async (req, res) => {
//     try {
//         let { email, phone, name, location, address, foodType, availableSeats, locationSeats: { inside, outside, bar }, password, verify } = req.body;
//         // If an image was uploaded, you can access its details using req.file
//         const imageFilePath = req.file ? req.file.path : null;
//         let data = await new Restaurant(email, phone, name, location, address, foodType, imageFilePath, availableSeats, { inside, outside, bar }, password, verify).InsertOne();
        
//         res.status(201).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

restaurantsRoute.post('/find', async (req, res) => {
    try {
        let { location, foodType, diners } = req.body;
        let data = await Restaurant.FindRestaurantsForUser(location, foodType, diners);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.post('/orders/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { userId, seatType, diners } = req.body;
        let data = await Restaurant.AddOrder(id, userId, seatType, diners);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.post('/:id/menu', async (req, res) => {
    try {
        let { id } = req.params;
        let { name, price, image, category } = req.body;
        let data = await Restaurant.AddItem(id, name, price, image, category);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.put('/seats', async (req, res) => {
    try {
      let { id, seatType, numDiners } = req.body;
      let data = await Restaurant.UpdateSeats(id, seatType, numDiners);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
});

restaurantsRoute.put('/inc/seats', async (req, res) => {
    try {
      let { id, seatType, numDiners } = req.body;
      let data = await Restaurant.UpdateSeatsBack(id, seatType, numDiners);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
});

restaurantsRoute.put('/approved/:id', async (req, res) => {
    try {
      let { id } = req.params;
      let data = await Restaurant.ChangeApproved(id);
      res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.put('/:id/order/approved', async (req, res) => {
    try {
      let { id } = req.params;
      let { orderId } = req.body;
      let data = await Restaurant.OrderApproval(id, orderId);
      res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.put('/edit/:id/menu', async (req, res) => {
    try {
        let { id } = req.params;
        let { itemId, name, price, image, category } = req.body;
        const imgURI = req.body.image; // Extract the image URI from the request

        if (!imgURI) {
          return res.status(400).json({ message: 'Missing image URI' });
        }
    
        const blob = await getBlobFromUri(imgURI);
        console.log(blob);
        await manageFileUpload(blob, {
          onStart: () => {},
          onProgress: (progress) => {},
          onComplete: (downloadURL) => {
            image = downloadURL }});
        console.log(id, itemId, name, price, image);
        let data = await Restaurant.EditMenu(id, itemId, name, price, image, category);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
});


restaurantsRoute.post('/sendemail', async (req, res) => {
    try {
        let { email, subject, message } = req.body;
        let data = await Restaurant.SendEmail(email, subject, message);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
});

restaurantsRoute.delete('/delete/:id', async (req, res) =>{
    try {
        let { id } = req.params;
        let data = await Restaurant.DeleteRestaurant(id);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

restaurantsRoute.delete('/menu/:id/delete', async (req, res) =>{
    try {
        let { id } = req.params;
        let { itemId } = req.body;
        let data = await Restaurant.DeleteItem(id, itemId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

restaurantsRoute.delete('/:id/orders/delete', async (req, res) => {
    try {
        let { id } = req.params;
        let { orderId } = req.body;
        let data = await Restaurant.DeleteOrder(id, orderId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});



// const getBlobFromUri = async (uri) => {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", uri, true);
//       xhr.send(null);
//     });
  
//   console.log('FINISHING BLOB FUNC');  return blob;
//   };

//   const manageFileUpload = async (
//     fileBlob,
//     { onStart, onProgress, onComplete, onFail }
//   ) => {
//     console.log('starting mngfileupload function');
//     const imgName = "img-" + new Date().getTime();
  
//     const storageRef = admin.storage().ref(`images/${imgName}.jpg`);
  
//     console.log("uploading file", imgName);
  
//     // Create file metadata including the content type
//     const metadata = {
//       contentType: "image/jpeg",
//     };
  
//     // Trigger file upload start event
//     onStart && onStart();
//     const uploadTask = storageRef.put(fileBlob, metadata);
//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
//         // Monitor uploading progress
//         onProgress && onProgress(Math.fround(progress).toFixed(2));
//       },
//       (error) => {
//         // Something went wrong - dispatch onFail event with error  response
//         onFail && onFail(error);
//       },
//       () => {
//         // Upload completed successfully, now we can get the download URL
  
//         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           // dispatch on complete event
//           onComplete && onComplete(downloadURL);
  
//           console.log("File available at", downloadURL);
//           return downloadURL;
//         });
//       }
//     );
//   };

  const getBlobFromUri = async (uri) => {
    try {
      const response = await axios.get(uri, {
        responseType: 'arraybuffer',
      });
  
      if (response.status === 200) {
        return Buffer.from(response.data, 'binary');
      } else {
        throw new Error('Network request failed');
      }
    } catch (error) {
      throw new Error( error);
    }
  };

  const manageFileUpload = async (
    fileBlob,
    { onStart, onProgress, onComplete, onFail }
  ) => {
    const imgName = "img-" + new Date().getTime();
  
    const storageRef = admin.storage().bucket().file(`images/${imgName}.jpg`);
  
    // Create file metadata including the content type
    const metadata = {
      contentType: "image/jpeg",
    };
  
    // Trigger file upload start event
    onStart && onStart();
    const uploadStream = storageRef.createWriteStream({ metadata });
  
    uploadStream.on('error', (error) => {
      onFail && onFail(error);
    });
  
    uploadStream.on('finish', async () => {
      try {
        const downloadURL = await storageRef.getSignedUrl({
          action: 'read',
          expires: '03-09-2491' // Set an appropriate expiration date
        });
  
        onComplete && onComplete(downloadURL);
  
        console.log("File available at", downloadURL);
        return downloadURL;
      } catch (error) {
        onFail && onFail(error);
      }
    });
  
    // Pipe the fileBlob into the uploadStream
    fileBlob.pipe(uploadStream);
  };

module.exports = restaurantsRoute;