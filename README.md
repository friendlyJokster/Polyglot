# 🛠️ Polyglot Persistence Application

A full-stack web application showcasing **polyglot persistence**, integrating **MySQL (Relational DB) and MongoDB (NoSQL DB)** for efficient data management.  

## 🚀 Features
- **Node.js & Express.js** backend with **Express Validator** for API validation  
- **Polyglot persistence**: MySQL for structured data & MongoDB for flexible storage  
- **REST API** architecture  
- **Backend hosted on Render** and **APIs deployed on Clever Cloud**  
- **Frontend (in progress) using React.js**  
- **JavaScript** as the primary programming language  
- **VS Code** for development  

## 🏗️ Tech Stack
- **Backend:** Node.js, Express.js, Express Validator  
- **Databases:** MySQL & MongoDB  
- **Hosting:** Backend on **Render**, APIs on **Clever Cloud**  
- **Frontend (WIP):** React.js  
- **Version Control:** Git & GitHub  

## 🔧 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/friendlyJokster/Polyglot.git

# Navigate into the project directory
cd Polyglot

# Install dependencies
npm install

# Set up environment variables (.env file)
DB_MYSQL_URL=mysql://uihy064kjgavg2vo:mTUMFnKJqXlI2XT2h2YY@bp3w3fub1kacrjnoqgqc-mysql.services.clever-cloud.com:3306/bp3w3fub1kacrjnoqgqc
DB_MONGO_URL=mongodb://localhost:27017/my_database   #Not using at prosent

# Start the development server
npm start

API Endpoints

GET	     https://polyglot-c6j4.onrender.com/reviews	Fetch all reviews
POST     https://polyglot-c6j4.onrender.com/reviews	Add a new review
PUT	     /api/items/:id	Update an item
DELETE	 /api/items/:id	Delete an item

Future Enhancements
✅ Complete React.js frontend
✅ Add user authentication & authorization
✅ Optimize database queries for better performance

License
This project is open-source and available under the MIT License.

Contact
💬 Developed by: Nithin
🐙 GitHub: friendlyJokster    
