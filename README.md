# 🧑‍💼 Agent Distribution App

A powerful and easy-to-use application to manage and distribute tasks to agents using CSV uploads. Built with ❤️ using **Next.js**, **Tailwind CSS**, **MongoDB**, **Node.js**, and **Express.js**.

🌐 **Live Demo**: [Click here to try it!](https://uzerqureshi-agentdistribution.netlify.app)

---
### Login Using 
```
email : uq0803@gmail.com
password : uq0803
```


### 📥 Upload CSV File

![image](https://github.com/user-attachments/assets/2df1acfb-2ba5-44e3-b63d-67aca72dd265)


## 📸 Screenshots With Results

![image](https://github.com/user-attachments/assets/8e109bd7-5aa4-47d3-a1fb-06dfa4793772)

![image](https://github.com/user-attachments/assets/60337e28-96e4-4b7b-bf1c-4d3fea12731b)

![image](https://github.com/user-attachments/assets/914b88bf-994a-4dd3-8b03-28a2e7c155dc)

![image](https://github.com/user-attachments/assets/26dc80a0-dda4-4d15-bd48-d9c99f1452f8)

![image](https://github.com/user-attachments/assets/eaa7355f-1d63-4ead-85bf-1f6e78ba1cd9)




> Replace these image paths with your actual file paths.

---

## 🚀 Features

- ✅ Admin login & dashboard
- 📁 Upload CSVs with agent entries
- 📊 Automatically distribute tasks among agents
- 🧠 Smart round-robin logic for fair distribution
- 🛡️ Validates uploaded CSV format

---

## 📂 CSV Upload Format

Your CSV file **must** contain these headers:


✅ Valid Example:

| FirstName | Phone      | Notes             |
|-----------|------------|-------------------|
| John      | 1234567890 | Follow-up Monday  |
| Alice     | 9876543210 | Confirmed lead    |

❌ Invalid headers or extra columns will be rejected!

---

## ⚙️ Tech Stack

- 🌐 Frontend: **Next.js**, **Tailwind CSS**
- 🔙 Backend: **Node.js**, **Express.js**
- 🛢️ Database: **MongoDB**
- 📦 CSV Parsing: `csv-parser` / `fast-csv` (whichever you're using)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/08Uzair/agentDistribution
cd agent-distribution-app
```
2. Install Dependencies
```
bash
 
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```
3. Environment Setup
Create a .env file in both backend and frontend directories with the following variables:
```
Backend .env:
env
 
PORT=5000
MONGO_URI=your_mongodb_connection_string
Frontend .env.local:
env
 
NEXT_PUBLIC_API_URL=http://localhost:5000
```
4. Run the App
Start Backend
```
bash
 
cd backend
npm run dev
Start Frontend
bash
 
cd ../frontend
npm run dev
🎉 Visit http://localhost:3000 to start using the app!
```
💡 How It Works
🟢 Admin logs in to the dashboard.

🟢 Only CSV file is Accepted

🟢 Upload a valid CSV file (with columns FirstName, Phone, Notes).

🟢 The app parses the CSV and distributes entries evenly among available agents.

🟢 Distribution is smart — for example:

    If there are 6 entries and 4 agents:

    Agent 1 gets 2 entries

    Agent 2 gets 2 entries

    Agent 3 & 4 get 1 entry each

    Each agent can then view their assigned entries on their dashboard.

## 🙋‍♂️ FAQ

**Q: What if the CSV has extra columns or wrong headers?**

A: The upload will be rejected with an error message. Only FirstName, Phone, and Notes are allowed.

**Q: Can I upload Excel files (.xlsx)?**

A: Currently, only CSV format is supported.

**Q: How many agents can I create?**

A: There's no hard limit. You can create as many agents as needed.

🤝 Contributing
Contributions are welcome! Please fork the repo and submit a pull request. Let’s make it better together. 🙌

## 🧑‍💻 Author

Made with ❤️ by Mohammad Uzer Qureshi

📧 Contact: uzerqureshi26@gmail.com

🌐 Portfolio: https://uzerqureshi-portfolio.netlify.app/
