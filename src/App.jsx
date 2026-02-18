import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// components layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// components cart
import CartSidebar from "@/components/cart/CartSidebar";

// pages
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/WishlistPage";
import MenWatchesPage from "./pages/MenWatchesPage";
import WomenWatchesPage from "./pages/WomenWatchesPage";
import NotFound from "./pages/NotFound";

const App = () => (
    <BrowserRouter>
        <Toaster />
        <div className="flex flex-col min-h-screen">
            <Header />
            <CartSidebar />
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/men-watches" element={<MenWatchesPage />} />
                    <Route path="/women-watches" element={<WomenWatchesPage />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    </BrowserRouter>
);

export default App;
