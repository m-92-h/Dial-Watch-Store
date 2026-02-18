import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount, toggleCart } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import { selectThemeMode, toggleTheme, initTheme } from "@/store/slices/themeSlice";
import { setSearchQuery } from "@/store/slices/filterSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const location = useLocation();
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartItemsCount);
    const wishlistCount = useSelector(selectWishlistCount);
    const themeMode = useSelector(selectThemeMode);

    useEffect(() => {
        dispatch(initTheme());
    }, [dispatch]);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e) e.preventDefault();

        if (!searchValue.trim()) return;

        dispatch(setSearchQuery(searchValue));
        setIsSearchOpen(false);
        navigate("/products");
    };

    const navLinks = [
        { path: "/", label: "الرئيسية" },
        { path: "/products", label: "المنتجات" },
        { path: "/men-watches", label: "ساعات رجالية" },
        { path: "/women-watches", label: "ساعات نسائية" },
    ];

    return (
        <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 shadow-elevated  bg-background/80 backdrop-blur-md`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center">
                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-45 p-2">
                                <nav className="flex flex-col gap-6 mt-12">
                                    {/* Search */}
                                    <motion.div initial={false} animate={{ width: "100%" }} className="relative w-full max-w-md" dir="rtl">
                                        <form onSubmit={handleSearch} className="relative flex items-center w-full group">
                                            <div className="relative grow">
                                                <Search className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/70 pointer-events-none z-10" />

                                                <Input
                                                    type="text"
                                                    placeholder="ابحث عن ساعة..."
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    className="w-full h-8 pr-6 pl-14 bg-secondary/30 border-gold/20 focus:border-gold/50 focus-visible:ring-1 focus-visible:ring-gold/30 transition-all placeholder:text-muted-foreground/60 text-xs shadow-inner"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                size="sm"
                                                className="absolute left-1 top-1 bottom-1 px-2 h-6 bg-gold hover:bg-gold/90 text-black text-xs font-bold rounded-md shadow-md transition-transform active:scale-95"
                                            >
                                                بحث
                                            </Button>
                                        </form>
                                    </motion.div>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`text-sm font-medium transition-colors ${location.pathname === link.path ? "text-primary" : "text-accent-foreground"}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} className="font-display text-3xl font-bold text-gold-gradient">
                                ميناء
                            </motion.div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative font-medium transition-colors luxury-underline ${location.pathname === link.path ? "text-primary" : "text-accent-foreground"}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <motion.div initial={false} animate={{ width: isSearchOpen ? 200 : 40 }} className="relative hidden md:flex">
                            {isSearchOpen ? (
                                <form onSubmit={handleSearch} className="w-full">
                                    <div className="relative w-full">
                                        <Input
                                            type="text"
                                            placeholder="ابحث عن ساعة..."
                                            autoFocus
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            onBlur={() => !searchValue && setIsSearchOpen(false)}
                                            className="pr-10 bg-secondary/50 border-border focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 shadow-none"
                                        />
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold pointer-events-none" />
                                    </div>
                                    <Button type="submit" variant="default" size="icon" className="absolute left-1 top-1 bottom-1 px-2 h-7 bg-gold hover:bg-gold/90 text-black text-xs font-bold rounded-md shadow-md transition-transform active:scale-95 cursor-pointer">
                                        بحث
                                    </Button>
                                </form>
                            ) : (
                                <Button
                                    variant="classic"
                                    size="icon"
                                    onClick={() => setIsSearchOpen(true)}
                                    className={`shadow-sm hover:shadow-gold hover:text-primary text-accent-foreground cursor-pointer`}
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            )}
                        </motion.div>

                        {/* Theme Toggle */}
                        <Button
                            variant="classic"
                            size="icon"
                            onClick={() => dispatch(toggleTheme())}
                            className={`shadow-sm ${themeMode === "dark" ? "hover:shadow-accent-foreground/50 hover:text-primary" : "hover:shadow-accent-foreground/50"} text-accent-foreground cursor-pointer`}
                        >
                            {themeMode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        {/* Wishlist */}
                        <Link to="/wishlist">
                            <Button variant="classic" size="icon" className={`relative shadow-sm hover:shadow-destructive/50 hover:text-destructive text-accent-foreground cursor-pointer`}>
                                <Heart className="h-5 w-5" />
                                {wishlistCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                    >
                                        {wishlistCount}
                                    </motion.span>
                                )}
                            </Button>
                        </Link>

                        {/* Cart */}
                        <Button
                            variant="classic"
                            size="icon"
                            className={`relative shadow-sm hover:shadow-blue-300 hover:text-blue-600 text-accent-foreground cursor-pointer`}
                            onClick={() => dispatch(toggleCart())}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
