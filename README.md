# Assignment - Next.js App

This is a Next.js application built using TypeScript (TSX), Tailwind CSS, and the App Router, designed to manage and store user data in the session. This app provides a smooth user experience by preserving form data even when the page is refreshed or when navigating between forms.

## Features

- **Session Storage**: User data is stored in the session, ensuring data persistence across page refreshes and between form navigation (previous/next).
- **Tailwind CSS**: The app uses Tailwind CSS for responsive and flexible styling.
- **Dynamic Form Elements**: The app supports dynamic field rendering, where form fields can be added or removed based on user interaction.
- **Conditional Visibility**: Form elements can be conditionally displayed based on the user's inputs or selections.
- **User Registration**: The app includes features for backend integration, such as user registration (currently set up for future API integration).
- **Responsive Layout**: The app layout adjusts seamlessly for different screen sizes, ensuring accessibility across all devices.

## Technologies Used

- **Next.js**: React-based framework for building the app, with routing and server-side rendering (SSR) support.
- **React**: JavaScript library for building user interfaces, using components and hooks.
- **TypeScript**: TypeScript for type safety and enhanced development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling and building custom, responsive designs.
- **Framer Motion**: Animation library used to create smooth transitions and interactive animations in the UI.
- **Lucide Icons**: Icon library for modern, customizable icons.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/assignment.git
   cd assignment
   ```

2. **Install the required dependencies using npm or yarn:**
   npm install
   or
   yarn install

3. **Once the dependencies are installed, you can start the development server with:**
   npm run dev
   or
   yarn dev

The app will be available at http://localhost:3000

**Usage**

Session Storage: Form data is automatically saved in session storage after each form step. If you refresh the page or navigate between form steps, the data remains intact.

Form Navigation: Use the "Next" and "Previous" buttons to navigate between the form steps. The data is preserved on each step.

Form Validation: Form fields are validated using React Hook Form to ensure required fields are filled out correctly before submission.

Backend Integration: When the form is completed, data is sent to the backend API using Axios for storage in the database.


**Backend data***
http://localhost:3000/home
or at vecel https://form-validation-td5a.vercel.app/home
