KrishiNext
KrishiNext is a dynamic web platform built for wholesale crop trading, aiming to connect farmers and buyers in a seamless, efficient, and transparent way. Although still under development, it boasts a rich feature set tailored for both sellers and consumers in the agricultural ecosystem.

🌐 Deployed Link
Coming soon...
(Note: Some features like real-time WebSocket updates are not supported on Vercel. For full functionality, run the project locally.)

  <img width="1911" height="989" alt="1" src="https://github.com/user-attachments/assets/36124717-5768-4b0e-b0b4-fa4a178dd6d2" />

🧱 Architecture
<img width="940" height="990" alt="image" src="https://github.com/user-attachments/assets/fd57d940-9342-4827-9e70-f316350502e0" />

🚀 Features
🧑‍🌾 Seller Side
Email-Based Authentication
Signup/Login with email verification for secured access.

Product Management
Add, update, or delete products with support for:

Images via Cloudinary

Stock & MOQ handling

Location mapping using Leaflet

Order Management Dashboard
View order requests and see exact consumer locations on an interactive map.

Sales Data Visualization
Recharts integration for meaningful graphical sales insights.

FAQ Section
Respond to common questions, visible to consumers.

CropSense AI (Powered by Gemini)
Predict suitable crops based on user-defined parameters using Gemini AI API.

👨‍🌾 Consumer Side
Intuitive Browsing
Explore products by category on a clean and easy-to-use interface.

Product Dashboard
See detailed info including current stock, MOQ, pricing, and location.

Review System
Leave and read product reviews for better trust and transparency.

Contact Farmer Form
Directly message sellers; responses populate the FAQ.

Interactive Cart
Real-time quantity control based on MOQ and available stock.

Secure Checkout
Calculate delivery cost, set delivery location, and confirm orders easily.

Real-Time Stock Updates
Live stock tracking via WebSocket (only available in local setup).

⚙️ Technologies Used
Frontend: ReactJS, Redux, Tailwind CSS, Leaflet, Recharts, Unsplash

Backend: NodeJS, ExpressJS, MongoDB

Others:

Socket.io (WebSocket for real-time updates)

Cloudinary (image uploads)

Gemini AI (crop prediction)

Nodemailer (email verification)

📦 Installation Guide
To run KrishiNext locally, make sure NodeJS and MongoDB are installed.

🔧 Step 1: Clone the Repository
bash
Copy
Edit
git clone <repository-url>
cd KrishiNext
🖥️ Step 2: Frontend Setup
bash
Copy
Edit
cd client
touch .env
Add the following to client/.env:

plaintext
Copy
Edit
VITE_CROPCONNECT_API=https://krishiNext-backend.vercel.app/
# Use http://localhost:8080/ if running backend locally
Start the frontend:

bash
Copy
Edit
npm install
npm run dev
🗄️ Step 3: Backend Setup
bash
Copy
Edit
cd ../server
touch .env
Add the following to server/.env:

plaintext
Copy
Edit
MONGO_DB_URL=<your mongodb url>
GEMINI_API_KEY=<your gemini api key>
GMAIL_ID=<your gmail id>
APP_PASSWORD=<your google app password>
JWT_SECRET=<your jwt secret>
CLOUDINARY_CLOUD_NAME=<your cloudinary name>
CLOUDINARY_API_KEY=<your cloudinary api key>
CLOUDINARY_API_SECRET=<your cloudinary api secret>
Install and run backend:

bash
Copy
Edit
npm install
nodemon
# or
node index.js
🧪 Development Notes
🔁 WebSocket (Socket.io) for real-time updates is disabled on Vercel. Use a local environment to test.

🧠 CropSense AI feature uses Gemini API to predict optimal crops.

🗺️ Leaflet enables accurate map-based product and location selections.

