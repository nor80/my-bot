const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");

const bot = new Telegraf("7647528885:AAGWFOQpTnpOnoZnvezMGczFmCQ9hyukFt0");

bot.start((ctx) => {
  ctx.reply("Bienvenue ! Envoie-moi le nom d'un anime et je t'enverrai son synopsis ");
});

bot.on("text", async (ctx) => {
  const query = ctx.message.text;

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
    const data = await response.json();

    if (data.data.length === 0) {
      ctx.reply("Aucun anime trouvé avec ce nom 😢");
      return;
    }

    const anime = data.data[0];

    const reply = `
"Titre :" ${anime.title}
"Synopsis :" ${anime.synopsis ? anime.synopsis.substring(0, 1000) + "..." : "Aucun synopsis"}
"Type :" ${anime.type}
"Score :" ${anime.score ?? "Non noté"}
"Episodes :" ${anime.episodes ?? "Inconnu"}
"Lien MAL :" ${anime.url}
    `;

    ctx.reply(reply);
  } catch (error) {
    console.error(error);
    ctx.reply("Une erreur est survenue 😕");
  }
});

bot.launch();

console.log("Bot en cours d'exécution...");
