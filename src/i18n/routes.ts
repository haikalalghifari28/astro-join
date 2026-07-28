export const routes = {
  home: { id: "/", en: "/" },
  about: { id: "/tentang-kami", en: "/about-us" },
  services: { id: "/layanan", en: "/services" },
  projects: { id: "/proyek", en: "/projects" },
  clients: { id: "/klien", en: "/clients" },
  contact: { id: "/kontak", en: "/contact" },
  articles: { id: "/artikel", en: "/articles" },

  // Sub-halaman Layanan
  serviceAudit: {
    id: "/layanan/audit-struktur",
    en: "/services/structural-audit",
  },
  servicePbg: {
    id: "/layanan/perizinan-pbg",
    en: "/services/building-permits",
  },
  serviceMep: { id: "/layanan/perencanaan-mep", en: "/services/mep-planning" },
  serviceMkp: {
    id: "/layanan/manajemen-konstruksi",
    en: "/services/construction-management",
  },
  serviceSlf: { id: "/layanan/slf", en: "/services/slf" },
  servicePtg: {
    id: "/layanan/penyelidikan-tanah-geoteknik",
    en: "/services/geotechnical-investigation",
  },
} as const;

export type RouteKey = keyof typeof routes;
