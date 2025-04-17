import React from "react";
import Collection from "../components/collection/Collection";
import BooksCategory from "../components/category/BooksCategory";
import HeroSlider from "../components/heroSlider/HeroSlider";
import ElectronicsCategory from "../components/category/ElectronicsCategory";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <Collection />
      <ElectronicsCategory />
      <BooksCategory />
    </div>
  );
};

export default Home;

// Lazy loading and Suspense
// import React, { useContext, Suspense, lazy } from "react";
// import { AuthContext } from "../context/AuthContext";

// const BooksCategory = lazy(() => import("../components/category/BooksCategory"));

// const Home = () => {
//   const { user, loading: authLoading } = useContext(AuthContext);

//   if (authLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-lg text-blue-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-4">Home</h1>
//       {user ? (
//         <p className="text-lg text-green-600">Welcome, {user.email}!</p>
//       ) : (
//         <p className="text-lg text-red-600">You are a guest</p>
//       )}
//       <Suspense fallback={<p className="text-lg text-blue-600">Loading Books...</p>}>
//         <BooksCategory />
//       </Suspense>
//       <Suspense fallback={<p className="text-lg text-blue-600">Loading Books...</p>}>
//         <BooksCategory />
//       </Suspense>
//       <Suspense fallback={<p className="text-lg text-blue-600">Loading Books...</p>}>
//         <BooksCategory />
//       </Suspense>
//       <Suspense fallback={<p className="text-lg text-blue-600">Loading Books...</p>}>
//         <BooksCategory />
//       </Suspense>
//     </div>
//   );
// };

// export default Home;
