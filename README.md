# 💬 IntelliChat
### AI-Powered Smart Messaging

IntelliChat is a real-time chat application that uses AI to intelligently generate contextual responses based on your conversation. Never struggle with typing the perfect reply — let AI understand your chat context and suggest responses you can review and send with one click.

---

## 📸 Screenshots

<img src="public/screenshots/intellichat-chat.webp" width="800" />
<img src="public/screenshots/intellichat-ai-response.webp" width="800" />

---

🔗 **[Live Demo](https://intellichat-frontend-d8rz.onrender.com/login)**

---

## Overview

IntelliChat combines traditional real-time messaging with AI-powered response generation. Chat naturally with other users, and when you need help crafting the perfect reply, click the **IntelliChat** button to generate a contextual response based on your entire conversation history.

**What makes it special:**
- Real-time chat with multiple users
- AI analyzes conversation context
- Smart response suggestions
- Review and approve before sending
- Saves time while maintaining natural conversation flow

---

## ✨ Features

### 💬 **Real-Time Messaging**
- Instant message delivery
- Multiple user support
- Live conversation updates
- Clean, intuitive chat interface

### 🤖 **AI Response Generation**
- Click "IntelliChat" button during any conversation
- AI reads entire chat history for context
- Generates appropriate, contextual responses
- Understands conversation tone and flow

### 📝 **Smart Review Modal**
- AI-generated response appears in modal
- Review suggested message before sending
- Edit if needed or send as-is
- Approve with one click
- Maintain control over your messages

### ⚡ **Seamless Experience**
- No typing required for quick responses
- AI understands conversation context
- Natural, human-like suggestions
- Fast response generation
- Smooth modal interactions

### 🎯 **Conversation Awareness**
- AI analyzes full chat history
- Context-aware suggestions
- Maintains conversation continuity
- Adapts to different chat tones

---

## 🖥️ How It Works

1. **Start chatting** with another user normally
2. **Click "IntelliChat"** button when you want AI help
3. **AI analyzes** your entire conversation history
4. **Review** the generated response in the modal
5. **Approve & send** or edit before sending

**Example:**

```
User A: "Hey, do you still need a quote on the computer repair?"
User B: [clicks IntelliChat]

AI generates: "Yes, the screen is still not working and maybe need a new one. How much do you charge?"

User B: [reviews, approves, sends]
```

---

## 🛠️ Tech Stack

**Frontend**
- React
- Context API (state management)
- Socket.IO Client (real-time)
- Modern UI components
- Custom CSS styling

**Backend**
- Node.js
- Express.js
- Socket.IO (WebSocket real-time messaging)
- MongoDB (message storage)
- JWT Authentication
- AI API integration

**Database**
- MongoDB
- User authentication storage
- Message history
- Conversation context

**Authentication**
- JWT (JSON Web Tokens)
- Secure user sessions
- Protected routes

**AI Integration**
- Context-aware response generation
- Conversation history analysis
- Natural language processing

**Deployment**
- Vercel (frontend & backend)
- MongoDB Atlas (database)
- Real-time WebSocket connections

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- AI API key (OpenAI, Anthropic, or Google)
- JWT secret for authentication

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ryoshi1001/IntelliChat.git
   cd IntelliChat
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**
   
   Create `.env` in server folder:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   AI_API_KEY=your_ai_api_key_here
   PORT=5000
   ```

   Create `.env.local` in frontend folder:
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

5. **Run the backend:**
   ```bash
   cd server
   npm run dev
   ```

6. **Run the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser:**
   ```
   http://localhost:3000
   ```

---

## 🎯 Key Features Breakdown

| Feature | Description |
|---------|-------------|
| 💬 Real-Time Chat | Instant messaging between users |
| 🤖 AI Response | Context-aware message generation |
| 📝 Review Modal | Approve before sending |
| ⚡ Fast Generation | Quick AI response times |
| 🎯 Context-Aware | Understands full conversation |
| ✏️ Editable | Modify AI suggestions |
| 🔄 Live Updates | Real-time message delivery |

---

## 🧠 How AI Understands Context

IntelliChat's AI analyzes:
- **Full conversation history** — All previous messages
- **Conversation tone** — Formal, casual, friendly
- **Question context** — What was asked
- **Your typical responses** — Your messaging style
- **Recent topics** — What you've been discussing

This ensures generated responses feel natural and fit seamlessly into your conversation.

---

## 📦 Deployment

**Backend (Server):**
1. Push to GitHub
2. Deploy to Vercel, Railway, or Render
3. Add environment variables:
   - `MONGODB_URI` (MongoDB Atlas)
   - `JWT_SECRET`
   - `AI_API_KEY`
4. Configure Socket.IO CORS

**Frontend:**
1. Push to GitHub
2. Deploy to Vercel or Netlify
3. Add environment variables:
   - `REACT_APP_API_URL`
   - `REACT_APP_SOCKET_URL`
4. Configure WebSocket connection

**Database:**
- Use MongoDB Atlas for production
- Set up connection string
- Configure network access

---

## 🌟 Use Cases

**Perfect for:**
- Quick responses when busy
- Professional conversations requiring thoughtful replies
- When you're not sure how to phrase something
- Maintaining conversation flow during multitasking
- Learning better communication patterns
- Time-sensitive chats where typing is slow

**Great for:**
- Customer support responses
- Professional networking
- Casual friend conversations
- Learning new languages
- Maintaining consistent tone

---

## 🎓 What I Learned

**1. Real-time communication with Socket.IO**  
Managing WebSocket connections, handling disconnections, broadcasting messages, and ensuring message delivery in real-time applications.

**2. Context API for state management**  
Using React's Context API to manage global state across components, especially for user authentication and chat data.

**3. JWT authentication flow**  
Implementing secure user authentication with JSON Web Tokens, protecting routes, and managing user sessions.

**4. MongoDB data modeling**  
Designing schemas for users, messages, and conversations. Understanding document relationships and querying patterns.

**5. AI context integration**  
Providing conversation history to AI models for context-aware responses. Balancing context length with API costs.

**6. Express.js backend architecture**  
Building RESTful APIs, middleware chains, error handling, and integrating Socket.IO with Express.

---

## 📄 License

MIT — Free to use and modify.

---

## 🤝 Contact

Built by Me from tutorial from GreatStack then added the intellichat feature and different UI. 

**Kind of you for checking out IntelliChat!💬✨**
