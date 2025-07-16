# Quizlyzer 🧠✨  
*AI-Powered Text Summarizer & Quiz Generator*

Quizlyzer is a full-stack web application designed to help students, teachers, and knowledge-seekers convert long pieces of text into summarized versions or quiz-style questions. With a focus on making learning efficient and interactive, Quizlyzer merges artificial intelligence with educational simplicity.

---

## 🚀 Features
- ✍ Summarize any text using advanced NLP models (Hugging Face's BART).
- 🧪 Generate quiz questions using a local T5-based model.
- 💾 Save your generated summaries and quizzes.
- 🗃 View saved items, filter by type or date.
- 🌓 Dark/light theme toggle.
- 👤 Secure user authentication (Sign up / Login).
- 🔔 Real-time feedback and error handling.

---

## 🛠 Built With
- *Frontend:* React.js  
- *Backend:* Node.js, Express.js  
- *Database:* MongoDB (via Mongoose)  
- *AI Models:* Hugging Face Inference API (BART), Valhalla T5 (local script)  
- *Authentication:* JWT  
- *Styling:* CSS3  
- *Hosting:* Vercel (frontend), Render/Heroku (backend)

---

## 📸 Screenshots

<img width="1848" height="818" alt="image" src="https://github.com/user-attachments/assets/06b21691-8ba8-4ad9-b8b0-f349874c775c" />


<img width="1897" height="825" alt="Screenshot 2025-07-16 163848" src="https://github.com/user-attachments/assets/cd5e2090-be7e-4e67-8fd5-e84c71947e9a" />

<img width="1903" height="806" alt="image" src="https://github.com/user-attachments/assets/13a42e70-de6b-4506-a99a-4e0cf97f8173" />

<img width="955" height="410" alt="image" src="https://github.com/user-attachments/assets/1d0a2322-c6a0-40f5-a976-6f3461ae9443" />

---

## ⚙ Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Herculesumer70/quizlyzer.git
cd quizlyzer

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Run locally
# Terminal 1 (backend):
cd ../server
node index.js

# Terminal 2 (frontend):
cd ../client
npm start


