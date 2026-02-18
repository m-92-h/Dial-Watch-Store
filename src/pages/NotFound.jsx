import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: Access attempted to:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-6 text-right transition-colors duration-500 py-12" dir="rtl">
            <div className="max-w-2xl w-full text-center relative">
                
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }} 
                    transition={{ duration: 0.5 }} 
                    className="flex justify-center mb-6 md:mb-8"
                >
                    <div className="p-4 md:p-6 bg-red-50 dark:bg-red-950/30 rounded-full">
                        <AlertCircle className="h-12 w-12 md:h-16 md:w-16 text-red-600 dark:text-red-500" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl sm:text-8xl md:text-9xl font-display font-black text-muted/20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:top-1/4 -z-10 select-none"
                >
                    404
                </motion.h1>

                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.2 }} 
                    className="relative z-10"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground font-display">
                        خارج نطاق الزمن
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed font-sans max-w-md mx-auto">
                        يبدو أن عقارب الساعة قد توقفت هنا. الصفحة التي تحاول الوصول إليها غير موجودة في هذا الوقت.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-sans">
                        <Link to="/" className="w-full sm:w-auto">
                            <Button 
                                size="lg" 
                                className="w-full sm:w-auto btn-luxury text-accent-foreground font-bold px-8 py-6 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Home className="h-5 w-5" />
                                العودة للرئيسية
                            </Button>
                        </Link>

                        <Button 
                            variant="classic" 
                            size="lg" 
                            onClick={() => window.history.back()} 
                            className="w-full sm:w-auto btn-outline-luxury text-accent-foreground font-bold px-8 py-6 rounded-full transition-all border-2 cursor-pointer flex justify-center items-center"
                        >
                            الرجوع للخلف
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;