export interface MetaContent {
  title: string;
  description: string;
}

export interface BrandContent {
  name: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavContent {
  links: readonly NavLink[];
  ctaLabel: string;
  ctaHref: string;
  languageLabel: string;
}

export interface TitlePart {
  text: string;
  highlight?: boolean;
}

export interface HeroContent {
  eyebrow: string;
  lead: string;
  rotatingWords: readonly string[];
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface BrandItem {
  name: string;
  logo: string;
  alt: string;
}

export interface BrandsContent {
  eyebrow: string;
  items: readonly BrandItem[];
}

export interface ClientItem {
  id: string;
  name: string;
  sector?: string;
  logo: string;
  alt: string;
}

export interface ClientsContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  intro: string;
  items: readonly ClientItem[];
}

export interface ServiceCategory {
  id: string;
  label: string;
}

export interface ShowcaseFeature {
  icon?: string;
  title: string;
  description?: string;
  tag?: string;
}

export interface ShowcaseCard {
  layout: "showcase";
  id: string;
  category: string;
  kicker?: string;
  headline: string;
  headlineAccent?: string;
  subline?: string;
  image: {
    src: string;
    alt: string;
    position?: {
      desktop?: string;
      mobile?: string;
    };
  };
  imageSide?: "left" | "right";
  features: readonly ShowcaseFeature[];
  cta?: {
    label: string;
    href: string;
  };
}

export interface CollageCard {
  layout: "collage";
  id: string;
  category: string;
  kicker?: string;
  headline: string;
  subline: string;
  tiles: readonly {
    src: string;
    alt: string;
    position?: {
      desktop?: string;
      mobile?: string;
    };
  }[];
  cta?: {
    label: string;
    href: string;
  };
}

export type ProductCard = ShowcaseCard | CollageCard;

export interface SolutionsContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  intro: string;
  itemLabel: string;
  cardCtaLabel: string;
  cardCtaHref: string;
  cardCtaMessage: string;
  cards: readonly ProductCard[];
}

export interface FeaturedProduct {
  id: string;
  category: string;
  brand: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface FeaturedProductsContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  intro: string;
  carouselLabel: string;
  prevLabel: string;
  nextLabel: string;
  ctaLabel: string;
  cardAriaLabel: string;
  whatsappMessage: string;
  items: readonly FeaturedProduct[];
}

export type ProjectCategoryId = "camaras" | "portones" | "audio" | "iluminacion";

export interface WorkProject {
  id: string;
  title?: string;
  category: ProjectCategoryId;
  location?: string;
  image: string;
  alt: string;
}

