export const navContents = [
    {name:'HOME', link:'/'},
    {name:'EXPERIENCE', link:'/experience'},
    {name:'HOW IT WORKS', link:'/how-it-works'},
    {name:'WHY US', link:'/why-us'},
    {name:'CONTACT US', link:'/contact-us'},
]


export const pathScrollThresholds: Record<string, number> = {
  "/": 0.648,
  "/experience": 0.156,
  "/how-it-works": 0.7,
  "/why-us": 0.6,
  "/contact-us": 0.5,
  "/sign-in": -1,
  "/sign-up": -1,
  "/forgot-password": -1,
  "/questionnaire" : -1
};

