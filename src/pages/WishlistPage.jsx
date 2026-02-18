import { motion } from "motion/react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { selectWishlistItems, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/utils/formatPrice";
import { toast } from "sonner";

const WishlistPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectWishlistItems);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success("تمت الإضافة إلى السلة", {
            description: product.nameAr,
        });
    };

    const handleRemove = (id, productName) => {
        dispatch(removeFromWishlist(id));

        toast.error("تمت الإزالة من المفضلة", {
            description: productName,
        });
    };

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="font-display text-4xl font-bold mb-2">قائمة الأمنيات</h1>
                    <p className="text-muted-foreground">{items.length > 0 ? `لديك ${items.length} منتج في قائمة الأمنيات` : "قائمة الأمنيات فارغة"}</p>
                </motion.div>

                {items.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                        <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                        <h2 className="font-display text-2xl font-bold mb-4">قائمة الأمنيات فارغة</h2>
                        <p className="text-muted-foreground mb-8">أضف منتجاتك المفضلة هنا لتتمكن من مراجعتها لاحقاً</p>
                        <Link to="/products">
                            <Button className="btn-luxury">تصفح المنتجات</Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col sm:flex-row gap-6 bg-card rounded-lg p-6"
                            >
                                <Link to={`/product/${item.id}`} className="sm:w-40 shrink-0">
                                    <img src={item.image} alt={item.nameAr} className="w-full aspect-square object-cover rounded-lg" />
                                </Link>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">{item.brand}</p>
                                        <Link to={`/product/${item.id}`}>
                                            <h3 className="font-display text-xl font-semibold hover:text-primary transition-colors">{item.nameAr}</h3>
                                        </Link>
                                        <p className="text-muted-foreground mt-2 line-clamp-2">{item.descriptionAr}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                                        <span className="font-display text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
                                        <div className="flex gap-3">
                                            <Button className="btn-luxury cursor-pointer" onClick={() => handleAddToCart(item)} disabled={!item.inStock}>
                                                <ShoppingBag className="ml-2 h-4 w-4" />
                                                {item.inStock ? "أضف للسلة" : "نفذت الكمية"}
                                            </Button>
                                            <Button variant="outline" className="text-destructive hover:text-destructive cursor-pointer" onClick={() => handleRemove(item.id, item.nameAr)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default WishlistPage;
