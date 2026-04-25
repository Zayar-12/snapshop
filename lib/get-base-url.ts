export const getBaseUrl = () => {
  // Browser (Client) မှာဆိုရင် window.location.origin ကို ယူမယ်
  if (typeof window !== "undefined") return window.location.origin;

  // Vercel (Production) မှာဆိုရင် Vercel URL ကို ယူမယ်
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Local development မှာဆိုရင် localhost:3000 ကို ယူမယ်
  return "http://localhost:3000";
};