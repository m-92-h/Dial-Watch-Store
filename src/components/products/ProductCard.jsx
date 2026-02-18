import { motion } from "motion/react";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "@/store/slices/wishlistSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductCard = ({ product, index = 0 }) => {
    const dispatch = useDispatch();
    const isInWishlist = useSelector(selectIsInWishlist(product.id));

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product));

        toast.success("تمت الإضافة إلى السلة", {
            description: product.nameAr,
        });
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));

        if (isInWishlist) {
            toast.error("تمت الإزالة من المفضلة", {
                description: product.nameAr,
            });
        } else {
            toast.success("تمت الإضافة إلى المفضلة", {
                description: product.nameAr,
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="product-card group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300 relative flex flex-col h-full"
            dir="rtl"
        >
            {/* Image Container */}
            <div className="product-card-image relative aspect-square overflow-hidden bg-muted">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <motion.img src={product.image} alt={product.nameAr} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>

                {/* Sale Badge */}
                {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-lg text-xs font-bold z-10 pointer-events-none">
                        خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                )}

                {/* Wishlist Button - Always Accessible */}
                <Button
                    size="icon"
                    variant="secondary"
                    className={`absolute top-3 right-3 z-30 h-8 w-8 rounded-full shadow-sm ${isInWishlist ? "text-destructive" : ""} cursor-pointer`}
                    onClick={handleToggleWishlist}
                >
                    <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
                </Button>

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
                        <span className="bg-destructive text-destructive-foreground px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">نفذت الكمية</span>
                    </div>
                )}

                {/* Details Button */}
                <div
                    className="absolute bottom-2 inset-x-0 flex justify-center px-3 z-30 
                                lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0
                                transition-all duration-300 pointer-events-none"
                >
                    <Button className="w-full h-9 bg-background/90 hover:bg-background text-foreground backdrop-blur-sm border shadow-sm font-bold gap-2">
                        <Eye className="h-4 w-4" />
                        <Link to={`/product/${product.id}`} className="w-full pointer-events-auto">
                            <span>عرض التفاصيل</span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col grow space-y-2">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{product.brand}</p>
                <h3 className="font-display text-base font-bold line-clamp-2 group-hover:text-primary transition-colors min-h-10">{product.nameAr}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-200"}`} />
                        ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-bold">({product.reviewCount})</span>
                </div>

                {/* Price & Cart Footer */}
                <div className="flex items-center justify-between pt-3 mt-auto">
                    <div className="flex flex-col">
                        {product.originalPrice && <span className="text-xs text-muted-foreground line-through decoration-destructive/40">{formatPrice(product.originalPrice)}</span>}
                        <span className="text-lg font-black text-primary leading-none">{formatPrice(product.price)}</span>
                    </div>

                    <Button
                        size="icon"
                        className="h-10 w-10 cursor-pointer rounded-xl shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                    >
                        <ShoppingBag className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
