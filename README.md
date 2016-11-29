# Bot-au-feu for Slack
We can never decide where to eat for lunch, so this bot will tell us what to do. Or at least make a suggestion.

This bot, built for [Slack](https://slack.com/), posts its decision into a team Slack channel. Based on [johnkeefe](https://github.com/jkeefe/lunchbot) work.

## Dependencies

Well, the big thing this requires is [Slack](https://slack.com/).

This is a program written in JavaScript for [Node](http://nodejs.org/), and it uses the the Request node module.

	npm install request

To launch the bot use :

	node botaufeu.js

The Slack webook URL used is something you can get from inside the Slack app to send messages into a Slack channel. Since it's secret, I keep it in an ignore-from-git file so I don't accidentally publish it on Github. It is brought it as "keys" from a file called slack_keys.js (into api_keys folder). The structure of that file is:

		var SLACK_WEBHOOK_URL = 'your_incoming_webhook_url_goes_here';
    module.exports.SLACK_WEBHOOK_URL = SLACK_WEBHOOK_URL;

If your code is going to stay private, you can skip this by deleting line 2
and editing the first part of the options variable below like so:

	var options = {
		url: 'https://your-webhook-url-goes-here',
		...

## Nice to have

- [ ] lancer le bot depuis slack (Outgoing events)
- [ ] Pouvoir ajouter des restaurants depuis un excel ou depuis slack directement
- [ ] Conditionnement de la recherche (par type de restaurant, par prix, par quantité d'huile)
- [ ] Affichage de la map et de l'itinéraire
- [ ] designer un coursier parmis le channel
- [ ] Ajout auto de suggestions
- [ ] Ajout d'une proriété temps nécéssaire pour le restaurant et ajouter cette variable au Conditionnement
- [ ] Whatever you feel necessary
