# Parent-Teacher/Administrator Conversation & Attendance Features

This feature allows parents and guardians to request conversations with their student's class teacher or school administrator through Telegram bots, and enables teachers to mark daily attendance directly from the Telegram bot.

## Overview

The features consist of:
1. **Parent Bot** - Allows parents to request conversations and send messages, view attendance records
2. **Teacher/Administrator Bot** - Allows teachers and administrators to accept/reject requests, respond, and mark daily attendance
3. **Database Tables** - Stores conversation requests, conversations, messages, and attendance records

## Setup Instructions

### 1. Automatic Setup

The conversation feature is automatically set up when you start the application:

```bash
npm start
```

This will:
- Create the required database tables automatically (if they don't exist)
- Initialize both Telegram bots
- Start the server

The following tables are created automatically:
- `conversation_requests` - Stores conversation requests from parents
- `conversations` - Stores active conversations
- `conversation_messages` - Stores all messages in conversations
- `attendance` - Stores student attendance records

### 3. Environment Variables

Add the following environment variables to your `.env` file:

```env
# Parent Bot Token (existing)
TELEGRAM_PARENT_BOT_TOKEN=your_parent_bot_token_here

# Teacher/Administrator Bot Token (new)
TELEGRAM_TEACHER_BOT_TOKEN=your_teacher_bot_token_here

# Optional: Control bot auto-start
AUTO_START_TELEGRAM_PARENT_BOT=true
AUTO_START_TELEGRAM_TEACHER_BOT=true
```

### 2. Bot Setup

#### Parent Bot (Existing)
- The parent bot is already integrated into the system
- Parents can access it through the existing menu
- New conversation options have been added to the menu

#### Teacher/Administrator Bot (New)
- Create a new Telegram bot using @BotFather
- Get the bot token and add it to your environment variables
- The bot will automatically start when the server starts

## How It Works

### For Parents

1. **Login**: Parents log in using their phone number (existing functionality)
2. **Request Conversation**: 
   - Select "Talk to Teacher" to request conversation with class teacher
   - Select "Talk to Administrator" to request conversation with school administrator
3. **Send Initial Message**: Type the initial message for the request
4. **Wait for Response**: The system notifies when the request is accepted/rejected
5. **Conversation**: Once accepted, parents can send messages and receive responses
6. **Close**: Either party can close the conversation

### For Teachers/Administrators

1. **Login**: Teachers/administrators log in using their ID
2. **View Requests**: Check pending conversation requests
3. **Accept/Reject**: Choose to accept or reject each request
4. **Conversation**: Once accepted, can send and receive messages
5. **Close**: Can close conversations when finished
6. **Mark Attendance**: Teachers can mark daily attendance for their assigned classes

### For Attendance Management

1. **Select Class**: Choose from assigned classes
2. **View Students**: See list of students in the class
3. **Mark Status**: Mark each student as Present/Absent/Late
4. **Add Notes**: Optional notes for attendance records
5. **Finish**: Complete attendance marking with summary

## Database Schema

### conversation_requests
```sql
- id (Primary Key)
- parent_id (Telegram chat ID)
- recipient_id (Teacher/Admin ID)
- recipient_type (teacher/administrator)
- student_id
- school_id
- message (Initial message)
- status (pending/accepted/rejected/closed)
- created_at
- updated_at
```

### conversations
```sql
- id (Primary Key)
- request_id (Foreign Key to conversation_requests)
- parent_id (Telegram chat ID)
- recipient_id (Teacher/Admin ID)
- recipient_type (teacher/administrator)
- status (active/closed)
- created_at
- closed_at
```

### conversation_messages
```sql
- id (Primary Key)
- conversation_id (Foreign Key to conversations)
- sender_id (Telegram chat ID or user ID)
- sender_type (parent/teacher/administrator)
- message
- created_at
```

### attendance
```sql
- id (Primary Key)
- studentid (Foreign Key to students)
- date (Date of attendance)
- status (Present/Absent/Late)
- note (Optional notes)
- created_at
- updated_at
```

## API Endpoints

The feature is primarily handled through Telegram bots, but you can extend it with REST API endpoints if needed.

## Security Considerations

1. **Authentication**: Both bots require proper authentication
2. **Session Management**: Sessions expire after 7 days
3. **Message Validation**: Messages are validated before storage
4. **Access Control**: Users can only access conversations they're part of

## Troubleshooting

### Common Issues

1. **Bot Not Starting**
   - Check environment variables are set correctly
   - Verify bot tokens are valid
   - Check console logs for error messages

2. **Database Errors**
   - Ensure all tables are created
   - Check database connection
   - Verify foreign key relationships

3. **Messages Not Sending**
   - Check both bots are running
   - Verify user sessions are active
   - Check conversation status is 'active'

### Logs

Monitor these log prefixes for debugging:
- `[ParentBot]` - Parent bot operations
- `[TeacherBot]` - Teacher/Administrator bot operations

## Future Enhancements

Potential improvements:
1. **File Sharing**: Allow sending documents/images
2. **Message History**: Web interface to view conversation history
3. **Notifications**: Email/SMS notifications for urgent messages
4. **Auto-Responses**: Automated responses for common questions
5. **Conversation Analytics**: Track response times and satisfaction
6. **Attendance Reports**: Generate attendance reports and analytics
7. **Bulk Attendance**: Mark multiple students at once
8. **Attendance Alerts**: Notify parents of attendance issues

## Support

For technical support or questions about this feature, please refer to the main project documentation or contact the development team.
