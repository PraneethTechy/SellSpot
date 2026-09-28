import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchResults from "./pages/SearchResults";
import CategoryProducts from "./components/CategoryCard/CategoryProducts";

function App() {
  return (
    
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoute />}>

          <Route
            path="/search"
            element={<SearchResults />}
          />

          <Route
            path="/category/:category"
            element={<CategoryProducts />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/add-product"
            element={<AddProduct />}
          />

          <Route
            path="/edit-product/:id"
            element={<AddProduct />}
          />

          <Route
            path="/dashboard/*"
            element={<Dashboard />}
          />

        </Route>

      </Routes>
   
  );
}

export default App;