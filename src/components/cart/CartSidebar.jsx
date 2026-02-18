import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, selectIsCartOpen, setCartOpen, updateQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const CartSidebar = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const isOpen = useSelector(selectIsCartOpen);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
            <SheetContent
                side="right"
                className="fixed right-0 top-0 h-full w-full max-w-70 xs:max-w-[350px] md:max-w-112.5 lg:max-w-137.5 bg-card z-50 shadow-elevated p-0 flex flex-col gap-0 border-none [&>button]:hidden"
            >
                {/* Header */}
                <SheetHeader className="flex flex-row items-center justify-between p-4 sm:p-6 border-b border-border space-y-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        <SheetTitle className="font-display text-xl sm:text-2xl font-bold text-foreground">سلة التسوق</SheetTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer" onClick={() => dispatch(setCartOpen(false))}>
                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </SheetHeader>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4 opacity-20" />
                            <p className="text-base sm:text-lg text-muted-foreground">سلة التسوق فارغة</p>
                            <Link to="/products" onClick={() => dispatch(setCartOpen(false))}>
                                <Button className="mt-4 btn-luxury text-sm sm:text-base cursor-pointer">تصفح المنتجات</Button>
                            </Link>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="flex gap-3 sm:gap-4 bg-secondary/30 rounded-xl p-3 sm:p-4 border border-border/50"
                                >
                                    {/* صورة المنتج*/}
                                    <img src={item.image} alt={item.nameAr} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0" />

                                    {/* تفاصيل المنتج */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div className="text-right">
                                            <h3 className="font-bold text-sm sm:text-base line-clamp-1 text-foreground leading-tight">{item.nameAr}</h3>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{item.brand}</p>
                                        </div>
                                        <p className="text-primary font-bold text-sm sm:text-base mt-1 text-right">{formatPrice(item.price)}</p>
                                    </div>

                                    {/* التحكم في الكمية والحذف */}
                                    <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 sm:h-8 sm:w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        </Button>

                                        {/* وحدة التحكم في الكمية - مصغرة للجوال */}
                                        <div className="flex items-center bg-secondary/80 rounded-full border border-border/50 p-0.5 sm:p-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-primary/10 transition-all cursor-pointer"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                                            >
                                                <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                            </Button>
                                            <span className="w-5 sm:w-7 text-center text-[12px] sm:text-sm font-bold">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-primary/10 transition-all cursor-pointer"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                            >
                                                <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-border p-4 sm:p-6 bg-card/80 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm sm:text-base font-medium text-muted-foreground">المجموع</span>
                            <span className="font-display text-xl sm:text-2xl font-bold text-primary">{formatPrice(total)}</span>
                        </div>
                        <div className="grid gap-2 sm:gap-3">
                            <Button className="w-full btn-luxury h-8 sm:h-12 text-sm sm:text-base shadow-lg shadow-primary/20 cursor-pointer">إتمام الشراء</Button>
                            <Link to="/products">
                                <Button
                                    variant="outline"
                                    className="w-full h-8 sm:h-12 text-xs sm:text-sm border-muted-foreground/20 hover:bg-secondary transition-all cursor-pointer"
                                    onClick={() => dispatch(setCartOpen(false))}
                                >
                                    متابعة التسوق
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartSidebar;
