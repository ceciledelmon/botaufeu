var request = require("request");
var keys = require('./api_keys/slack_keys');

var bot_text;

// List of restaurants and Google Maps urls as JSON
var lunchSpots = [
    {
        "location": "https://www.google.com/maps/place/Carrefour+market/@48.8372738,2.3528205,17z/data=!4m5!3m4!1s0x0:0xfe0d18a0d2bbf727!8m2!3d48.8372738!4d2.3542298?hl=fr",
        "restaurant": "Team Carrefour",
				"details": "Today's menu is <http://www.carrefour.fr/magasin/market-paris-saint-marcel>."
    },
    {
        "location": "https://www.google.fr/maps/place/127+Rue+Mouffetard,+75005+Paris/@48.8401415,2.3476588,17z/data=!3m1!4b1!4m5!3m4!1s0x47e671ec16b831f1:0x1690f8bb514b6d0a!8m2!3d48.8401415!4d2.3498475",
        "restaurant": "Bocamexa",
        "details": "Restaurant de taco et autres spécialités mexicaines <http://www.bocamexa.com/restaurant-paris-mouffetard/>."
    },
    {
        "location": "https://www.google.fr/maps/place/6+Rue+Michel+Peter,+75013+Paris/@48.8366493,2.3509556,17z/data=!3m1!4b1!4m5!3m4!1s0x47e671ed45bb08d1:0x5265d96513b9f2eb!8m2!3d48.8366493!4d2.3531443",
        "restaurant": "Les 3 cèdres :deciduous_tree: #libanais",
				"details": "Le menu de la chef <http://www.les-3-cedres.fr/menu.html>"
    },
    {
        "location": "https://www.google.fr/maps/place/Canteen+Bus+Gobelins/@48.83394,2.3535017,15z/data=!4m2!3m1!1s0x0:0x81c853439023bbd6?sa=X&ved=0ahUKEwiI19Dc7-HPAhXKuBoKHawnC-gQ_BIIfzAK",
        "restaurant": "Canteen bus",
        "details": "Ici le menu <http://www.canteenbusgobelins.fr/menus-carte/>"
    },
    {
        "location": "https://www.google.com/maps/place/Subway/@48.8334378,2.3529363,18z/data=!4m5!3m4!1s0x0:0x698d78613bb587cd!8m2!3d48.8334378!4d2.3538449?hl=fr",
        "restaurant": "Sub-Sub-Subway",
        "details": "Pour toi, je te donne même la carte <http://www.subwayfrance.fr/la-carte/les-subs>"
    },
    {
        "location": "https://www.google.fr/maps/place/BAGEL+CORNER+GOBELINS/@48.8329832,2.3541551,15z/data=!4m5!3m4!1s0x0:0x7a6c9fdf34523ed7!8m2!3d48.8329832!4d2.3541551",
        "restaurant": "Bagel Corner",
        "details": "Tu peux même commander en ligne et pour des groupes ici <http://bagelcorner.fr/>"
    },
    {
        "location": "https://www.google.fr/maps/place/Yoyo+Ramen/@48.8375307,2.3491873,16.08z/data=!4m5!3m4!1s0x0:0x73a859ea8f59a10b!8m2!3d48.837195!4d2.349764",
        "restaurant": "Yoyo ramen",
        "details": "Tu veux un avis ? Voilà <https://www.tripadvisor.fr/Restaurant_Review-g187147-d7367631-Reviews-Yoyo_Ramen-Paris_Ile_de_France.html>"
    },
    {
        "location": "https://www.google.fr/maps/place/2+Boulevard+Arago,+75013+Paris/@48.836578,2.3502549,18.69z/data=!4m5!3m4!1s0x47e671ecdab46d97:0x9ef296d4e5f6e96e!8m2!3d48.836658!4d2.350581",
        "restaurant": "Fat Macdo",
        "details": "T'as cru que tu allais avoir le menu ? <https://www.restaurants.mcdonalds.fr/mcdonalds-paris-gobelins>"
    },
    {
        "location": "https://www.google.fr/maps/place/Sushi+Gobelins/@48.8371608,2.3523726,15z/data=!4m2!3m1!1s0x0:0x5a32fc2efc53bba3?sa=X&ved=0ahUKEwiQvImphuTPAhVGXBoKHTL0A-cQ_BIIdzAK",
        "restaurant": "Sushis",
        "details": "Website of the year <http://www.sushigobelins.fr/>"
    },
    {
        "location": "https://www.google.fr/maps/place/Noo%C3%AF+Dum%C3%A9ril/@48.8360829,2.3584047,15z/data=!4m2!3m1!1s0x0:0xeca4c38237edbbe3?sa=X&ved=0ahUKEwitgeGKhuTPAhXJmBoKHcbcAucQ_BIIdTAK",
        "restaurant": "Nooï",
        "details": "Des pates."
    },
    {
        "location": "https://www.google.fr/maps/place/Chez+Van/@48.8373653,2.3544131,15z/data=!4m5!3m4!1s0x0:0xbbc693e310d23d9!8m2!3d48.8373653!4d2.3544131",
        "restaurant": "Chez van, chinois à semi-volonté",
        "details": "Voici un aperçu <https://www.lespetitestables.com/restaurant/chez-van/>"
    },
    {
        "location": "https://www.google.fr/maps/place/Boulangerie+l'entracte/@48.837811,2.3519924,17z/data=!4m13!1m7!3m6!1s0x47e671f282a85311:0xced1a1308d9e77e4!2s1+Rue+Scipion,+75005+Paris!3b1!8m2!3d48.837811!4d2.3541811!3m4!1s0x47e671f29d1e2c1f:0xabd80d0c44b1bb41!8m2!3d48.8377303!4d2.3541632",
        "restaurant": "Boulangerie d'en face",
        "details": "un jambon beurre mdam !"
    },
    {
        "location": "https://www.google.fr/maps/place/Chez+Neung/@48.8377547,2.3540166,15z/data=!4m2!3m1!1s0x0:0x6470454a8e2845c0?sa=X&sqi=2&ved=0ahUKEwjpwu75ieTPAhXKuhoKHcn8CmIQ_BIIdDAK",
        "restaurant": "Thaï - Chez Neung",
        "details": "Se mange avec des baguettes ou avec les pieds"
    },
    {
        "location": "https://www.google.fr/maps/@48.8360715,2.3529738,3a,75y,147.16h,90t/data=!3m6!1e1!3m4!1s6g-m7xIqJRoNeOM1R2fpvA!2e0!7i13312!8i6656",
        "restaurant": "Coreen et vietnamien",
        "details": "C'est bon."
    },
    {
        "location": "https://www.google.fr/maps/place/Picard/@48.837897,2.35444,15z/data=!4m2!3m1!1s0x0:0xd55e085b0cf6c0f?sa=X&ved=0ahUKEwjanqrFjeTPAhVEORoKHYWjAOAQ_BIIdDAK",
        "restaurant": "Picard Picard, ça c'est Picard"
    },
    {
        "location": "https://www.google.fr/maps/place/D%C3%A9lices+de+Shandong/@48.8370306,2.3569881,17z/data=!4m13!1m7!3m6!1s0x47e671f368732cd1:0xa1f9ffeabbd1fb99!2s88+Boulevard+de+l'H%C3%B4pital,+75013+Paris!3b1!8m2!3d48.8370306!4d2.3591768!3m4!1s0x47e671f35e406461:0x30d5c1f51a767642!8m2!3d48.8370179!4d2.3592154",
        "restaurant": "L'empire du ravioli",
        "details": "Encore un site sympa <http://www.deliceshandong.com/>"
    }

];

// Pick a number, 0 to the length of the restaurant list less one
var pick = Math.floor( Math.random() * (lunchSpots.length - 1 ) );

bot_text = "Today, may I suggest *" + lunchSpots[pick].restaurant + "*. \n It's <" + lunchSpots[pick].location + "|here>.";

if (lunchSpots[pick].details){
  bot_text = bot_text + "\n _" + lunchSpots[pick].details + "_";
}

console.log(bot_text);

// Compose the message and other details to send to Slack
var payload = {
	text: bot_text,
	icon_emoji: ":stew:",
	username: "bot au feu",
	channel: "#ilfaitfaim"
};

// Set up the sending options for the request function.
// See note about the SLACK_WEBHOOK_URL above.
var options = {
	url: keys.SLACK_WEBHOOK_URL,
	method: 'POST',
	body: payload,
	json: true
};

// Send the webhook
request(options, function (error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log(error);
  }
});
