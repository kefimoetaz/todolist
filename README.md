# 🚀 Advanced MERN To-Do App

A modern, full-stack task management application built with MongoDB, Express.js, React, and Node.js, fully containerized with Docker.

## ✨ Features

### Core Functionality
- ✅ **CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **Task Categories** - Work, Personal, Shopping, Other with icons
- ✅ **Priority Levels** - High, Medium, Low with color coding
- ✅ **Due Dates** - Set deadlines with overdue indicators
- ✅ **Real-time Statistics** - Track completion rates and progress

### Advanced Features
- 🔍 **Smart Filtering** - Filter by status (All, Active, Completed)
- 📊 **Multiple Sorting** - Sort by date, priority, or due date
- 🎨 **Modern UI/UX** - Smooth animations and responsive design
- 📱 **Mobile Friendly** - Works perfectly on all devices
- 🐳 **Fully Dockerized** - Easy deployment and development

### Technical Features
- 🔄 **RESTful API** - Clean and well-structured backend
- 💾 **Data Persistence** - MongoDB with volume mounting
- 🚀 **Hot Reload** - Development-friendly setup
- 🛡️ **Input Validation** - Both frontend and backend validation
- 📝 **Error Handling** - Comprehensive error management

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed

## 🚀 Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git (for cloning the repository)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kefimoetaz/todolist.git
   cd todolist
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - 🌐 **Frontend**: http://localhost:3001
   - 🔧 **Backend API**: http://localhost:5000
   - 🗄️ **MongoDB**: localhost:27018

4. **Start managing your tasks!** 🎉

## Stopping the Application

```bash
docker-compose down
```

To remove volumes (delete all data):

```bash
docker-compose down -v
```

## 📁 Project Structure

```
mern-todo-app/
├── 📁 frontend/                 # React Frontend
│   ├── 📁 public/              # Static files
│   ├── 📁 src/
│   │   ├── 📁 components/      # React components
│   │   │   ├── TaskList.js     # Main task container
│   │   │   ├── TaskItem.js     # Individual task
│   │   │   ├── TaskForm.js     # Task creation form
│   │   │   ├── TaskStats.js    # Statistics dashboard
│   │   │   └── TaskFilters.js  # Filter & sort controls
│   │   ├── 📁 services/        # API service layer
│   │   └── App.js              # Main application
│   ├── Dockerfile              # Frontend container config
│   └── package.json            # Dependencies
├── 📁 backend/                  # Express Backend
│   ├── 📁 models/              # Database models
│   │   └── Task.js             # Task schema
│   ├── 📁 routes/              # API endpoints
│   │   └── taskRoutes.js       # CRUD operations
│   ├── server.js               # Express server
│   ├── Dockerfile              # Backend container config
│   └── package.json            # Dependencies
├── docker-compose.yml          # Multi-container setup
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/tasks` | Get all tasks | - |
| `POST` | `/api/tasks` | Create new task | `{description, category, priority, dueDate}` |
| `PUT` | `/api/tasks/:id` | Update task | `{description?, completed?, category?, priority?, dueDate?}` |
| `DELETE` | `/api/tasks/:id` | Delete task | - |

### Example API Usage

```javascript
// Create a new task
POST /api/tasks
{
  "description": "Complete project documentation",
  "category": "work",
  "priority": "high",
  "dueDate": "2024-12-31"
}

// Update task status
PUT /api/tasks/507f1f77bcf86cd799439011
{
  "completed": true
}
```

## Development

To run in development mode with hot reload:

1. Install dependencies locally in both frontend and backend directories:
```bash
cd frontend && npm install
cd ../backend && npm install
```

2. Start the containers:
```bash
docker-compose up
```

Changes to the code will automatically reload the application.

## 🔧 Development

### Local Development Setup

1. **Install dependencies locally** (optional, for IDE support):
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Start development environment**:
   ```bash
   docker-compose up
   ```

3. **View logs**:
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f frontend
   docker-compose logs -f backend
   ```

### Making Changes

- **Frontend**: Changes auto-reload via React's development server
- **Backend**: Changes require container restart
- **Database**: Data persists in Docker volumes

## 🐛 Troubleshooting

<details>
<summary><strong>Port Already in Use</strong></summary>

If you get port conflicts:
```bash
# Stop all containers
docker-compose down

# Check what's using the ports
netstat -ano | findstr :3001
netstat -ano | findstr :5000

# Kill the process or change ports in docker-compose.yml
```
</details>

<details>
<summary><strong>Containers Won't Start</strong></summary>

```bash
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```
</details>

<details>
<summary><strong>Database Connection Issues</strong></summary>

```bash
# Check MongoDB logs
docker-compose logs database

# Verify network connectivity
docker-compose exec backend ping database
```
</details>

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Node.js 18** - JavaScript runtime
- **Express.js 4** - Web application framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Database & DevOps
- **MongoDB 6** - NoSQL document database
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration

## 📸 Screenshots

### Main Dashboard
![Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Dashboard+Screenshot)

### Task Management
![Task Management](https://via.placeholder.com/800x400/764ba2/ffffff?text=Task+Management+Screenshot)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using the MERN stack
- Docker for seamless containerization
- MongoDB for flexible data storage
- React for the interactive UI

## 📞 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your.email@example.com

Project Link: [https://github.com/kefimoetaz/todolist](https://github.com/kefimoetaz/todolist)

---

⭐ **Star this repo if you found it helpful!** ⭐