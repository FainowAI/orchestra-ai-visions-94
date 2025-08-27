# 🎯 Guia de Integração Supabase - Orchestra AI Visions

## ✅ Sistema Atualizado e Funcionando

O sistema foi ajustado para funcionar com a estrutura exata que você descreveu:

### 📁 **Estrutura de Arquivos no Supabase:**

#### **Imagens Principais dos Avatares:**
- `avatar-1.jpg` → Lorenzo Bellini
- `avatar-2.jpg` → Isabela Matos  
- `avatar-3.jpg` → Tay Jackson
- `avatar-4.jpg` → Zack Blanco

#### **Vídeo de Fundo:**
- `background-video.mp4` → Vídeo da página principal

#### **Galeria/Portfolio:**
Organizados por avatar com nome em ordem numérica:
- `lorenzo-1.jpg`, `lorenzo-2.jpg`, etc.
- `isabela-1.jpg`, `isabela-2.jpg`, etc.
- `tay-1.jpg`, `tay-2.jpg`, etc.
- `zack-1.jpg`, `zack-2.jpg`, etc.

## 🔧 **Como o Sistema Funciona:**

### **1. Hooks Atualizados:**

```tsx
import { useAvatarImage, useAvatarPortfolio, useHeroVideo } from '@/hooks/useMediaFiles';

// Buscar imagem principal do avatar
const { avatarImage } = useAvatarImage('lorenzo'); // Busca avatar-1.jpg

// Buscar galeria completa do avatar
const { mediaFiles: portfolio } = useAvatarPortfolio('lorenzo'); // Busca lorenzo-1.jpg, lorenzo-2.jpg, etc.

// Buscar vídeo de fundo
const { heroVideo } = useHeroVideo(); // Busca background-video.mp4
```

### **2. Mapeamento Automático:**

O sistema mapeia automaticamente:
```tsx
const avatarMap = {
  'lorenzo': 'avatar-1',
  'isabela': 'avatar-2', 
  'tay': 'avatar-3',
  'zack': 'avatar-4'
};
```

### **3. Componentes Prontos:**

#### **SquadSection** (✅ Atualizado):
```tsx
// Agora usa avatarMockData e busca as imagens corretas do Supabase
const { mediaFiles: avatarImages } = useAvatarImages();
const getAvatarImage = (avatar_name) => {
  const targetName = avatarMap[avatar_name];
  return avatarImages.find(img => img.name.includes(targetName))?.url;
};
```

#### **AvatarGallery** (✅ Novo Componente):
```tsx
import { AvatarGallery } from '@/components/AvatarGallery';

// Exibe todas as imagens do portfolio de um avatar
<AvatarGallery avatarName="lorenzo" title="Portfólio Lorenzo" />
```

#### **HeroSection** (✅ Atualizado):
```tsx
// Busca o vídeo background-video.mp4 automaticamente
const { heroVideo } = useHeroVideo();
```

### **4. avatarData.ts** (✅ Atualizado):

```tsx
import { useAvatarData } from '@/lib/avatarData';

// Hook completo que retorna dados + imagens
const { avatar, avatarImage, portfolioImages, loading } = useAvatarData('lorenzo-bellini');
```

## 🚀 **Como Usar nos Componentes:**

### **1. Imagem Principal do Avatar:**
```tsx
import { MediaImage } from '@/components/media';
import { useAvatarImage } from '@/hooks/useMediaFiles';

function AvatarCard({ avatarName }) {
  const { avatarImage, loading } = useAvatarImage(avatarName);
  
  return (
    <MediaImage 
      src={avatarImage?.url}
      alt={`Avatar ${avatarName}`}
      className="w-full h-full object-cover"
    />
  );
}
```

### **2. Galeria Completa:**
```tsx
import { AvatarGallery } from '@/components/AvatarGallery';

function AvatarProfile({ avatarName }) {
  return (
    <AvatarGallery 
      avatarName={avatarName}
      title="Portfólio Completo"
      className="py-12"
    />
  );
}
```

### **3. Vídeo de Background:**
```tsx
import { MediaVideo } from '@/components/media';
import { useHeroVideo } from '@/hooks/useMediaFiles';

function HeroBackground() {
  const { heroVideo, loading } = useHeroVideo();
  
  return (
    <MediaVideo
      src={heroVideo?.url}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
    />
  );
}
```

## 🔄 **Estrutura de Categorias no Supabase:**

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| `avatar` | Imagens principais dos avatares | avatar-1.jpg, avatar-2.jpg |
| `hero` | Vídeos de background | background-video.mp4 |
| `gallery` | Portfolio/galeria por avatar | lorenzo-1.jpg, isabela-1.jpg |
| `carousel` | Imagens do carrossel | lorenzo-carro.png |
| `branding` | Logos e elementos da marca | logo.png |

## ⚡ **Sistema de Cache:**

- **Cache automático** de 5 minutos para melhor performance
- **Refetch manual** disponível nos hooks
- **Loading states** em todos os componentes

## 🎯 **Status dos Componentes:**

- ✅ **HeroSection** - Atualizado para usar background-video.mp4
- ✅ **SquadSection** - Atualizado para usar avatar-1, avatar-2, etc.
- ✅ **avatarData.ts** - Integrado com hooks do Supabase
- ✅ **AvatarGallery** - Novo componente para portfolios
- ✅ **Hooks** - Mapeamento correto para avatar-1, avatar-2, etc.

## 🔧 **Para Usar em Novos Componentes:**

```tsx
// 1. Import dos hooks
import { useAvatarImage, useAvatarPortfolio } from '@/hooks/useMediaFiles';

// 2. No componente
const { avatarImage } = useAvatarImage('lorenzo'); // → avatar-1.jpg
const { mediaFiles: portfolio } = useAvatarPortfolio('lorenzo'); // → lorenzo-1.jpg, lorenzo-2.jpg...

// 3. Renderizar
<img src={avatarImage?.url} alt="Lorenzo" />
```

O sistema agora está totalmente integrado e busca as imagens diretamente da coluna `url` do Supabase, com cache automático e loading states! 🚀