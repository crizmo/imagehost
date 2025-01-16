# Image Hosting App

This project is a image host built with Node.js and Express. It allows users to upload images, which are stored in MongoDB using GridFS. The application provides a RESTful API for uploading, retrieving, listing, and deleting images.

## Features

- Upload images to the server
- Retrieve images via a URL
- List all uploaded images
- Delete images by filename
- Store images in MongoDB using GridFS

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- GridFS
- dotenv

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd image-hosting-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add your MongoDB connection string:**

   ```
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=<port-number>
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

## API Endpoints

- **POST /api/images/upload**: Upload an image.
  - Request: Form-data with the image file.
  - Response: JSON containing the URL of the uploaded image.

- **GET /api/images/:filename**: Retrieve an image by filename.
  - Response: The image file.

- **GET /api/images**: List all uploaded images.
  - Response: JSON array of image metadata.

- **DELETE /api/images/:filename**: Delete an image by filename.
  - Response: JSON message confirming deletion.

## Usage

You can use tools like Postman or cURL to test the API endpoints. For uploading images, make sure to set the request type to `POST` and include the image file in the form-data.