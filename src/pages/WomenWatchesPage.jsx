import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, brands } from "@/data/products";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setBrand, setSortBy, resetFilters, selectFilters } from "@/store/slices/filterSlice";

const FilterContent = ({ filters, dispatch }) => (
    <div className="space-y-6 text-right">
        <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">الفئات</h3>
            <div className="space-y-2">
                <Button variant={filters.category === "all" ? "default" : "ghost"} className="w-full justify-start font-sans border-muted-foreground/20 hover:bg-secondary cursor-pointer" onClick={() => dispatch(setCategory("all"))}>
                    جميع الفئات
                </Button>
                {categories.map((cat) => (
                    <Button key={cat.id} variant={filters.category === cat.slug ? "default" : "ghost"} className="w-full justify-start font-sans border-muted-foreground/20 hover:bg-secondary cursor-pointer" onClick={() => dispatch(setCategory(cat.slug))}>
                        {cat.nameAr}
                    </Button>
                ))}
            </div>
        </div>

        <div>
            <h3 className="font-display text-lg font-semibold mb-4">العلامات التجارية</h3>
            <div className="space-y-2">
                <Button variant={filters.brand === "all" ? "default" : "ghost"} className="w-full justify-start font-sans border-muted-foreground/20 hover:bg-secondary cursor-pointer" onClick={() => dispatch(setBrand("all"))}>
                    جميع العلامات
                </Button>
                {brands.map((brand) => (
                    <Button key={brand.id} variant={filters.brand === brand.id ? "default" : "ghost"} className="w-full justify-start font-sans border-muted-foreground/20 hover:bg-secondary cursor-pointer" onClick={() => dispatch(setBrand(brand.id))}>
                        {brand.name}
                    </Button>
                ))}
            </div>
        </div>

        <Button variant="outline" className="cursor-pointer w-full border-muted-foreground/20 hover:bg-secondary transition-all" onClick={() => dispatch(resetFilters())}>
            <X className="ml-2 h-4 w-4" />
            إعادة تعيين الفلاتر
        </Button>
    </div>
);

const WomenWatchesPage = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const [localSearch, setLocalSearch] = useState("");

    const filteredProducts = useMemo(() => {
        let result = products.filter((p) => p.gender === "women");

        if (localSearch) {
            const query = localSearch.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(query) || p.nameAr.includes(query) || p.brand.toLowerCase().includes(query));
        }

        if (filters.category !== "all") {
            result = result.filter((p) => p.category === filters.category);
        }

        if (filters.brand !== "all") {
            result = result.filter((p) => p.brand.toLowerCase().replace(" ", "-") === filters.brand);
        }

        switch (filters.sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "name":
            default:
                result.sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));
        }

        return result;
    }, [filters, localSearch]);

    const womenProductsCount = products.filter((p) => p.gender === "women").length;

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <main className="min-h-screen pt-24 pb-16 bg-background">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="font-display text-4xl font-bold mb-2">ساعات نسائية</h1>
                    <p className="text-muted-foreground">اكتشفي تشكيلتنا الفاخرة من الساعات النسائية</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-8">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <Input
                            type="text"
                            placeholder="ابحثي عن ساعة..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            className="pr-12 bg-card border-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent text-primary">
                            <Search className="h-5 w-5" />
                        </Button>
                    </form>

                    <Select value={filters.sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
                        <SelectTrigger className="w-full sm:w-48 bg-card border-none shadow-sm">
                            <SelectValue placeholder="ترتيب حسب" />
                        </SelectTrigger>
                        <SelectContent className="w-[95%] sm:w-full">
                            <SelectItem value="name">الاسم</SelectItem>
                            <SelectItem value="price-asc">السعر: من الأقل</SelectItem>
                            <SelectItem value="price-desc">السعر: من الأعلى</SelectItem>
                            <SelectItem value="rating">التقييم</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Mobile Filter Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden border-primary/20">
                                <Filter className="ml-2 h-4 w-4 text-primary" />
                                الفلاتر
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-45 md:w-60 py-5 px-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            <SheetHeader className="text-right">
                                <SheetTitle className="font-display text-lg font-bold border-b pb-2 border-border">فلاتر البحث</SheetTitle>
                            </SheetHeader>
                            <div>
                                <FilterContent filters={filters} dispatch={dispatch} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </motion.div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar Filter */}
                    <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-28 bg-card rounded-xl p-6 shadow-card border border-border/50">
                            <h2 className="font-display text-xl font-bold mb-6 border-b pb-4 border-border">فلاتر البحث</h2>
                            <FilterContent filters={filters} dispatch={dispatch} />
                        </div>
                    </motion.aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <p className="text-muted-foreground mb-6 text-sm">
                            عرض <span className="text-foreground font-bold">{filteredProducts.length}</span> من <span className="text-foreground font-bold">{womenProductsCount}</span> منتج
                        </p>

                        {filteredProducts.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                                <p className="text-xl text-muted-foreground mb-6">لم نعثر على نتائج تطابق بحثك الحالي</p>
                                <Button className="btn-luxury cursor-pointer" onClick={() => dispatch(resetFilters())}>
                                    إعادة تعيين الفلاتر
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WomenWatchesPage;
