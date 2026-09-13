# Digital Technical Services Platform المعلم– Al-Muallim 

A web platform designed to **connect clients with skilled technicians and professionals** in an organized and accessible way. The platform helps clients find suitable technicians based on specialization and ratings, while providing an administrative dashboard for managing technicians, clients, and projects.

##  Project Overview

The idea behind this project is to make it easier for clients to find suitable technicians and professional services, while providing a more organized and reliable way to connect clients with skilled professionals.

Technicians can submit a request to join the platform, while clients can browse and search for technicians based on their specialization and view their information and ratings.

##  Main Features

###  Client

- Create an account and log in.
- Search for technicians.
- Filter technicians by specialization.
- View technician profiles and ratings.
- Submit reviews for technicians.

### Technician

- Submit a request to join the platform.
- Select a specialization and location.
- Provide contact and address information.
- Upload an ID or passport image.
- Add previous work portfolio images.
- Wait for administrator approval before becoming active.

### Administrator

- Log in to the admin dashboard.
- View and manage technicians.
- Approve or reject technician registration requests.
- Change technician status.
- Remove or manage technician accounts.
- View and manage clients.
- Manage projects and track their progress.
- View technician reviews.

## How It Works

Client
  ↓
Search for a suitable technician
  ↓
Select specialization and browse technicians
  ↓
View technician information and ratings

Technician
  ↓
Submit a registration request
  ↓
Admin reviews the request
  ↓
Request approved
  ↓
Technician becomes available on the platform


##  Technologies

### Front-End
- React.js,JavaScript,HTML5,CSS3,Tailwind CSS,React Router,Context,React Hook Form,Zod,Axios.

### Back-End
- Node.js,Express.js.

### Data
- JSON,Local Storage.

The project uses JSON data as the storage source for the system, accessed through the Express.js API.

##  Project Architecture

The project separates the front-end interface from the back-end server:

React Front-End
      ↓
Context / Actions
      ↓
Axios API
      ↓
Express.js
      ↓
JSON Data

React is responsible for the user interface and application state, while Express.js provides the API endpoints used to retrieve and modify system data.

## Getting Started

### 1. Install Front-End Dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

### 2. Install Back-End Dependencies

Navigate to the server directory and run:

```bash
npm install
```

Then start the server:

```bash
node server.js
```

The API runs locally on:

```text
http://localhost:5000
```

> **Note:** The Back-End server must be running for features that depend on the API to work correctly.
🔗 **Live Demo:** [View Live Demo](https://al-mualim-frontend.onrender.com)


## Contact

The project is open to future improvements, enhancements, and additional features.

For inquiries about the project or to discuss **possible improvements and future development**, feel free to contact me:

- 📧 **Email:** [view email](daniaibesh51@gmail.com)

Feedback and suggestions regarding the project and user experience are welcome.