export interface ProjectsContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  intro: string;
  viewMoreLabel: string;
  modalTitle: string;
  modalSubtitle: string;
  allFilterLabel: string;
  closeLabel: string;
  categories: readonly { id: ProjectCategoryId; label: string }[];
  items: readonly WorkProject[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BannerContent {
  title: string;
  faqTitle: string;
  faqs: readonly FaqItem[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  intro: string;
  steps: readonly ProcessStep[];
}

export interface StatItem {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface StatsContent {
  eyebrow: string;
  items: readonly StatItem[];
}

export interface Review {
  id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  authorName: string;
  comment: string;
  date: string;
}

export interface SummaryLabel {
  one: string;
  other: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  isDemo: boolean;
  demoNotice: string;
  summaryLabel: SummaryLabel;
  starsLabel: string;
  reviewAriaLabel: string;
  prevLabel: string;
  nextLabel: string;
  items: readonly Review[];
}

export interface FormOption {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  helperText?: string;
  required: boolean;
  options?: readonly FormOption[];
}

export interface ContactFormContent {
  fields: readonly FormField[];
  selectPlaceholder: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactContent {
  eyebrow: string;
  titleParts: readonly TitlePart[];
  intro: string;
  channelsTitle: string;
  email: string;
  phone: string;
  whatsapp: {
    number: string;
  };
  form: ContactFormContent;
}

export interface SocialLink {
  id: "whatsapp" | "instagram" | "facebook" | "email" | "tiktok" | "youtube" | "linkedin";
  label: string;
  href: string;
}

export interface FooterContent {
  tagline: string;
  navTitle: string;
  contactTitle: string;
  socialsTitle: string;
  copyright: string;
}

export interface FeaturesFlags {
  stats: boolean;
  clients: boolean;
  testimonials: boolean;
  featuredProducts: boolean;
}

export interface FloatingCtaContent {
  label: string;
  href: string;
}

export interface SiteContent {
  meta: MetaContent;
  brand: BrandContent;
  nav: NavContent;
  features: FeaturesFlags;
  floatingCta: FloatingCtaContent;
  services: readonly ServiceCategory[];
  socials: readonly SocialLink[];
  sections: {
    hero: HeroContent;
    brands: BrandsContent;
    solutions: SolutionsContent;
    featuredProducts: FeaturedProductsContent;
    projects: ProjectsContent;
    banner: BannerContent;
    process: ProcessContent;
    stats: StatsContent;
    clients: ClientsContent;
    testimonials: TestimonialsContent;
    contact: ContactContent;
  };
  footer: FooterContent;
}

const SERVICES: readonly ServiceCategory[] = [
  { id: "cctv", label: "Cámaras de seguridad" },
  { id: "gates", label: "Portones eléctricos" },
  { id: "locks", label: "Chapas de seguridad" },
  { id: "alarms", label: "Alarmas" },
  { id: "beacons", label: "Balizas" },
  { id: "other", label: "Otros" },
];

export const siteContent: SiteContent = {
  meta: {
    title: "DiP | Seguridad electrónica para hogares y negocios",
    description: "Cámaras de seguridad, portones eléctricos, chapas, alarmas y balizas. Diagnóstico, instalación y soporte.",
  },
  brand: {
    name: "DiP",
  },
  nav: {
    links: [
      { label: "Soluciones", href: "#soluciones" },
      { label: "Cómo trabajamos", href: "#como-trabajamos" },
      { label: "Contacto", href: "#contacto" },
    ],
    ctaLabel: "Solicitar diagnóstico",
    ctaHref: "#diagnostico",
    languageLabel: "ES",
  },
  features: {
    stats: true,
    clients: true,
    testimonials: true,
    featuredProducts: true,
  },
  floatingCta: {
    label: "Solicitar diagnóstico",
    href: "#diagnostico",
  },

  services: SERVICES,

  socials: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/56966660120",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/",
    },
    {
      id: "email",
      label: "Correo",
      href: "mailto:solucionesdipltda@gmail.com",
    },
  ],

  sections: {
    hero: {
      eyebrow: "Seguridad electrónica",
      lead: "DiP Soluciones",
      rotatingWords: [
        "Seguridad",
        "Cámaras",
        "Alarmas",
        "Portones",
        "Sensores",
        "Automatización",
      ],
      subtitle: "Cámaras, alarmas, portones y control de acceso instalados con criterio. Más control, menos preocupaciones.",
      ctaLabel: "Solicitar diagnóstico",
      ctaHref: "#diagnostico",
      secondaryLabel: "Ver cómo trabajamos",
      secondaryHref: "#como-trabajamos",
    },
    brands: {
      eyebrow: "Trabajamos con marcas líderes",
      items: [
        { name: "Marca 1", logo: "/images/brands/marca-1.webp", alt: "Logo Marca 1" },
        { name: "Marca 2", logo: "/images/brands/marca-2.webp", alt: "Logo Marca 2" },
        { name: "Marca 3", logo: "/images/brands/marca-3.webp", alt: "Logo Marca 3" },
        { name: "Marca 4", logo: "/images/brands/marca-4.webp", alt: "Logo Marca 4" },
        { name: "Marca 5", logo: "/images/brands/marca-5.webp", alt: "Logo Marca 5" },
        { name: "Marca 6", logo: "/images/brands/marca-6.webp", alt: "Logo Marca 6" },
        { name: "Marca 7", logo: "/images/brands/marca-7.webp", alt: "Logo Marca 7" },
        { name: "Marca 8", logo: "/images/brands/marca-8.2.webp", alt: "Logo Marca 8" },
        { name: "Marca 9", logo: "/images/brands/marca-9.webp", alt: "Logo Marca 9" },
      ],
    },
    solutions: {
      eyebrow: "Qué hacemos",
      titleParts: [
        { text: "Ver más. " },
        { text: "Preocuparte menos.", highlight: true },
      ],
      intro: "La seguridad no es un dispositivo. Es la suma de cada detalle funcionando en sincronía.",
      itemLabel: "Producto",
      cardCtaLabel: "Cotizar este producto",
      cardCtaHref: "#diagnostico",
      cardCtaMessage: "Hola, me interesa cotizar: {title}.",
      cards: [
        {
          layout: "showcase",
          id: "gates-rossi",
          category: "gates",
          kicker: "Motor Portón Corredera",
          headline: "Rossi DZ",
          headlineAccent: "Nano / Turbo",
          subline: "Automatización de alto rendimiento para portones residenciales e industriales.",
          image: {
            src: "/images/services/gates-rossi/product.webp",
            alt: "Motor Rossi para portón automático",
          },
          imageSide: "left",
          features: [
            {
              icon: "power",
              title: "Apertura Nitro en 3 seg",
              tag: "Exclusiva",
              // CONFIRMAR con ficha técnica
              description: "Desplazamiento rápido del portón corredera.",
            },
            {
              icon: "cpu",
              title: "Cierre suave Smart Close",
              // CONFIRMAR con ficha técnica
              description: "Desaceleración controlada al finalizar el recorrido.",
            },
            {
              icon: "battery",
              title: "Bivolt 127/220V",
              tag: "Único modelo",
              // CONFIRMAR con ficha técnica
              description: "Compatible con redes eléctricas de 127V y 220V.",
            },
            {
              icon: "shield",
              title: "2 años de garantía",
              // TODO: confirmar garantía con el proveedor
              description: "Respaldo de fábrica incluido en el equipo.",
            },
          ],
          cta: {
            label: "Cotizar este motor",
            href: "",
          },
        },
        {
          layout: "showcase",
          id: "hdcvi",
          category: "cctv",
          kicker: "CCTV Full HD",
          headline: "Tecnología HDCVI",
          headlineAccent: "Dahua",
          subline: "Videovigilancia profesional con transmisión en alta definición sin pérdida.",
          image: {
            src: "/images/services/hdcvi/product.webp",
            alt: "Sistema de cámaras HDCVI Dahua",
          },
          imageSide: "right",
          features: [
            {
              icon: "eye",
              title: "Imágenes 1080p nítidas",
              tag: "Full HD",
              // CONFIRMAR con ficha técnica
              description: "Transmisión de video en alta definición sin pérdida.",
            },
            {
              icon: "wifi",
              title: "Largo alcance por coaxial",
              // CONFIRMAR con ficha técnica
              description: "Señal estable a distancia mediante cableado coaxial.",
            },
            {
              icon: "bell",
              title: "Audio sobre el mismo cable",
              // CONFIRMAR con ficha técnica
              description: "Transmisión de audio integrada sin tendidos adicionales.",
            },
            {
              icon: "shield",
              title: "Infrarrojo nocturno",
              // CONFIRMAR con ficha técnica
              description: "Vigilancia continua en condiciones de oscuridad.",
            },
          ],
          cta: {
            label: "Cotizar CCTV",
            href: "",
          },
        },
        {
          layout: "showcase",
          id: "gates-et",
          category: "gates",
          kicker: "Motores Industriales",
          headline: "E.T. Systems",
          headlineAccent: "Serie Heavy",
          subline: "Potencia extrema y durabilidad para accesos de alto tráfico.",
          image: {
            src: "/images/services/gates-et/product.webp",
            alt: "Motor industrial E.T. Systems",
          },
          imageSide: "left",
          features: [
            {
              icon: "power",
              title: "Arrastre hasta 1000 kg",
              tag: "Heavy",
              // CONFIRMAR con ficha técnica
              description: "Diseñado para portones pesados y accesos de alto tráfico.",
            },
            {
              icon: "battery",
              title: "Batería respaldo 24VDC",
              // CONFIRMAR con ficha técnica
              description: "Operación continua incluso ante cortes de suministro eléctrico.",
            },
            {
              icon: "shield",
              title: "Sistema anti-aplastamiento",
              // CONFIRMAR con ficha técnica
              description: "Detección de obstáculos para mayor seguridad en el cierre.",
            },
            {
              icon: "cpu",
              title: "Central inteligente",
              // CONFIRMAR con ficha técnica
              description: "Gestión electrónica de maniobras y control de acceso.",
            },
          ],
          cta: {
            label: "Cotizar E.T. Systems",
            href: "",
          },
        },
        {
          layout: "showcase",
          id: "wizcolor",
          category: "cctv",
          kicker: "CCTV Color Nocturno",
          headline: "Hikvision WizColor",
          headlineAccent: "24/7",
          subline: "A todo color día y noche gracias a su óptica avanzada y luz suplementaria.",
          image: {
            src: "/images/services/wizcolor/product.webp",
            alt: "Cámara Hikvision WizColor a color",
          },
          imageSide: "right",
          features: [
            {
              icon: "eye",
              title: "Óptica F1.0 gran apertura",
              tag: "24/7",
              // CONFIRMAR con ficha técnica
              description: "Mayor captación de luz junto a iluminación suplementaria.",
            },
            {
              icon: "wifi",
              title: "Color real sin luz",
              // CONFIRMAR con ficha técnica
              description: "Imágenes a color durante todo el día y la noche.",
            },
            {
              icon: "cpu",
              title: "Detección personas y autos",
              // CONFIRMAR con ficha técnica
              description: "Identificación inteligente para reducir falsas alertas.",
            },
            {
              icon: "shield",
              title: "Certificación IP67",
              // CONFIRMAR con ficha técnica
              description: "Protección frente a polvo y lluvia para exterior.",
            },
          ],
          cta: {
            label: "Cotizar WizColor",
            href: "",
          },
        },
        {
          layout: "collage",
          id: "multivision",
          category: "other",
          kicker: "Soluciones Integrales",
          headline: "Seguridad Centralizada",
          subline: "Monitoreo multi-cámara y sistemas unificados en tiempo real.",
          tiles: [
            { src: "/images/services/multivision/tile-1.webp", alt: "Tile 1" },
            { src: "/images/services/multivision/tile-2.webp", alt: "Tile 2" },
            { src: "/images/services/multivision/tile-3.webp", alt: "Tile 3" },
            { src: "/images/services/multivision/tile-4.webp", alt: "Tile 4" },
          ],
          cta: {
            label: "Cotizar Multivisión",
            href: "",
          },
        },
      ],
    },
    featuredProducts: {
      eyebrow: "Productos destacados",
      titleParts: [
        { text: "Equipos que " },
        { text: "recomendamos.", highlight: true },
      ],
      intro: "Una selección de equipos para proteger tu hogar o negocio.",
      carouselLabel: "Productos destacados",
      prevLabel: "Ver productos anteriores",
      nextLabel: "Ver productos siguientes",
      ctaLabel: "Cotizar",
      cardAriaLabel: "Cotizar {title} por WhatsApp (se abre en una pestaña nueva)",
      whatsappMessage: "Hola, me interesa cotizar: {title}.",
      items: [
        {
          id: "ptz",
          category: "cctv",
          brand: "Dahua",
          title: "Cámara PTZ",
          description: "Giro y zoom para cubrir más área con una sola cámara.",
          image: "/images/products/ptz.webp",
          imageAlt: "Cámara domo PTZ Dahua con soporte de pared",
        },
        {
          id: "kit-4-camaras",
          category: "cctv",
          brand: "Dahua",
          title: "Kit 4 cámaras Full-Color",
          description: "Cuatro cámaras con imagen a color y grabador, con visualización desde el celular.",
          image: "/images/products/kit-4-camaras.webp",
          imageAlt: "Kit de cuatro cámaras, grabador y celular mostrando las imágenes",
        },
        {
          id: "kit-1080p",
          category: "cctv",
          brand: "Dahua",
          title: "Kit cámaras Full HD 1080p",
          description: "Cámaras domo y bullet con fuente de poder, disco duro y accesorios de instalación.",
          image: "/images/products/kit-1080p.webp",
          imageAlt: "Kit de cámaras domo y bullet con grabador, fuente de poder, disco duro y accesorios",
        },
        {
          id: "control-et",
          category: "gates",
          brand: "E.T. Systems",
          title: "Control remoto original",
          description: "Control de 2 botones para tu portón.",
          image: "/images/products/control-et.webp",
          imageAlt: "Control remoto azul E.T. de dos botones",
        },
        {
          id: "kit-motor",
          category: "gates",
          brand: "Rossi",
          title: "Kit motor para portón corredero",
          description: "Motor, 2 controles remotos y cremallera para automatizar tu portón.",
          image: "/images/products/kit-motor.webp",
          imageAlt: "Motor Rossi con dos controles remotos y una cremallera",
        },
      ],
    },
    projects: {
      eyebrow: "Nuestro trabajo",
      titleParts: [
        { text: "Instalaciones " },
        { text: "en terreno.", highlight: true },
      ],
      intro: "Conoce parte de los proyectos de seguridad y automatización que hemos implementado en hogares y empresas.",
      viewMoreLabel: "Ver más trabajos",
      modalTitle: "Galería de proyectos",
      modalSubtitle: "Explora nuestras instalaciones realizadas por categoría.",
      allFilterLabel: "Todos",
      closeLabel: "Cerrar galería",
      categories: [
        { id: "camaras", label: "Cámaras" },
        { id: "portones", label: "Portones" },
        { id: "audio", label: "Audio" },
        { id: "iluminacion", label: "Iluminación" },
      ],
      items: [
        // --- Primeros 8 con sus títulos ---
        {
          id: "trabajo-01",
          title: "Automatización portón corredera residencial",
          category: "portones",
          image: "/images/projects/trabajo-01.webp",
          alt: "Instalación de motor para portón corredera en acceso residencial",
        },
        {
          id: "trabajo-02",
          title: "Sistema CCTV perimetral Full HD",
          category: "camaras",
          image: "/images/projects/trabajo-02.webp",
          alt: "Cámaras de seguridad instaladas en exterior de empresa",
        },
        {
          id: "trabajo-03",
          title: "Control de acceso y chapa eléctrica",
          category: "portones",
          image: "/images/projects/trabajo-03.webp",
          alt: "Chapa de seguridad instalada en puerta de acceso principal",
        },
        {
          id: "trabajo-04",
          title: "Central de alarma y sensores interiores",
          category: "camaras",
          image: "/images/projects/trabajo-04.webp",
          alt: "Panel de alarma instalado y configurado en oficina",
        },
        {
          id: "trabajo-05",
          title: "Baliza de señalización vehicular",
          category: "iluminacion",
          image: "/images/projects/trabajo-05.webp",
          alt: "Baliza luminosa instalada en salida de estacionamiento",
        },
        {
          id: "trabajo-06",
          title: "Motor industrial serie Heavy",
          category: "portones",
          image: "/images/projects/trabajo-06.webp",
          alt: "Motor industrial instalado en portón de alto tráfico",
        },
        {
          id: "trabajo-07",
          title: "Cámaras visión nocturna a color",
          category: "camaras",
          image: "/images/projects/trabajo-07.webp",
          alt: "Cámara de seguridad a color instalada en fachada",
        },
        {
          id: "trabajo-08",
          title: "Canalización y rack de videovigilancia",
          category: "camaras",
          image: "/images/projects/trabajo-08.webp",
          alt: "Grabador DVR y cableado estructurado ordenado",
        },

        // --- Trabajos 09 al 23 sin título (organizados por categoría) ---
        {
          id: "trabajo-09",
          category: "camaras",
          image: "/images/projects/trabajo-09.webp",
          alt: "Instalación de cámaras de seguridad",
        },
        {
          id: "trabajo-10",
          category: "camaras",
          image: "/images/projects/trabajo-10.webp",
          alt: "Instalación de cámaras de seguridad",
        },
        {
          id: "trabajo-11",
          category: "camaras",
          image: "/images/projects/trabajo-11.webp",
          alt: "Instalación de cámaras de seguridad",
        },
        {
          id: "trabajo-12",
          category: "camaras",
          image: "/images/projects/trabajo-12.webp",
          alt: "Instalación de cámaras de seguridad",
        },
        {
          id: "trabajo-13",
          category: "portones",
          image: "/images/projects/trabajo-13.webp",
          alt: "Instalación de portón eléctrico",
        },
        {
          id: "trabajo-14",
          category: "portones",
          image: "/images/projects/trabajo-14.webp",
          alt: "Instalación de portón eléctrico",
        },
        {
          id: "trabajo-15",
          category: "portones",
          image: "/images/projects/trabajo-15.webp",
          alt: "Instalación de portón eléctrico",
        },
        {
          id: "trabajo-16",
          category: "portones",
          image: "/images/projects/trabajo-16.webp",
          alt: "Instalación de portón eléctrico",
        },
        {
          id: "trabajo-17",
          category: "audio",
          image: "/images/projects/trabajo-17.webp",
          alt: "Instalación de sistema de audio",
        },
        {
          id: "trabajo-18",
          category: "audio",
          image: "/images/projects/trabajo-18.webp",
          alt: "Instalación de sistema de audio",
        },
        {
          id: "trabajo-19",
          category: "audio",
          image: "/images/projects/trabajo-19.webp",
          alt: "Instalación de sistema de audio",
        },
        {
          id: "trabajo-20",
          category: "iluminacion",
          image: "/images/projects/trabajo-20.webp",
          alt: "Instalación de iluminación",
        },
        {
          id: "trabajo-21",
          category: "iluminacion",
          image: "/images/projects/trabajo-21.webp",
          alt: "Instalación de iluminación",
        },
        {
          id: "trabajo-22",
          category: "iluminacion",
          image: "/images/projects/trabajo-22.webp",
          alt: "Instalación de iluminación",
        },
        {
          id: "trabajo-23",
          category: "iluminacion",
          image: "/images/projects/trabajo-23.webp",
          alt: "Instalación de iluminación",
        },
      ],
    },
    banner: {
      title: "La tecnología más avanzada es la que te deja vivir tranquilo.",
      faqTitle: "Preguntas frecuentes",
      // CONFIRMAR con el cliente
      faqs: [
        {
          question: "¿Qué servicios ofrecen?",
          answer: "Cámaras de seguridad, portones eléctricos, chapas de seguridad, alarmas y balizas, para hogares y negocios.",
        },
        {
          question: "¿Cómo funciona el diagnóstico?",
          answer: "Analizamos los riesgos y puntos críticos de tu espacio, diseñamos una solución a tu medida y recién después cotizamos.",
        },
        {
          question: "¿Dan soporte después de la instalación?",
          answer: "Sí, hay soporte y seguimiento después de la entrega.",
        },
        {
          question: "¿Cómo pido una cotización?",
          answer: "Completa el formulario de contacto o escríbenos por WhatsApp y te respondemos con una propuesta.",
        },
      ],
    },
    process: {
      eyebrow: "Nuestro método",
      titleParts: [
        { text: "Precisión " },
        { text: "por diseño.", highlight: true },
      ],
      intro: "Cada espacio tiene su propio lenguaje. Lo escuchamos, lo entendemos y construimos una solución que encaje.",
      steps: [
        {
          title: "Diagnóstico",
          description: "Analizamos riesgos y puntos críticos de tu espacio.",
        },
        {
          title: "Diseño",
          description: "Planificamos una solución a tu medida.",
        },
        {
          title: "Instalación",
          description: "Implementamos con equipos y cableado ordenado.",
        },
        {
          title: "Acompañamiento",
          description: "Soporte y seguimiento después de la entrega.",
        },
      ],
    },
    stats: {
      eyebrow: "Nuestra trayectoria",
      items: [
        { value: 20, decimals: 0, prefix: "+", suffix: "", label: "años de experiencia" },
        { value: 1.3, decimals: 1, prefix: "+", suffix: "M", label: "clientes atendidos" },
      ],
    },
    clients: {
      eyebrow: "Clientes",
      titleParts: [
        { text: "Empresas que " },
        { text: "confían en DiP.", highlight: true },
      ],
      intro: "Instituciones, industrias y comercios que respaldan la calidad de nuestras implementaciones.",
      items: [
        {
          id: "cliente-01",
          name: "Don Mario Repuestos",
          sector: "Automotriz",
          logo: "/images/clients/cliente-01.webp",
          alt: "Logo Don Mario Repuestos",
        },
        {
          id: "cliente-02",
          name: "Comercial CyC Chilemat",
          sector: "Ferretería y Construcción",
          logo: "/images/clients/cliente-02.webp",
          alt: "Logo Comercial CyC Chilemat",
        },
        {
          id: "cliente-03",
          name: "Chanco",
          sector: "Comercio",
          logo: "/images/clients/cliente-03.webp",
          alt: "Logo Chanco",
        },
        {
          id: "cliente-04",
          name: "Comercial Espinoza Hnos.",
          sector: "Ferretería Técnica",
          logo: "/images/clients/cliente-04.webp",
          alt: "Logo Comercial Espinoza Hnos.",
        },
        {
          id: "cliente-05",
          name: "Mayorista DyL",
          sector: "Distribución",
          logo: "/images/clients/cliente-05.webp",
          alt: "Logo Mayorista DyL",
        },
        {
          id: "cliente-06",
          name: "SportPro TV",
          sector: "Medios",
          logo: "/images/clients/cliente-06.webp",
          alt: "Logo SportPro TV",
        },
        {
          id: "cliente-07",
          name: "Farmacia Chanco",
          sector: "Salud",
          logo: "/images/clients/cliente-07.webp",
          alt: "Logo Farmacia Chanco",
        },
        {
          id: "cliente-08",
          name: "Universidad de Talca",
          sector: "Educación",
          logo: "/images/clients/cliente-08.webp",
          alt: "Logo Universidad de Talca",
        },
        {
          id: "cliente-09",
          name: "Empresa Cliente 9",
          sector: "Industria",
          logo: "/images/clients/cliente-09.webp",
          alt: "Logo Empresa Cliente 9",
        },
        {
          id: "cliente-10",
          name: "Empresa Cliente 10",
          sector: "Servicios",
          logo: "/images/clients/cliente-10.webp",
          alt: "Logo Empresa Cliente 10",
        },
        {
          id: "cliente-11",
          name: "Empresa Cliente 11",
          sector: "Comercio",
          logo: "/images/clients/cliente-11.webp",
          alt: "Logo Empresa Cliente 11",
        },
      ],
    },
    testimonials: {
      eyebrow: "Reseñas",
      titleParts: [{ text: "Tranquilidad " }, { text: "comprobada.", highlight: true }],
      isDemo: false,
      demoNotice: "Reseñas de ejemplo, no corresponden a clientes reales.",
      summaryLabel: { one: "Basado en {count} reseña", other: "Basado en {count} reseñas" },
      starsLabel: "Valoración de {rating} sobre 5 estrellas",
      reviewAriaLabel: "Leer reseña de {name}",
      prevLabel: "Ver reseñas anteriores",
      nextLabel: "Ver siguientes reseñas",
      items: [
        { id: 1, rating: 5, authorName: "Camila R.", date: "2026-09-12", comment: "Instalaron las cámaras en un día y quedó todo ordenado. Hoy veo mi local desde el celular." },
        { id: 2, rating: 5, authorName: "Jorge M.", date: "2026-09-03", comment: "El portón eléctrico funciona perfecto, incluso cuando se corta la luz." },
        { id: 3, rating: 4, authorName: "Patricia S.", date: "2026-08-21", comment: "Me explicaron cada opción sin enredos y el presupuesto fue claro." },
        { id: 4, rating: 5, authorName: "Rodrigo A.", date: "2026-08-14", comment: "Cambiaron todas las chapas de la oficina. Se nota la calidad y el cuidado." },
        { id: 5, rating: 5, authorName: "Marcela T.", date: "2026-07-30", comment: "La alarma avisó al instante cuando alguien intentó entrar. Hoy estoy mucho más tranquila." },
        { id: 6, rating: 5, authorName: "Felipe C.", date: "2026-07-18", comment: "Siempre responden cuando los necesito. El soporte después de instalar es real." },
        { id: 7, rating: 4, authorName: "Andrea L.", date: "2026-07-02", comment: "Las balizas dejaron la entrada del estacionamiento mucho más segura." },
        { id: 8, rating: 5, authorName: "Hernán V.", date: "2026-06-20", comment: "Primero hicieron un diagnóstico y recién después cotizaron. Eso me dio confianza." },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      titleParts: [
        { text: "Hablemos de " },
        { text: "tu seguridad.", highlight: true },
      ],
      intro: "Cuéntanos qué necesitas y te respondemos con una propuesta.",
      channelsTitle: "Contáctanos",
      email: "solucionesdipltda@gmail.com",
      phone: "+56966660120",
      whatsapp: {
        number: "56966660120",
      },
      form: {
        selectPlaceholder: "Selecciona un servicio",
        fields: [
          {
            name: "name",
            label: "Nombre",
            type: "text",
            placeholder: "Tu nombre completo",
            required: true,
          },
          {
            name: "email",
            label: "Correo electrónico",
            type: "email",
            placeholder: "tu@correo.com",
            required: true,
          },
          {
            name: "phone",
            label: "Teléfono (opcional)",
            type: "tel",
            placeholder: "+56 9 1234 5678",
            required: false,
          },
          {
            name: "service",
            label: "Servicio de interés",
            type: "select",
            placeholder: "Selecciona un servicio",
            required: false,
            options: SERVICES.map((s) => ({ label: s.label, value: s.id })),
          },
          {
            name: "message",
            label: "Mensaje",
            type: "textarea",
            placeholder: "¿En qué podemos ayudarte?",
            helperText: "Mínimo 10 caracteres",
            required: true,
          },
        ],
        submitLabel: "Solicitar diagnóstico",
        successMessage: "¡Gracias! Te contactaremos pronto.",
        errorMessage: "No pudimos enviar tu mensaje. Inténtalo nuevamente.",
      },
    },
  },
  footer: {
    tagline: "Seguridad electrónica integral para hogares y empresas.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    socialsTitle: "Síguenos",
    copyright: "© DiP. Todos los derechos reservados.",
  },
} as const;