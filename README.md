📦 **Stock & Order Management System **
This repository contains the frontend of the Stock & Order Management System, built using React and Material UI. The application provides a user-friendly interface to manage stocks and customer orders while maintaining data consistency with the backend API.

A full-stack web application to manage product stocks and customer orders, built using React and ASP.NET Core Web API. The system focuses on clean API design, proper state management, and real-world UI interactions.

🚀 Project Overview The Stock & Order Management System allows users to: Manage available stocks Create and delete customer orders Maintain stock availability based on orders Ensure data consistency between Stocks and Orders views This project was developed to gain hands-on experience with frontend–backend integration, async state handling, and practical debugging scenarios.

✨ Features 📦 Stock Management Add new stocks with quantity validation Prevent duplicate stock names Delete stocks only if no active orders exist Sort stocks alphabetically Real-time stock updates

🧾 Order Management Create orders using available stock dropdown Validate stock quantity before placing orders Delete orders with confirmation dialog Automatically refresh stock data when needed

🎨 UI & UX Tab-based navigation (Stocks / Orders) Confirmation dialogs for delete actions Error handling for API failures Clean and responsive UI using Material UI

🛠️ Tech Stack Frontend React Material UI Axios JavaScript (ES6+) Backend ASP.NET Core Web API Entity Framework Core SQL Server RESTful APIs

🧱 Architecture & Design Separated Frontend & Backend repositories for clean architecture Used DTOs to ensure proper API contracts and validation Centralized API calls using Axios services Backend-driven validation instead of frontend hacks Refetched data to avoid stale UI state between tabs

🧠 Challenges Faced & Solutions

API Validation Errors (400 Bad Request) Problem: Backend DTO contained unrelated required fields Solution: Redesigned DTOs to match endpoint responsibility

Confirmation Dialog Not Closing Problem: Async state updates caused dialog to remain open Solution: Properly reset selected entity and dialog state after delete operations

Stale Stock Data Between Tabs Problem: Stocks were fetched only once on app load Solution: Refetched stocks when navigating back to the Stocks page

Empty Dropdown in Orders Page Problem: Shared stock state was mutated after order operations Solution: Refetched stocks before opening the Add Order modal

📚 What I Learned Practical React state management across multiple views Designing clean and maintainable APIs using ASP.NET Core Handling async UI behavior with confirmation dialogs Debugging real-world frontend and backend integration issues Writing scalable and readable code

▶️ How to Run Locally Backend (API) Open the backend project Update the connection string in appsettings.json Run the API using Visual Studio or dotnet run

Frontend (UI) npm install npm run dev

The application will run at: http://localhost:5173

📌 Future Enhancements Authentication & authorization Pagination and search Role-based access Improved error notifications
=======
# stock-order-management
This repository contains the frontend of the Stock &amp; Order Management System, built using React and Material UI. The application provides a user-friendly interface to manage stocks and customer orders while maintaining data consistency with the backend API.
>>>>>>> 205605312a7060ceff00160007ea86eab1260e68
