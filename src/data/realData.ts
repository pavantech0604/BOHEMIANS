export const REAL_PHOTOS = {
  EXTERIOR: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFzhxQKrAaC3yWcU2Md2et8fF50Gp9ycOt9qNvcG5AO4MLV8Ilzr049Lp4EJA2eVCbmVLvmFW6nISjNCR_M__DdAsWEgQmfuWdmfZLBkcopI3CjqDGsccN7lmXrCwrxfWatwXlCbU0giikc=s2048",
  INTERIOR_VIBE: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH-H2AtP_Edmgv-ssysn1EnnmSUowuxoHkXw15BNuvRNkXO9oIQBwC5p043nVpKoXWa3b4rO8h7dz9w6XhTSCOp9w4b1sveXP0dIndlfGIpglaV3ptdo34-mzxG9SBjiQexUUVc=s2048",
  CHARCOAL_DIM_SUMS: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEHyDYx-3yaS6ph02TeSvtwzNDZV3hG40DJYbo9zG0yzpx_begOUZDm3deeXLu0c9YEO_x50iZgqxne6LkqwM8NxnLeb8sOHJjE9hJOSJhQ-t5P8uSRWtS4w74YLeUMoW24CM-7vxkAMwIA=s2048",
  RAILWAY_MUTTON_CURRY: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAECZBqbWzogApJUeELBCjm9BnNPv02LTClu_foocgQ2ZfsXug2LPF-2CaiWXNVyjiGsX7o3K_pariroA1l1pdwWNDfYGY3zfwFyPsQjd0lEFyyoqR2n0fgzbcJXsAEbn4ECh898=s2048",
  AAM_PANNA_COCKTAIL: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHElQuqHJhmBIpTxfr99zksZDsfztncD89OQ0zJ_yf3AxiHm4QJZOMWzqb_pkuEaZ_Up0PXeh1jybXspI2zhewufcXQiBp40h0s0yrsAFAz85XMeW_ERyryKht9xEfcMx-_8ric=s2048",
  FUSION_TACOS: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFfMMvCOlYmXvtoGnmy0y1ambes3me5eoZILmfAAUbLyKfwV5QpLRUsWLtRw8a6avr-h4NKUf_XTNbqM6dQ5enXRR7kZp_xPF6nvBrdQ9-KFaDMLZRZe0b0KuBcXpMFOoMLRKH1=s2048",
  MALABAR_PLATTER: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHNKFlBII4HbAwEGW5hUQFZM2LWAaeH6XKO3tzyvrhgz-eWM8Fl4gVhlE6IU2XWI2aHBek0qxL51ImwvAkXjwyFkgJA3sWUb9W_mOeH_d-WIKjb8rJmN3dPdINygy0OWtBN1JZwsR2neAg=s2048"
};

export const REAL_REVIEWS = [
  {
    author: "Ameet Kamath",
    text: "It's an old bungalow converted to a restaurant and bar which is very cute. The Aam Pannh cocktail was superb. The karaoke host provided some really good warm up and entertainment. Good for groups or even for a date.",
    rating: 5
  },
  {
    author: "Vinuju Nizar Yousuf (Vinu)",
    text: "Great ambiance. Pet friendly place. Very earthy vibes ! Food is good. The Kerala Fried Chicken is really good. Do come here for the ambiance, you would love it ! Very chilled out.",
    rating: 5
  },
  {
    author: "Nishant Nigam",
    text: "Food variety is great, vibe too good, Cozy, lively, happy. The restaurant has a cozy vibe and was very clean, (I want to break free kinda vibes justifies the name: Bohemians). Highly recommend!",
    rating: 5
  }
];

export const REAL_MENU = [
  {
    category: 'Small Plates',
    items: [
      { name: 'Charcoal Dim Sums', price: '₹425', desc: 'Signature black-skinned prawn/veg dumplings with chili oil.', img: REAL_PHOTOS.CHARCOAL_DIM_SUMS },
      { name: 'Kerala Fried Chicken', price: '₹395', desc: 'Crispy, spicy traditional fried chicken with curry leaves.', img: REAL_PHOTOS.MALABAR_PLATTER },
      { name: 'Lambda Kibbeh', price: '₹475', desc: 'Mediterranean spiced minced meat shells with hummus dip.', img: REAL_PHOTOS.FUSION_TACOS }
    ]
  },
  {
    category: 'Mains',
    items: [
      { name: 'Railway Mutton Curry', price: '₹595', desc: 'The legendary slow-cooked mutton curry with potatoes.', img: REAL_PHOTOS.RAILWAY_MUTTON_CURRY },
      { name: 'Malabar Fish Curry', price: '₹550', desc: 'Authentic coconut-based fish curry served with steamed rice.', img: REAL_PHOTOS.MALABAR_PLATTER },
      { name: 'Massaman Curry', price: '₹525', desc: 'Rich, fragrant Thai curry with roasted peanuts and silk-soft meat.', img: REAL_PHOTOS.INTERIOR_VIBE }
    ]
  },
  {
    category: 'Cocktails',
    items: [
      { name: 'Aam Panna Kick', price: '₹450', desc: 'Vodka-based infusion with traditional green mango pulp.', img: REAL_PHOTOS.AAM_PANNA_COCKTAIL }
    ]
  }
];
