# Schedify
Schedify is an intuitive web-based platform designed to streamline the scheduling of events, meetings, and bookings. With Schedify, users can easily manage their time, coordinate with others, and ensure seamless planning for personal and professional engagements.


## Demo
[![Watch the video in Youtube](SchedifyDemo.png)](https://www.youtube.com/watch?v=Tid3EElHr9I)

[SchedifyDemo.webm](https://github.com/user-attachments/assets/37e2269c-e782-402e-8dcf-bcc0ad69c0e3)


## Features

### 1. Event Scheduling
- Create, edit, and manage events effortlessly.
- Set event details such as title, description, date, time, and description.
- Invite participants via email or shareable links.

### 2. Meeting Coordination
- Schedule one-on-one meetings.
- Automatically detect time zone differences for participants.
- Integration with popular calendar systems like Google Calendar.

### 3. Booking Management
- Create custom booking pages for services or resources.
- Define time slots, availability, and time gap.
- Automated confirmations and reminders for both providers and users.

### 4. User Authentication
- Secure login and user management using Clerk.
- Role-based access control to manage permissions.

### 5. Notifications
- Get email or in-app notifications for upcoming events, meeting requests, and booking updates.
- Integration with third-party notification services for advanced alerts.



## Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk

### Backend
- **Language**: JavaScript
- **Database**: PostgreSQL


### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/schedify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd schedify
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and follow the .env.local.sample:


### Running the Project
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

