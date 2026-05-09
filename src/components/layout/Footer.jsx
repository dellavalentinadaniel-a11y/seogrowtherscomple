
import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import LogoComponent from '@/components/shared/LogoComponent';

const Footer = () => {
    const navigate = useNavigate();

    const handleFeatureNotImplemented = () => {
        toast({
            title: "Feature Not Implemented 🚧",
            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    };

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        if (href.startsWith('http')) {
            window.open(href, '_blank', 'noopener noreferrer');
        } else if (href === '#') {
            handleFeatureNotImplemented();
        } else if (href.includes('#')) {
            const [path, id] = href.split('#');
            if (path === '' || path === '/') {
                navigate('/');
                setTimeout(() => {
                    const targetElement = document.getElementById(id);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                handleFeatureNotImplemented();
            }
        } else {
            navigate(href);
        }
    };

    const footerSections = [
        {
            title: 'Enlaces Rápidos',
            links: [
                { name: 'Inicio', href: '/' },
                { name: 'Servicios', href: '/services' },
                { name: 'Recursos', href: '/resources' },
                { name: 'Herramientas', href: '/tools' },
            ],
        },
        {
            title: 'Nosotros',
            links: [
                { name: 'Quiénes somos', href: '#' },
                { name: 'Misión y visión', href: '#' },
                { name: 'Equipo', href: '#' },
                { name: 'Blog', href: '/blog' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Política de Privacidad', href: '/privacy-policy' },
                { name: 'Términos de Servicio', href: '/terms-of-service' },
                { name: 'Contacto', href: '/contact' },
            ],
        },
    ];

    const socialLinks = [
        { icon: <Twitter size={20} />, name: 'Twitter', href: 'https://x.com/SEOGrowthers' },
        { icon: <Linkedin size={20} />, name: 'LinkedIn', href: 'https://www.linkedin.com/company/seogrowthers' },
        { icon: <Instagram size={20} />, name: 'Instagram', href: 'https://www.instagram.com/seogrowthers/' },
        { icon: <Youtube size={20} />, name: 'YouTube', href: 'https://www.youtube.com/@seogrowthers-s4r' },
    ];

    return (
        <footer className="bg-[#0C0D0D] border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <LogoComponent size="xl" variant="full" isLink={true} />
                        </div>
                        <p className="text-cyan-400 font-medium mb-2 tracking-wide">Web Development • SEO • Analytics</p>
                        <p className="text-gray-400">Soluciones creativas que impulsan resultados reales para tu negocio.</p>
                    </div>

                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <p className="font-semibold text-white mb-6">{section.title}</p>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <p className="font-semibold text-white mb-6">Síguenos</p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SEO Growthers. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
