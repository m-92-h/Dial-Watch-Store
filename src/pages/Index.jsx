import { motion } from "motion/react";
import { ArrowLeft, Shield, Truck, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, brands } from "@/data/products";

const HeroSection = () => (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-right">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                    >
                        مجموعة {new Date().getFullYear()} الحصرية
                    </motion.span>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="text-gold-gradient">الفخامة</span>
                        <br />
                        <span className="text-gray-100">في كل لحظة</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                        اكتشف تشكيلتنا الحصرية من أرقى الساعات السويسرية. كل قطعة تحكي قصة من الإبداع والتميز.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/products">
                            <Button size="lg" className="btn-luxury text-lg px-10 py-6 group cursor-pointer">
                                تصفح المجموعة
                                <ArrowLeft className="mr-2 h-5 w-5 ltr-flip group-hover:-translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Watch Image */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                    <div className="relative w-full aspect-square max-w-lg mx-auto">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-gold" />

                        {/* Main Image */}
                        <motion.img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                            alt="ساعة فاخرة"
                            className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float"
                        />

                        {/* Floating Elements */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-primary/20 rounded-full" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-primary/10 rounded-full" />
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
                <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </motion.div>
        </motion.div>
    </section>
);

const FeaturesSection = () => {
    const features = [
        {
            icon: Shield,
            title: "ضمان الأصالة",
            description: "جميع ساعاتنا أصلية 100% مع شهادة ضمان دولية",
        },
        {
            icon: Truck,
            title: "شحن مجاني",
            description: "توصيل مجاني لجميع أنحاء الدولة خلال 24-48 ساعة",
        },
        {
            icon: Award,
            title: "جودة عالمية",
            description: "نختار فقط أفضل الماركات العالمية لعملائنا",
        },
        {
            icon: Clock,
            title: "دعم على مدار الساعة",
            description: "فريق خدمة العملاء متاح لمساعدتك في أي وقت",
        },
    ];

    return (
        <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategoriesSection = () => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-display text-4xl font-bold mb-4">تسوق حسب الفئة</h2>
                <p className="text-muted-foreground text-lg">اكتشف مجموعاتنا المتنوعة</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <motion.div key={category.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <Link to={`/products?category=${category.slug}`} className="group block relative aspect-4/5 rounded-2xl overflow-hidden">
                            <img
                                src={`https://images.unsplash.com/photo-${["1587836374828-4dbafa94cf0e", "1547996160-81dfa63595aa", "1522312346375-d1a52e2b99b3", "1524592094714-0f0654e20314"][index]}?w=600&q=80`}
                                alt={category.nameAr}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                            <div className="absolute bottom-0 right-0 left-0 p-3 sm:p-6">
                                <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory mb-2">{category.nameAr}</h3>
                                <div className="flex items-center text-sm sm:text-xl text-primary font-medium group group-hover:underline">
                                    تصفح الآن
                                    <ArrowLeft className="sm:mr-2 h-4 w-4 ltr-flip group-hover:-translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const FeaturedProducts = () => {
    const featuredProducts = products.slice(0, 4);

    return (
        <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="font-display text-4xl font-bold mb-2">الأكثر مبيعاً</h2>
                        <p className="text-muted-foreground text-lg">الساعات المفضلة لعملائنا</p>
                    </div>
                    <Link to="/products">
                        <Button variant="icon" className="btn-outline-luxury group hidden sm:flex cursor-pointer">
                            عرض الكل
                            <ArrowLeft className="mr-2 h-4 w-4 ltr-flip group-hover:-translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link to="/products">
                        <Button className="btn-luxury">
                            عرض جميع المنتجات
                            <ArrowLeft className="mr-2 h-4 w-4 ltr-flip" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const BrandsSection = () => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-display text-4xl font-bold mb-4">علاماتنا التجارية</h2>
                <p className="text-muted-foreground text-lg">شركاء التميز والفخامة</p>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-12">
                {brands.map((brand, index) => (
                    <motion.div
                        key={brand.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center"
                    >
                        <div className="font-display text-2xl font-bold text-muted-foreground hover:text-primary transition-colors cursor-default">{brand.name}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const CTASection = () => (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                    backgroundSize: "30px 30px",
                }}
            />
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-ivory">
                    انضم إلى عالم <span className="text-gold-gradient">الفخامة</span>
                </h2>
                <p className="text-xl text-ivory/80 mb-8">اشترك في نشرتنا البريدية واحصل على خصم 10% على أول طلب</p>
                <Link to="/products">
                    <Button size="lg" className="btn-luxury group text-lg px-12 py-6 cursor-pointer">
                        تسوق الآن
                        <ArrowLeft className="mr-2 h-5 w-5 ltr-flip group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </motion.div>
        </div>
    </section>
);

const Index = () => {
    return (
        <main>
            <HeroSection />
            <FeaturesSection />
            <CategoriesSection />
            <FeaturedProducts />
            <BrandsSection />
            <CTASection />
        </main>
    );
};

export default Index;
