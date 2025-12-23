# Khaanpin – Frontend

A modern and responsive food delivery frontend built using React.  
This project focuses on clean UI, reusable components, and scalable structure.

---

## Tech Stack

- React (Vite)
- React Router DOM
- Redux Toolkit
- CSS (custom styling)
- Lazy loading for images

---

## Project Structure

src/
 assets/        -> Images, icons, static assets  
 components/    -> Reusable UI components  
pages/         -> Route-level pages  
store/         -> Redux store configuration  
App.jsx        -> Main layout component  
main.jsx       -> Application entry point  
index.css      -> Global styles  

---

## Features

- Responsive layout (desktop & mobile)
- Navbar with login/signup modal
- Scroll-based bottom bar & WhatsApp button
- Category-based menu filtering
- Reusable card components
- Clean and maintainable component structure
- Client-side routing with React Router

---

## Routes

/            -> HomePage  
/about       -> About  
/contact     -> Contact  
/cart        -> Cart  
/order       -> PlaceOrder  

---

## Key Components

- Header – Navigation bar and login trigger
- SignUpModal – Login/signup popup modal
- Hero – Featured food section
- Menu – Category selector
- DishCard / DishList – Food items display
- BottomBar – Floating search & cart bar
- Footer – Company info and links

---

## Installation & Setup

1. Clone the repository
   git clone https://github.com/Sujan7Neupane/khaanpin-restaurant.git

2. Install dependencies
   npm install

3. Start development server
   npm run dev

4. Open in browser
   http://localhost:5173

---

## Dependencies

The frontend uses the following core dependencies:

- react
  Core library for building user interfaces.

- react-dom 
  DOM-specific methods for React.

- react-router 
  Core routing utilities.

- react-router-dom
  Browser-based routing for React applications.

- @reduxjs/toolkit  
  Official, recommended way to write Redux logic.

- react-redux
  React bindings for Redux state management.

---

## Build for Production

npm run build

Build files will be generated in the dist folder.

---

## Design Principles

- Component-based architecture
- Separation of concerns
- Mobile-first responsive design
- Readable and documented code
- Scalable folder structure

---

## Future Enhancements

- Backend integration
- Authentication system
- Real cart functionality using Redux
- API-based menu data
- Dark mode support

---

## License

This project is created for learning and portfolio purposes.
