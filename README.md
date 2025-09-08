# XoolHub - Multi-School Information Management System

A comprehensive School Information Management System (SIMS) designed to streamline and digitize school administration processes for multiple educational institutions.

## 🎯 Overview

XoolHub is a modern, full-stack web application that provides a centralized platform for managing schools, students, staff, academic processes, and administrative tasks. It supports multiple schools on a single platform with role-based access control for different user types.

## ✨ Key Features

### 🏫 Multi-User Portal System
- **Administrator Portal**: Complete school management dashboard
- **Teacher Portal**: Class management, attendance, grading, and student interaction
- **Parent Portal**: Access to child's academic progress, fees, and communication
- **Bursar Portal**: Financial management, fee collection, and expense tracking
- **Super Admin Portal**: Multi-school oversight and system management
- **Head of Department (HOD) Portal**: Department-specific management
- **Head of Administration (HOA) Portal**: Administrative oversight

### 👨‍🎓 Student Management
- Student registration and profile management
- Academic history tracking
- Student promotion system
- Financial records and fee management
- Attendance tracking with Present/Absent/Late status
- Disciplinary record management with severity levels
- Academic performance monitoring

### 📚 Academic Management
- **Class Management**: Create and manage classes, subjects, terms, and academic years
- **Examination System**: JCE (Junior Certificate Examination) and MSCE (Malawi School Certificate of Education) management
- **Grading System**: Comprehensive grading and remarking system
- **Report Generation**: Academic reports, transcripts, and performance analytics
- **Subject Management**: Curriculum and subject assignment

### 💬 Communication & Engagement
- **Telegram Bot Integration**: 
  - Parent-teacher communication via Telegram
  - Attendance marking through Telegram
  - Real-time notifications and updates
- **WhatsApp Integration**: Notification system
- **Email System**: OTP verification and notifications
- **Event Management**: School events and announcements

### 💰 Financial Management
- Fee structure setup and management
- Payment tracking and processing
- Expense management
- Financial reporting and analytics
- Bursar dashboard for financial oversight

### 📊 Attendance & Disciplinary
- Daily attendance marking (Present/Absent/Late)
- Disciplinary record management with severity levels
- Parent notification system
- Follow-up tracking for disciplinary actions

### 🏢 Multi-School Architecture
- Support for multiple schools on a single platform
- School-specific configurations
- Subscription-based access control
- Super admin oversight of all schools

## 🛠 Technical Stack

### Backend
- **Node.js** with Express.js framework
- **MySQL** database with comprehensive schemas
- **JWT** authentication and session management
- **Telegram Bot API** integration
- **Email** services with OTP verification
- **File upload** capabilities

### Frontend
- **React 18** with modern hooks and features
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React PDF** for document generation
- **Chart.js/Recharts** for analytics
- **Responsive design** with mobile support

### Database Features
- Comprehensive table structure for all modules
- Foreign key relationships for data integrity
- Automatic table setup on application start
- Support for conversation management
- Attendance tracking with unique constraints
- Disciplinary records with severity levels

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Telegram Bot Token (optional)
- WhatsApp Business API (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/XoolHub.git
   cd XoolHub
   ```

2. **Install backend dependencies**
   ```bash
   cd api
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the `api` directory with the following variables:
   ```env
   # Database Configuration
   MYSQL_HOST=localhost
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=xoolhub

   # JWT Configuration
   JWT_SECRET=your_jwt_secret

   # Telegram Bot Tokens (optional)
   TELEGRAM_PARENT_BOT_TOKEN=your_parent_bot_token
   TELEGRAM_TEACHER_BOT_TOKEN=your_teacher_bot_token

   # Email Configuration
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_email_password

   # WhatsApp Configuration (optional)
   WHATSAPP_TOKEN=your_whatsapp_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   ```

5. **Start the application**
   ```bash
   # Start backend server
   cd api
   npm start

   # Start frontend (in a new terminal)
   cd client
   npm start
   ```

## 📱 Usage

### For Administrators
- Access the administrator dashboard at `/administrator`
- Manage teachers, students, classes, and subjects
- Generate reports and analytics
- Configure school settings and academic terms

### For Teachers
- Access the teacher portal at `/tdashboard`
- Mark daily attendance
- Manage student grades and academic records
- Communicate with parents via Telegram

### For Parents
- Access the parent portal at `/parent/dashboard`
- View child's academic progress
- Check fee balances and payment history
- Communicate with teachers via Telegram

### For Bursars
- Access the bursar portal at `/bursar/dashboard`
- Manage fee collection and financial records
- Track expenses and generate financial reports

## 🔧 API Endpoints

The system provides comprehensive REST API endpoints for:
- User authentication and authorization
- Student management (CRUD operations)
- Academic management (classes, subjects, terms)
- Attendance tracking
- Financial management
- Report generation
- Communication features

## 📊 Database Schema

The system includes well-structured database tables for:
- User management and authentication
- Student and teacher profiles
- Academic records and examinations
- Attendance tracking
- Financial transactions
- Communication logs
- Disciplinary records

## 🌟 Unique Features

1. **Telegram Bot Integration**: Seamless parent-teacher communication
2. **Multi-School Support**: Single platform for multiple institutions
3. **Real-time Notifications**: Instant updates via WhatsApp and Telegram
4. **Comprehensive Reporting**: Detailed analytics with PDF generation
5. **Mobile-First Design**: Responsive interface for all devices
6. **Subscription Management**: Built-in billing system
7. **AI Integration**: Enhanced functionality with transformers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Emmanuel Nyangazi** - *Initial work*

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔮 Future Enhancements

- Mobile app development
- Advanced analytics and AI insights
- Integration with more messaging platforms
- Multi-language support
- Advanced reporting features
- Bulk operations and data import/export

---

**XoolHub** - Transforming education through technology 🚀
