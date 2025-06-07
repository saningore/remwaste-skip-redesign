# Skip Selection Page - React + Vite

A modern, responsive skip selection page built with React, Vite, and Tailwind CSS. This application allows users to browse and select different skip sizes for waste management services.

## Features

- Modern card list view for skip options
- Responsive design that works on all device sizes
- Interactive skip selection with detailed modal
- Real-time API integration with fallback mock data
- Price calculation with VAT breakdown
- Filtering of skips based on features (road placement, heavy waste)

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd skip-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Access the application**

   Open your browser and navigate to: [http://localhost:5173](http://localhost:5173)

## Project Structure

```
skip-test/
├── src/
│   ├── App.jsx        # Main application component
│   ├── App.css        # Application styles
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── postcss.config.cjs # PostCSS configuration
├── tailwind.config.cjs # Tailwind CSS configuration
└── package.json       # Project dependencies
```

## API Integration

The application fetches skip data from the following API endpoint:

```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}
```

If the API is unavailable, the application falls back to mock data to ensure a seamless user experience.

## Redesign Approach

### 1. Problem Analysis

The original skip selection page used a grid layout which made it difficult for users to compare options efficiently. The redesign aimed to solve several issues:

- Limited visibility of skip features
- Difficulty comparing options side-by-side
- Insufficient information about skip capabilities
- Lack of visual hierarchy for important details

### 2. Card List View Implementation

The redesign replaced the grid layout with a card list view that offers several advantages:

- **Horizontal Layout**: Each skip card spans the full width of the container, displaying all relevant information in a single row for easy scanning
- **Visual Hierarchy**: Clear organization with skip image on the left, details in the center, and pricing/action button on the right
- **Feature Highlighting**: Added checkmark icons for key benefits to make them stand out
- **Responsive Design**: Cards stack vertically on smaller screens while maintaining readability

### 3. Interactive Modal

Added a detailed modal that appears when a skip is selected, providing:

- Comprehensive skip information
- Price breakdown including VAT calculation
- Clearer call-to-action for proceeding with the selection

### 4. Technical Improvements

- **API Integration**: Properly handled the API response format with appropriate error handling
- **Type Safety**: Added proper type conversion to prevent runtime errors
- **Image Optimization**: Implemented proper image sizing and loading
- **Tailwind Configuration**: Configured Tailwind CSS for optimal styling

### 5. User Experience Enhancements

- **Hover Effects**: Added subtle hover animations to indicate interactivity
- **Conditional Features**: Dynamically displayed skip features based on API data
- **Clear Pricing**: Made pricing information more prominent
- **Accessibility**: Improved color contrast and interactive elements

## Future Enhancements

- Add filtering options for skip sizes and features
- Implement a complete booking flow with address collection and payment
- Add user authentication for returning customers
- Integrate with a backend system for order management

## Technologies Used

- React 19.1.0
- Vite
- Tailwind CSS
- Axios for API requests
- Lucide React for icons
