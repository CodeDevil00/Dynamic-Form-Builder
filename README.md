# 🧾 Dynamic Form Generator (React + TailwindCSS)

This project is a **dynamic form generator** built with **React** and **TailwindCSS**. It allows students to log in with their roll number and name, then dynamically loads a form tailored to that roll number.

### ✨ Features

- 🔐 **Student Login** – Enter your roll number and name to proceed.
- 📄 **Dynamic Multi-Section Forms** – Fields and sections are fetched based on student identity.
- ✅ **Real-Time Validation** – Supports required fields, min/max length, email format, and age checks.
- 💾 **Form Submission** – Data is logged and form resets after submission with a thank-you screen.
- 🌈 **Responsive & Polished UI** – Styled with TailwindCSS for a clean and modern interface.

---

### 📁 Folder Structure

```
src/
│
├── components/
│   ├── Login.jsx           # Login screen
│   ├── DynamicForm.jsx     # Form container with validation
│   └── FormField.jsx       # Render individual fields
│
├── api/
│   └── api.js              # Axios logic to hit backend
│
├── App.jsx                 # Root component
├── main.jsx                # ReactDOM entry
└── index.css               # TailwindCSS import
```

---

### 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/CodeDevil00/Dynamic-Form-Builder.git
cd Dynamic-Form-Builder
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

---

### 🌐 Backend API

The frontend connects to the API hosted at:

```
https://dynamic-form-generator-9rl7.onrender.com
```

Endpoints used:

- `POST /create-user` – Create user with roll number and name
- `GET /get-form?rollNumber=` – Fetch form based on roll number

---

### 📦 Built With

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

---

