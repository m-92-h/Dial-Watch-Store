import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Heart, ShoppingBag, Star, Shield, Truck, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { products } from "@/data/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "@/store/slices/wishlistSlice";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "sonner";

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = products.find((p) => p.id === id);

    const isInWishlist = useSelector(selectIsInWishlist(id || ""));

    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <main className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-4xl font-bold mb-4">المنتج غير موجود</h1>
                    <Link to="/products">
                        <Button className="btn-luxury cursor-pointer">العودة للمنتجات</Button>
                    </Link>
                </div>
            </main>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
        }
        toast.success("تمت الإضافة إلى السلة", {
            description: `${product.nameAr} (${quantity})`,
        });
    };

    const handleToggleWishlist = () => {
        dispatch(toggleWishlist(product));
        if (isInWishlist) {
            toast.error("تمت الإزالة من المفضلة");
        } else {
            toast.success("تمت الإضافة إلى المفضلة");
        }
    };

    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link to="/" className="hover:text-primary transition-colors">
                        الرئيسية
                    </Link>
                    <ArrowRight className="h-4 w-4 rtl-flip" />
                    <Link to="/products" className="hover:text-primary transition-colors">
                        المنتجات
                    </Link>
                    <ArrowRight className="h-4 w-4 rtl-flip" />
                    <span className="text-foreground">{product.nameAr}</span>
                </motion.nav>

                {/* Product Details */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-card">
                            <img src={product.image} alt={product.nameAr} className="w-full h-full object-cover" />
                        </div>
                        {product.originalPrice && (
                            <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                                خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </div>
                        )}
                    </motion.div>

                    {/* Info */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div>
                            <p className="text-primary font-medium mb-2">{product.brand}</p>
                            <h1 className="font-display text-4xl font-bold mb-4">{product.nameAr}</h1>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">
                                    {product.rating} ({product.reviewCount} تقييم)
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4">
                                <span className="font-display text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                                {product.originalPrice && <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
                            </div>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">{product.descriptionAr}</p>

                        {product.featuresAr && (
                            <div className="space-y-3">
                                <h3 className="font-display text-lg font-semibold">المميزات</h3>
                                <ul className="space-y-2">
                                    {product.featuresAr.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <Check className="h-5 w-5 text-primary" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${product.inStock ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                            <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-destructive"}`} />
                            {product.inStock ? "متوفر في المخزون" : "نفذت الكمية"}
                        </div>

                        {product.inStock && (
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-4 w-full max-w-full overflow-hidden">
                                <div className="flex items-center justify-between gap-2 sm:gap-4 bg-secondary rounded-lg px-2 sm:px-4 h-12 sm:h-14 w-full sm:w-auto">
                                    <Button
                                        variant="icon"
                                        size="icon"
                                        className="h-8 w-8 sm:h-10 sm:w-10 bg-card shadow shadow-ring/50 cursor-pointer shrink-0"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </Button>
                                    <span className="text-base sm:text-lg font-bold w-6 sm:w-8 text-center">{quantity}</span>
                                    <Button
                                        variant="icon"
                                        size="icon"
                                        className="h-8 w-8 sm:h-10 sm:w-10 bg-card shadow shadow-ring/50 cursor-pointer shrink-0"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>

                                <Button size="lg" className="flex-1 min-w-35 h-12 sm:h-14 btn-luxury cursor-pointer text-sm sm:text-base" onClick={handleAddToCart}>
                                    <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    أضف إلى السلة
                                </Button>

                                <Button
                                    variant="none"
                                    size="icon"
                                    onClick={handleToggleWishlist}
                                    className={`h-12 w-12 sm:h-14 sm:w-14 shrink-0 relative shadow-sm hover:shadow-destructive/50 hover:text-destructive border ${isInWishlist ? "text-destructive" : ""
                                        } cursor-pointer`}
                                >
                                    <Heart className={`${isInWishlist ? "fill-current" : ""} h-5 w-5 sm:h-6 sm:w-6`} />
                                </Button>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                            <div className="text-center">
                                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">ضمان الأصالة</p>
                            </div>
                            <div className="text-center">
                                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">شحن مجاني</p>
                            </div>
                            <div className="text-center">
                                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">دعم 24/7</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="font-display text-3xl font-bold mb-8">منتجات مشابهة</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default ProductDetailPage;
