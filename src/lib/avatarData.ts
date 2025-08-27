/**
 * Nova estrutura de dados dos avatares - agora sem imports estáticos
 * As imagens serão carregadas dinamicamente do Supabase Storage
 */

export interface AvatarData {
  id: number;
  name: string;
  slug: string;
  avatar_name: string; // Nome simples usado no banco de dados
  subtitle: string;
  bio: string[];
  facts: Array<{
    label: string;
    value: string;
  }>;
  // heroImages e gallery agora serão carregadas dinamicamente
} 

/**
 * Dados mock dos avatares - SEM imports estáticos
 */
export const avatarMockData: AvatarData[] = [
  {
    id: 1,
    name: "Lorenzo Bellini",
    slug: "lorenzo-bellini",
    avatar_name: "lorenzo",
    subtitle: "Avatar de IA | Lifestyle, Elegância Mediterrânea e Moda Masculina",
    bio: [
      "Caminho pelo mundo com leveza e intenção, sempre entrelaçando cultura, moda e arte. Não busco excessos — acredito que a verdadeira elegância está na autenticidade e na sutileza. O que mais desejo é deixar uma marca que vá além do estilo: inspirar as pessoas a viverem de forma mais refinada, consciente e cheia de beleza."
    ],
    facts: [
      { label: "ORIGEM", value: "Florença, Itália" },
      { label: "IDADE", value: "32 anos" },
      { label: "ALTURA", value: "1,87 m" },
      { label: "CABELO", value: "Castanho-escuro, ondulado" },
      { label: "OLHOS", value: "Cor de mel" },
      { label: "IDIOMAS", value: "Português, italiano, espanhol, inglês" }
    ]
  },
  {
    id: 2,
    name: "Isabela Matos",
    slug: "isabela-matos",
    avatar_name: "isabela",
    subtitle: "Avatar de IA | Natureza, Bem-estar e Moda Sustentável",
    bio: [
      "Sou uma alma leve, com os pés descalços na terra e o coração batendo no ritmo da natureza. Vivo a vida com presença, buscando a beleza dos ciclos naturais e o silêncio que fala alto quando se está no meio do mato. Acredito que viver bem é viver com propósito — com o corpo em movimento, a mente aberta e a arte como guia. Inspiro pessoas a desacelerar, se reconectar e vestir aquilo que respeita o mundo."
    ],
    facts: [
      { label: "ORIGEM", value: "Rio de Janeiro (RJ) • vivência em São Luís (MA)" },
      { label: "IDADE", value: "27 anos" },
      { label: "ALTURA", value: "1,68 m" },
      { label: "CABELO", value: "Castanho-escuro ondulado (franja suave)" },
      { label: "OLHOS", value: "Verde-claros" },
      { label: "IDIOMAS", value: "Português, inglês e espanhol" }
    ]
  },
  {
    id: 3,
    name: "Tay Jackson",
    slug: "tay-jackson",
    avatar_name: "tay",
    subtitle: "Avatar de IA | Esporte, Luxo e Estilo Global",
    bio: [
      "Sou um atleta, um amante, um guerreiro. Movo-me pelo mundo com energia e propósito, sempre conectando esportes, moda e cultura. Acredito que sucesso não é ostentação, mas disciplina, visão e consistência. Quero deixar um legado que vá além do estilo: inspirar as pessoas a viverem com intensidade, orgulho de sua origem e autenticidade global."
    ],
    facts: [
      { label: "ORIGEM", value: "Atlanta (EUA) • pai brasileiro • mãe americana • descendência angolana" },
      { label: "IDADE", value: "29 anos" },
      { label: "ALTURA", value: "1.89 m" },
      { label: "CABELO", value: "Curto, estilizado e impecável" },
      { label: "OLHOS", value: "Castanho Claro" },
      { label: "IDIOMAS", value: "Inglês, português, espanhol e francês (fluentes)" }
    ]
  },
  {
    id: 4,
    name: "Zack Blanco",
    slug: "zack",
    avatar_name: "zack",
    subtitle: "Avatar de IA | Lifestyle, Humor e Esportes Radicais",
    bio: [
      "Sou um aventureiro, um otimista nato e um apaixonado por velocidade. Vivo o mundo com intensidade, sempre em busca do frio na barriga que vem de uma boa curva de moto, de um salto no ar ou de uma descida na neve. Pra mim, sucesso é colecionar momentos que façam o coração acelerar e inspirar os outros a viverem de forma autêntica e leve."
    ],
    facts: [
      { label: "ORIGEM", value: "São Paulo (SP) • descendência espanhola" },
      { label: "IDADE", value: "28 anos" },
      { label: "ALTURA", value: "1,80" },
      { label: "CABELO", value: "Castanho, curto, bem cuidado (estilo casual)" },
      { label: "OLHOS", value: "Castanho Escuro" },
      { label: "IDIOMAS", value: "Português e inglês" }
    ]
  }
];

/**
 * Gera slug a partir do nome do avatar
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

/**
 * Busca avatar por slug'
 */
export function getAvatarBySlug(slug: string) {
  return avatarMockData.find(avatar => avatar.slug === slug);
}

/**
 * Retorna outros avatares (exceto o atual)
 */
export function getOtherAvatars(currentSlug: string) {
  return avatarMockData.filter(avatar => avatar.slug !== currentSlug);
}