import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("يرجى إدخال بريد إلكتروني صحيح");
            return;
        }

        // إذا كان الايميل صحيحاً
        setError("");
        setEmail("");
        console.log("تم الإرسال بنجاح:", email);
    };

    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-display text-3xl font-bold text-gold-gradient">ميناء</h3>
                        <p className="text-muted-foreground leading-relaxed">وجهتك الأولى للساعات الفاخرة في دولة الإمارات العربية المتحدة. نقدم أرقى الماركات العالمية مع ضمان الأصالة.</p>
                        <div className="flex gap-4">
                            <motion.a whileHover={{ scale: 1.1 }} href="#" className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.1 }} href="#" className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.1 }} href="#" className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-display text-xl font-semibold">روابط سريعة</h4>
                        <ul className="space-y-3">
                            {["العلامات التجارية", "العروض", "من نحن", "اتصل بنا"].map((link) => (
                                <li key={link}>
                                    <Link to="*" className="text-muted-foreground hover:text-primary transition-colors luxury-underline">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-display text-xl font-semibold">تواصل معنا</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-5 w-5 text-primary" />
                                <span dir="ltr">+971 50 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>info@meena.ae</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span> دبي، الإمارات العربية المتحدة </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-display text-xl font-semibold">النشرة البريدية</h4>
                        <p className="text-muted-foreground">اشترك للحصول على أحدث العروض والمنتجات الجديدة</p>
                        <form className="flex gap-2" onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="بريدك الإلكتروني"
                                className={`bg-secondary/50 h-[clamp(30px,5vw,35px)] text-[clamp(12px,5vw,16px)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 shadow-none ${error ? "border-destructive" : ""}`}
                            />
                            <Button type="submit" className="h-[clamp(30px,5vw,35px)] btn-luxury cursor-pointer">
                                اشترك
                            </Button>
                        </form>
                        {error && <span className="text-destructive text-xs mt-1 px-1">{error}</span>}
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} متجر ميناء للساعات. جميع الحقوق محفوظة.</p>
                    <div className="flex gap-6 text-sm">
                        <Link to="*" className="text-muted-foreground hover:text-primary transition-colors">
                            سياسة الخصوصية
                        </Link>
                        <Link to="*" className="text-muted-foreground hover:text-primary transition-colors">
                            الشروط والأحكام
                        </Link>
                        <Link to="*" className="text-muted-foreground hover:text-primary transition-colors">
                            سياسة الإرجاع
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
