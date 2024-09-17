### E-Commerce Product 
# Introduction
Welcome to the E-Commerce Product Listing and Detail Page project! This application is designed to showcase products from an e-commerce API, providing users with a seamless experience to browse, view details, and navigate through various products. It includes functionalities such as pagination, product detail view, and error handling to ensure a robust and user-friendly application.

# Technologies Used
**Next.js:** A React framework for server-side rendering and generating static websites.
**React:** A JavaScript library for building user interfaces.
**Tailwind CSS:** A utility-first CSS framework for designing custom UI.
**JavaScript:** Used in various parts of the application for client-side scripting.

# Setup Instructions
# *Prerequisites*
 >Node.js (v14 or later)
 >npm (v6 or later) or yarn

# Installation
[1]Clone the Repository
git clone https://github.com/ChristopherTsh/CHRTSH528_jse2407_GroupA_Christopher-Tshoma_FSJ01.git
cd CHRTSH528_jse2407_GroupA_Christopher-Tshoma_FSJ01

## Install Dependencies

[2]Install Dependencies
npm install
# or
yarn install

[3]Set Up Environment Variables

Create a .env.local file in the root directory and add any necessary environment variables (if applicable). For this project, there are no specific environment variables required.

[4]Run the Development Server


npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to view the application.

## Project Structure
The project is structured as follows:

>/components: Contains reusable UI components like **ProductGrid**, **ProductCard**, **Footer**, and **Pagination**.
>/pages: Contains the main pages of the application, including **index.js** for the homepage and [id].js for the product detail page.
>/public: Stores static assets such as images and fonts.
>/styles: Contains global CSS files.
>/utils: Includes utility functions and constants.


## Features
**Product Listing:** Displays a grid of 20 products per page with pagination controls.
**Product Detail View:** Allows users to view detailed information about a product, including images, title, price, and category.
**Pagination:** Supports navigating between pages to view more products.
**Error Handling:** Displays user-friendly error messages if data fetching fails.
**Loading State:** Shows a loading spinner while data is being fetched.
**Product Image Gallery:** Allows users to preview multiple images of a product with navigation controls.

## Usage
# Home Page
The homepage (index.js) displays a grid of products fetched from the API. Users can navigate between pages using the pagination controls.

# Product Detail Page
The product detail page ([id].js) shows detailed information about a selected product. Users can view images, price, category, and navigate back to the product grid.

# Pagination Controls
Pagination controls allow users to navigate through different pages of products. The current page is tracked and updated dynamically.

# Error Handling
If there is an error fetching products, a user-friendly error message is displayed. The application also handles cases where no products are found.

## Components
**ProductCard:** Displays individual product information, including an image, title, price, and action buttons.
**ProductGrid:** Renders a grid of **ProductCard** components and handles pagination.
**ProductImageGallery:** Manages image display and navigation for products with multiple images.
**Navbar:** Displays navigation links and provides a consistent header across pages.
**Footer:** Provides footer content with links to terms of service, privacy policy, and contact information.
**Pagination:** Manages pagination controls for navigating between product pages.
**Loader:** Shows a loading spinner while data is being fetched.
**Custom404:** Displays a friendly error message when an error occurs.


## **Contact**
For any questions or feedback, please contact christophertshoma0045@gmail.com.

