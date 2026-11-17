import { AppStoreData } from '@/types';

export const initialStoreData: AppStoreData = {
  config: {
    name: "Churrasco Colômbia Restaurante",
    slogan: "Cardápio do Dia a Dia e Churrasco na Brasa com o melhor sabor",
    logo: "/logo.jpeg",
    phone: "+55 (21) 99006-4843",
    whatsapp: "5521990064843",
    address: "Rua Patagônia, 53 - Penha",
    city: "Rio de Janeiro - RJ, 21020-320",
    openingHours: "Terça a Domingo: 10:30 às 15:30 (Segunda fechado)",
    isOpen: true,
    currency: "BRL",
    currencySymbol: "R$",
    deliveryFee: 7.00,
    minOrder: 25.00,
    estimatedDeliveryTime: "30 - 45 min",
    paymentMethods: [
      "Pix",
      "Cartão de Débito / Crédito",
      "Dinheiro"
    ],
    social: {
      instagram: "https://www.instagram.com/churrasco_colombiano?vrfl=YWJkYTdvZ2dmdXNw&utm_source=qr",
      zesto: "https://pedido.zesto.menu/pt-BR/store/churrasco-colombia/xulufimrsmrkvjmvk"
    }
  },
  seo: {
    metaTitle: "Churrasco Colômbia Restaurante | Cardápio Oficial & Delivery Penha RJ",
    metaDescription: "Cardápio oficial do Churrasco Colômbia na Penha RJ. Picanha R$ 75, Churrasco misto R$ 70, Carne de sol com baião R$ 68, Contra filé R$ 65, Frango assado, quentinhas do dia a dia e bebidas geladas. Peça pelo WhatsApp ou baixe o App APK!",
    keywords: "churrasco colombia, cardapio churrasco colombia, penha rj, picanha na brasa, churrasco misto, carne de sol baiao, quentinhas penha, delivery churrasco rio de janeiro, apk churrasco colombia",
    canonicalUrl: "http://localhost:3000",
    googleAnalyticsId: "G-CHURRASCO01",
    googleAdsId: "AW-123456789",
    facebookPixelId: "PIXEL-987654321",
    conversionEventName: "pedido_whatsapp_enviado"
  },
  promos: [
    {
      id: "promo-picanha",
      title: "Picanha na Brasa com Guarnição Completa",
      subtitle: "Arroz à sua escolha, batata frita ou aipim, molho à campanha, farofa e feijão",
      badge: "Corte Nobre",
      image: "/images/100gmCarne.jpeg",
      link: "#pratos-feitos"
    },
    {
      id: "promo-churrasco-misto",
      title: "Churrasco Misto Especial na Brasa",
      subtitle: "Mix nobre de carnes grelhadas no carvão: bovina, linguiça toscana e frango",
      badge: "Mais Pedido",
      image: "/images/churrascomixto.jpeg",
      link: "#pratos-feitos"
    },
    {
      id: "promo-carne-sol",
      title: "Carne de Sol com Baião de Dois",
      subtitle: "Tradicional com queijo coalho, batata frita ou aipim, farofa e vinagrete",
      badge: "Especial da Casa",
      image: "/images/Carnedesolcombaião.jpeg",
      link: "#pratos-feitos"
    },
    {
      id: "promo-frango-fds",
      title: "Frango Assado Especial (Sábado e Domingo)",
      subtitle: "Opção com batata e farofa R$ 45,00 ou com +3 linguiças toscanas por R$ 50,00",
      badge: "Fim de Semana",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=80",
      link: "#frango-assado"
    }
  ],
  categories: [
    { id: "pratos-feitos", name: "Pratos Feitos (Menu 3)", order: 1, active: true },
    { id: "churrasco-dia-a-dia", name: "Churrasco com Guarnição (Menu 1)", order: 2, active: true },
    { id: "quentinhas", name: "Quentinhas (Menu 1)", order: 3, active: true },
    { id: "frango-assado", name: "Frango Assado (Sáb e Dom)", order: 4, active: true },
    { id: "outros-porcoes", name: "Outros & Espetos (Menu 2)", order: 5, active: true },
    { id: "bebidas", name: "Bebidas (Menu 2)", order: 6, active: true }
  ],
  products: [
    // =========================================================================
    // 1. PRATOS FEITOS (MENU 3 - Acompanha arroz, feijão, batata frita ou aipim, farofa, molho)
    // Preços atualizados via Rafaela Cuartas / Menu 3
    // =========================================================================
    {
      id: "prod-picanha-75",
      name: "Picanha na Brasa",
      categoryId: "pratos-feitos",
      description: "Generosa porção de picanha maturada fatiada e preparada na brasa. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho à campanha.",
      price: 75.00,
      image: "/images/100gmCarne.jpeg",
      badge: "Corte Nobre",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2",
            "Baião e Piamontese (não vai feijão)"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        },
        {
          name: "3. Ponto da carne",
          choices: ["Ao Ponto (Suculenta)", "Ao Ponto para Mais", "Bem Passada"]
        }
      ]
    },
    {
      id: "prod-churrasco-misto-70",
      name: "Churrasco Misto",
      categoryId: "pratos-feitos",
      description: "Mix completo de carnes grelhadas na brasa: carne bovina selecionada, linguiça toscana e frango suculento. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho à campanha.",
      price: 70.00,
      image: "/images/churrascomixto.jpeg",
      badge: "Mais Pedido",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2",
            "Baião e Piamontese (não vai feijão)"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        }
      ]
    },
    {
      id: "prod-contra-file-65",
      name: "Contra Filé",
      categoryId: "pratos-feitos",
      description: "Corte nobre e macio de contra filé assado na brasa. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho à campanha.",
      price: 65.00,
      image: "/images/100gmCarne.jpeg",
      badge: "Clássico",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2",
            "Baião e Piamontese (não vai feijão)"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        },
        {
          name: "3. Ponto da carne",
          choices: ["Ao Ponto (Suculenta)", "Ao Ponto para Mais", "Bem Passada"]
        }
      ]
    },
    {
      id: "prod-contra-file-parmegiana-70",
      name: "Contra Filé Parmegiana",
      categoryId: "pratos-feitos",
      description: "Bife de contra filé empanado crocante coberto com molho especial de tomate e queijo gratinado. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho.",
      price: 70.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      badge: "Gratinado",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2",
            "Baião e Piamontese (não vai feijão)"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        }
      ]
    },
    {
      id: "prod-carne-de-sol-baiao-68",
      name: "Carne de Sol com Baião",
      categoryId: "pratos-feitos",
      description: "Deliciosa carne de sol acebolada bem macia, acompanhada de baião de dois tradicional com queijo coalho, batata frita ou aipim, farofa e molho à campanha.",
      price: 68.00,
      image: "/images/Carnedesolcombaião.jpeg",
      badge: "Especial da Casa",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Baião de 2",
            "Baião e Piamontese (não vai feijão)",
            "Arroz Branco",
            "Arroz Maluco"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        }
      ]
    },
    {
      id: "prod-file-de-peixe-65",
      name: "Filé de Peixe",
      categoryId: "pratos-feitos",
      description: "Filé de peixe crocante empanado e dourado servido com fatias de limão fresco. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho à campanha.",
      price: 65.00,
      image: "/images/filetedepeixee.jpeg",
      badge: "Peixe Fresco",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        }
      ]
    },
    {
      id: "prod-file-frango-grelhado-55",
      name: "Filé de Frango Grelhado",
      categoryId: "pratos-feitos",
      description: "Filé de peito de frango grelhado bem temperado. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho à campanha.",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        }
      ]
    },
    {
      id: "prod-frango-parmegiana-60",
      name: "Frango a Parmegiana",
      categoryId: "pratos-feitos",
      description: "Filé de peito de frango empanado crocante, coberto com molho artesanal de tomates e queijo gratinado. Acompanha arroz à sua escolha, feijão, batata frita ou aipim, farofa e molho.",
      price: 60.00,
      image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80",
      available: true,
      options: [
        {
          name: "1. Escolha seu arroz",
          choices: [
            "Arroz Branco",
            "Arroz de Brócolis",
            "Arroz Maluco",
            "Arroz Piamontese",
            "Baião de 2"
          ]
        },
        {
          name: "2. Escolha aipim ou batata",
          choices: ["Batata Frita", "Aipim Frito"]
        }
      ]
    },
    {
      id: "prod-strogonoff-frango-prato",
      name: "Strogonoff de Frango",
      categoryId: "pratos-feitos",
      description: "Strogonoff de filé de frango em cubos com molho cremoso aveludado da casa. Acompanha arroz branco moldado e batata frita crocante.",
      price: 26.00,
      image: "/images/Strogonoffdefrango.jpeg",
      badge: "Saboroso",
      available: true
    },

    // =========================================================================
    // 2. CARDÁPIO DO DIA A DIA - CHURRASCO COM GUARNIÇÃO (MENU 1)
    // Guarnição: arroz, molho à campanha, batata frita, maionese, farofa
    // =========================================================================
    {
      id: "prod-churrasco-pequena-25",
      name: "Churrasco com Guarnição - Pequena",
      categoryId: "churrasco-dia-a-dia",
      description: "Porção individual perfeita. Acompanha guarnição completa: arroz branco, molho à campanha, batata frita, maionese e farofa.",
      price: 25.00,
      image: "/images/churrascomixto.jpeg",
      badge: "Individual",
      available: true,
      options: [
        {
          name: "Escolha seu churrasco",
          choices: ["Misto (carne, linguiça, frango e porco)", "Só carne"]
        }
      ]
    },
    {
      id: "prod-churrasco-media-30",
      name: "Churrasco com Guarnição - Média",
      categoryId: "churrasco-dia-a-dia",
      description: "Porção média bem servida. Acompanha guarnição completa: arroz branco, molho à campanha, batata frita, maionese e farofa.",
      price: 30.00,
      image: "/images/churrascomixto.jpeg",
      badge: "Popular",
      available: true,
      options: [
        {
          name: "Escolha seu churrasco",
          choices: ["Misto (carne, linguiça, frango e porco)", "Só carne"]
        }
      ]
    },
    {
      id: "prod-churrasco-grande-37",
      name: "Churrasco com Guarnição - Grande",
      categoryId: "churrasco-dia-a-dia",
      description: "Porção grande reforçada para quem tem muita fome ou para compartilhar. Acompanha guarnição completa: arroz branco, molho à campanha, batata frita, maionese e farofa.",
      price: 37.00,
      image: "/images/churrascomixto.jpeg",
      badge: "Grande",
      available: true,
      options: [
        {
          name: "Escolha seu churrasco",
          choices: ["Misto (carne, linguiça, frango e porco)", "Só carne"]
        }
      ]
    },

    // =========================================================================
    // 3. QUENTINHAS (MENU 1)
    // Acompanha: arroz, feijão, batata frita, molho à campanha, farofa e salada
    // =========================================================================
    {
      id: "prod-quentinha-peixe-2799",
      name: "Quentinha Filé de Peixe",
      categoryId: "quentinhas",
      description: "Filé de peixe crocante com guarnição de quentinha: arroz, feijão preto, batata frita, molho à campanha, farofa e salada.",
      price: 27.99,
      image: "/images/filetedepeixee.jpeg",
      available: true
    },
    {
      id: "prod-quentinha-frango-parmegiana-2999",
      name: "Quentinha Frango a Parmegiana",
      categoryId: "quentinhas",
      description: "Filé de frango à parmegiana gratinado. Acompanha arroz, feijão preto, batata frita, molho à campanha, farofa e salada.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80",
      available: true
    },
    {
      id: "prod-quentinha-frango-grelhado-2699",
      name: "Quentinha Frango Grelhado",
      categoryId: "quentinhas",
      description: "Filé de peito de frango grelhado macio. Acompanha arroz, feijão preto, batata frita, molho à campanha, farofa e salada.",
      price: 26.99,
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80",
      available: true
    },
    {
      id: "prod-quentinha-bife-acebolado-2999",
      name: "Quentinha Bife Acebolado",
      categoryId: "quentinhas",
      description: "Bife macio grelhado com cebolas douradas na chapa. Acompanha arroz, feijão preto, batata frita, molho à campanha, farofa e salada.",
      price: 29.99,
      image: "/images/100gmCarne.jpeg",
      available: true
    },

    // =========================================================================
    // 4. FRANGO ASSADO (SÁBADO E DOMINGO) - MENU 2 & MENSAGEM WHATSAPP
    // =========================================================================
    {
      id: "prod-frango-fds-45",
      name: "Frango Assado com Batata e Farofa",
      categoryId: "frango-assado",
      description: "Frango inteiro assado na televisão de cachorro (giratório), dourado e crocante por fora, muito suculento por dentro. Acompanha batatas coradas e farofa da casa.",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
      badge: "Sábado e Domingo",
      available: true
    },
    {
      id: "prod-frango-fds-lingui-50",
      name: "Frango Assado Batata Farofa + 3 Linguiças",
      categoryId: "frango-assado",
      description: "Frango inteiro assado na brasa acompanhado de batatas coradas, farofa especial e 3 linguiças toscanas suculentas.",
      price: 50.00,
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
      badge: "Combo Especial FDS",
      available: true
    },

    // =========================================================================
    // 5. OUTROS & ESPETOS (MENU 2)
    // =========================================================================
    {
      id: "prod-pao-de-alho-8",
      name: "Pão de Alho",
      categoryId: "outros-porcoes",
      description: "Pão de alho na brasa baguete fatiado recheado com pasta de alho e ervas.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&q=80",
      available: true
    },
    {
      id: "prod-queijo-coalho-8",
      name: "Queijo Coalho",
      categoryId: "outros-porcoes",
      description: "Espeto de queijo coalho assado no ponto certo na brasa.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      available: true
    },
    {
      id: "prod-espeto-cafta-8",
      name: "Espeto de Cafta",
      categoryId: "outros-porcoes",
      description: "Espeto de cafta artesanal de carne nobre temperada com especiarias.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      available: true
    },
    {
      id: "prod-100g-misto-10",
      name: "100g Misto",
      categoryId: "outros-porcoes",
      description: "Porção de 100g de churrasco misto na brasa (carne bovina, linguiça e frango).",
      price: 10.00,
      image: "/images/churrascomixto.jpeg",
      available: true
    },
    {
      id: "prod-100g-so-carne-12",
      name: "100g Só Carne",
      categoryId: "outros-porcoes",
      description: "Porção de 100g somente de carne bovina nobre assada na brasa de carvão.",
      price: 12.00,
      image: "/images/100gmCarne.jpeg",
      available: true
    },
    {
      id: "prod-feijao-peq-7",
      name: "Feijão Preto (Pequeno)",
      categoryId: "outros-porcoes",
      description: "Porção pequena de feijão preto carioca bem temperado.",
      price: 7.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      available: true
    },
    {
      id: "prod-feijao-med-12",
      name: "Feijão Preto (Médio)",
      categoryId: "outros-porcoes",
      description: "Porção média de feijão preto carioca temperado.",
      price: 12.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      available: true
    },
    {
      id: "prod-feijao-gde-20",
      name: "Feijão de... (Grande)",
      categoryId: "outros-porcoes",
      description: "Porção grande de feijão temperado com carnes.",
      price: 20.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      available: true
    },
    {
      id: "prod-salpicao-menu2",
      name: "Salpicão",
      categoryId: "outros-porcoes",
      description: "Salpicão tradicional da casa com frango desfiado, maionese, milho e batata palha. Disponível às sextas, sábados e domingos.",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
      badge: "Sexta, Sáb e Dom",
      available: true
    },

    // =========================================================================
    // 6. BEBIDAS (MENU 2)
    // =========================================================================
    {
      id: "prod-refrigerante-lata-7",
      name: "Refrigerante Lata",
      categoryId: "bebidas",
      description: "Lata 350ml gelada: Coca-Cola, Guaraná Antarctica ou Fanta.",
      price: 7.00,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
      available: true,
      options: [
        {
          name: "Sabor",
          choices: ["Coca-Cola", "Coca-Cola Zero", "Guaraná Antarctica", "Fanta Laranja", "Sprite"]
        }
      ]
    },
    {
      id: "prod-coca-600ml-10",
      name: "Coca-Cola 600ml",
      categoryId: "bebidas",
      description: "Garrafa plástica de 600ml gelada.",
      price: 10.00,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
      available: true
    },
    {
      id: "prod-h2o-8",
      name: "H2O Limão ou Limoneto",
      categoryId: "bebidas",
      description: "Garrafa de H2OH! 500ml gelada.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80",
      available: true,
      options: [
        {
          name: "Sabor",
          choices: ["H2O Limão", "H2O Limoneto"]
        }
      ]
    },
    {
      id: "prod-guaraviton-8",
      name: "Guaraviton",
      categoryId: "bebidas",
      description: "Garrafa de GuaraViton 500ml gelada.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      available: true
    },
    {
      id: "prod-guaravita-3",
      name: "Guaravita",
      categoryId: "bebidas",
      description: "Copo de Guaravita tradicional 290ml bem gelado.",
      price: 3.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      available: true
    },
    {
      id: "prod-coca-2l-16",
      name: "Coca-Cola 2L",
      categoryId: "bebidas",
      description: "Garrafa de Coca-Cola 2 litros gelada.",
      price: 16.00,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
      available: true,
      options: [
        {
          name: "Opção",
          choices: ["Coca-Cola Original 2L", "Coca-Cola Zero 2L"]
        }
      ]
    },
    {
      id: "prod-refrigerante-15l-14",
      name: "Refrigerante 1,5L",
      categoryId: "bebidas",
      description: "Garrafa de refrigerante 1,5 litros gelada.",
      price: 14.00,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
      available: true,
      options: [
        {
          name: "Sabor",
          choices: ["Guaraná Antarctica 1,5L", "Fanta 1,5L"]
        }
      ]
    },
    {
      id: "prod-suco-300ml-9",
      name: "Suco 300ml",
      categoryId: "bebidas",
      description: "Copo de suco natural da fruta 300ml preparado na hora.",
      price: 9.00,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80",
      available: true,
      options: [
        {
          name: "Sabor",
          choices: ["Laranja", "Acerola", "Maracujá", "Abacaxi", "Manga"]
        }
      ]
    },
    {
      id: "prod-jarra-suco-1l-27",
      name: "Jarra de Suco 1L",
      categoryId: "bebidas",
      description: "Jarra de suco natural 1 litro bem gelada.",
      price: 27.00,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80",
      available: true,
      options: [
        {
          name: "Sabor",
          choices: ["Laranja", "Acerola", "Maracujá", "Abacaxi", "Manga"]
        }
      ]
    },
    {
      id: "prod-jarra-suco-15l-33",
      name: "Jarra de Suco 1,5L",
      categoryId: "bebidas",
      description: "Jarra família de suco natural 1,5 litros bem gelada.",
      price: 33.00,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80",
      available: true,
      options: [
        {
          name: "Sabor",
          choices: ["Laranja", "Acerola", "Maracujá", "Abacaxi", "Manga"]
        }
      ]
    },
    {
      id: "prod-heineken-10",
      name: "Heineken",
      categoryId: "bebidas",
      description: "Cerveja Heineken Long Neck 330ml gelada.",
      price: 10.00,
      image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=800&q=80",
      available: true
    },
    {
      id: "prod-latao-8",
      name: "Latão 473ml",
      categoryId: "bebidas",
      description: "Cerveja latão 473ml estupidamente gelada: Brahma ou Antarctica.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
      available: true,
      options: [
        {
          name: "Marca",
          choices: ["Brahma Chopp 473ml", "Antarctica 473ml"]
        }
      ]
    },
    {
      id: "prod-agua-com-gas-4",
      name: "Água com Gás",
      categoryId: "bebidas",
      description: "Garrafa de água mineral com gás 500ml gelada.",
      price: 4.00,
      image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&q=80",
      available: true
    },
    {
      id: "prod-agua-sem-gas-4",
      name: "Água sem Gás",
      categoryId: "bebidas",
      description: "Garrafa de água mineral natural 500ml gelada.",
      price: 4.00,
      image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&q=80",
      available: true
    },
    {
      id: "prod-chopp-vinho-8",
      name: "Chopp de Vinho",
      categoryId: "bebidas",
      description: "Chopp de vinho artesanal gelado no copo 300ml.",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
      available: true
    }
  ],
  orders: []
};
