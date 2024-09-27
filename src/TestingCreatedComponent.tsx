// import Button from "./components/user/Button"
// import Footer from "./components/user/Footer"
// import Navbar from "./components/user/Navbar"
// import Slider from "./components/user/Slider"

// function TestingCreatedComponent() {

//   const categoryOptions = [
//     { value: 'all', label: 'All Categories' },
//     { value: 'music', label: 'Music' },
//     { value: 'sports', label: 'Sports' },
//     { value: 'arts', label: 'Arts & Theater' },
//   ];

//   const dateOptions = [
//     { value: 'all', label: 'All Dates' },
//     { value: 'today', label: 'Today' },
//     { value: 'tomorrow', label: 'Tomorrow' },
//     { value: 'weekend', label: 'This Weekend' },
//   ];

//   const handleCategoryChange = (value: string) => {
//     console.log('Selected category:', value);
//   };

//   const handleDateChange = (value: string) => {
//     console.log('Selected date:', value);
//   };

//   return (
//     <>
//     <Navbar isFloating={true} />
//     <Slider />

//      <div className="h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600">Hello, Tailwind CSS!</h1>
//     </div>
//     <div className="space-y-4">
//     <Button variant="primary" rounded>Log In</Button>
//     <Button variant="secondary" rounded>View More</Button>
//     <Button variant="primary" fullWidth>Follow</Button>
//     <Button variant="secondary" fullWidth>View Profile</Button>
//     <Button variant="danger">Report</Button>
//   </div>
//   <div>
//   <Select
//         options={categoryOptions}
//         defaultValue="all"
//         onChange={handleCategoryChange}
//         variant="primary"
//       />
      
//       <Select
//         options={dateOptions}
//         defaultValue="all"
//         onChange={handleDateChange}
//         variant="outline"
//       />
      
//       <Select
//         options={categoryOptions}
//         defaultValue="all"
//         onChange={() => {}}
//         variant="disabled"
//       />
//   </div>
//   <Footer />
//     </>
//   )
// }

// export default TestingCreatedComponent
