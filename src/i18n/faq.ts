import type { Locale } from "./ui";

export interface FaqEntry {
  q: string;
  /** Trusted, hand-written HTML. Rendered with set:html and fed to the FAQPage JSON-LD as plain text. */
  a: string;
}

/** One source for both the rendered list and the structured data, so they cannot drift apart. */
export const FAQ: Record<Locale, FaqEntry[]> = {
  en: [
    {
      q: "What hardware do I need?",
      a: `<p>A UniFi Protect console (tested on Protect 7.2.x), a relay with one output configured as <strong>Pulse</strong> and wired across your opener's push-button terminals, and a Protect all-in-one sensor mounted on the door with its mount type set to <strong>Garage</strong>. The sensor is not optional: it is the thing that makes every command verified rather than hopeful.</p>`,
    },
    {
      q: "Why does my relay stay on instead of pulsing?",
      a: `<p>On Protect 7.2.x the relay's <code>activate</code> call <em>toggles</em> the output rather than pulsing it, whatever the pulse duration says. So the app and the bridge emulate a press: switch on, wait about 800&nbsp;ms, switch off. That is what the <code>emulated</code> pulse mode means, and it is the default because it is what the hardware actually does.</p><p>If your relay genuinely pulses on its own, switch the mode to <code>native</code> and the console's own pulse duration takes over: <em>Button press → Single activate</em> in the app when it connects straight to your console, or <code>RELAY_PULSE_MODE=native</code> on a bridge.</p>`,
    },
    {
      q: "Do I need the bridge?",
      a: `<p>No. There are two ways to connect, and both give you open and close verified by the sensor, the Watch, widgets, Siri and Shortcuts, alerts when the door is left open, and access away from home over a VPN.</p><p>Straight to the console is the fastest start: nothing to install, but every device needs its own Protect API key, there is no activity log, and alerts come from the optional cloud service. The bridge needs an always-on machine with Docker (a NAS, a Raspberry Pi, a VPS) that can reach your console. In exchange, family members join by QR code without ever holding your key, you get an activity log by name, the alert rules run on your own hardware, and Shortcuts work reliably in the background.</p><p><a href="/#connect">The comparison on the home page</a> sets the two side by side: what each needs, what you gain and what you give up.</p>`,
    },
    {
      q: "Is it free?",
      a: `<p>Free to download, with 20 opens included. After that, a one-time purchase in the app, Garage Opener Unlimited (US$4.99, or the equivalent in your country's App Store), removes the limit for good. There is no subscription, and the purchase can be shared through Family Sharing.</p><p>Only opening counts. Close and Stop always work, allowance used up or not, because the app must never be the reason a garage is left open. The door state, the camera picture, alerts and family invites are never limited either, and Demo mode is unlimited. With two doors, the 20 opens are shared between them.</p><p>If you bought the app before it became free, you are unlocked automatically and there is nothing to do. The bridge and the cloud-alerts service cost nothing.</p>`,
    },
    {
      q: "Do I need Home Assistant?",
      a: `<p>No, and there is no integration with it. This talks to Protect's own API directly.</p>`,
    },
    {
      q: "The app can't find my bridge.",
      a: `<p>Discovery uses Bonjour, and multicast does not cross Docker's bridge network. The reference compose runs the container with <code>network_mode: host</code> for that reason. If you cannot, for instance on Docker Desktop for macOS or Windows, publish <code>8787:8787</code> instead, set <code>BONJOUR=false</code> and <code>PUBLIC_URL=http://&lt;host&gt;:8787</code>, and type the address on the connection screen. Everything except discovery works identically. Bonjour also stops at a VLAN boundary unless your gateway reflects mDNS, so a phone on a different VLAN from the bridge needs the address typed too.</p><p>The bridge listens on <strong>port 8787</strong>, so the address is <code>http://&lt;host&gt;:8787</code> using the LAN address of whatever machine runs the container. Include the port: without it the app tries port 80 and gets nothing. Check too that your phone is on the same network segment and that client isolation is off on that Wi-Fi network.</p>`,
    },
    {
      q: "Does it work when I'm away from home?",
      a: `<p>Yes, on both ways of connecting, over a VPN back to your house: WireGuard on the UDM, or Tailscale. That is the recommended route because nothing is exposed; the phone simply behaves as if it were at home. If you run a bridge, a Cloudflare Tunnel or your own reverse proxy with a certificate also works.</p><p>Port forwarding is not recommended and is deliberately not documented: it puts a device that opens your garage on the public internet behind a single token.</p>`,
    },
    {
      q: "How do other people in my household get access?",
      a: `<p>With a bridge: from the Family screen you create a one-time invite; the other phone scans or pastes it and joins. They never see your admin token or your Protect key. You can see everyone who has joined, rename them, and revoke any of them, and the activity log records who did what by name.</p><p>Without a bridge there are no invites. Each person enters a Protect API key on their own device, ideally a key of their own, and removing someone means deleting that key in Protect. That is the main reason to run the bridge in a household.</p><p>Access lives on the bridge, not on your phone. <strong>Forget this setup</strong> in the app only clears that one phone: everyone you invited keeps opening the door until you revoke them from the Family screen, which you can still do after entering your admin token again. If the admin token itself may have leaked, or a phone that held it is gone, change <code>BRIDGE_TOKENS</code> on the bridge and restart it: the old token stops working immediately, invited members are unaffected, and you enter the new token on your own phone.</p>`,
    },
    {
      q: "I have two garage doors. Can it handle both?",
      a: `<p>Yes, from version 1.1 of the app: both doors on one phone, and a default door for each person. Each door needs its own relay output (a relay has two, or you can use two relays) and its own all-in-one sensor mounted on that door. The sensor is what confirms every command, so a door without one cannot be set up.</p><p>With a bridge, one bridge drives both doors. It needs bridge 0.6 or later, and the second door is added in the bridge's configuration; the <a href="/self-hosting#two-doors">self-hosting guide</a> lists the settings. Connected straight to the console, you map both doors in the app. Either way, the default door is the one the Watch, widgets and Siri act on unless you say otherwise, and the other door is on the same screen, just below it.</p><p>One caveat, stated plainly: we have a single door ourselves. The second relay output has been tested against the simulator, not against a second real door. If you run two, we would like to hear how it goes.</p>`,
    },
    {
      q: "Can I see the garage in the app?",
      a: `<p>Yes, from version 1.1. The door screen shows a picture from the camera mapped to that door, the one inside the garage, so you can check that nothing is in the way before moving the door and that it really closed afterwards. Two doors can share one camera.</p><p>These are snapshots, refreshed every few seconds and faster while the door is moving. It is not live video. With a bridge (0.6 or later), the bridge fetches the picture and passes it on, so family phones never hold your Protect key. Connected straight to the console, the phone asks the console itself. The picture is never sent to the cloud-alerts service.</p><p>If the camera is offline or unreachable, you see the last picture together with its time, so an old image is never passed off as current. If no camera is mapped to the door, the picture is simply not shown and everything else works as before.</p>`,
    },
    {
      q: "What do cloud alerts do if I don't have a bridge?",
      a: `<p>Your console posts door events to a private webhook URL, and the service pushes a notification back when the door has been open too long, is still open at your nightly check time, or a car is in the garage with the door up.</p><p>It never holds a credential to your console, so it cannot open or close anything. “Close now” on a notification is carried out by the app, over your own connection. It stores only the event type, device id and timestamp, for seven days.</p>`,
    },
    {
      q: "How secret is my cloud-alerts webhook address?",
      a: `<p>Treat it like a password. The long random part of <code>https://alerts.garageopener.app/w/&lt;token&gt;</code> is what identifies your install, so anyone holding it could post fake door events to you — the one worth caring about is a fake "closed" for a door that is actually open, which would stop the alert you wanted.</p><p>It <strong>cannot</strong> be used to read anything, change your settings, or delete your data. All of those need a separate secret that lives in your phone's Keychain and is never part of a web address.</p><p>Because it sits in the address rather than in a hidden header, it is recorded in ordinary web server logs along the way. That is forced rather than chosen: UniFi Protect's Alarm Manager only lets you enter a URL, so there is nowhere else to put it. So: don't paste the full address into a forum post, a screenshot or a support ticket. If you ever think it has been seen, turn cloud alerts off and on again — that issues a new address, and you re-paste it into your two Alarm Manager rules.</p>`,
    },
    {
      q: "Is there an Apple Watch app? Widgets? Siri?",
      a: `<p>Yes to all three, plus Control Center, the Action Button, Lock Screen widgets and a Live Activity while the door is open with a Close button on it. Shortcuts actions are included, so you can build your own automations.</p>`,
    },
    {
      q: "Can I try it without the hardware?",
      a: `<p>Yes. Demo mode drives a simulated door, with travel time, a sensor and the alert rules, and no console and no credentials. It is the same mode App Review uses to test the app.</p>`,
    },
    {
      q: "Will it open my door by itself?",
      a: `<p>No. Arriving home sends you a notification with an Open button; you still tap it. The only automatic action is the optional nightly auto-close, which is off by default and which you have to turn on deliberately.</p>`,
    },
    {
      q: "What happens if I stop the door half-way?",
      a: `<p>The app remembers which way it was travelling, because the sensor cannot tell a door stopped part-way from one standing fully open, since it reports the same contact for both. So the next press goes the direction you expect rather than the direction a naive reading would suggest.</p>`,
    },
    {
      q: "Is there an Android app?",
      a: `<p>Yes, it is on the way. A native Android app is in closed testing on Google Play now, and it opens to everyone once that test is done; there is no date yet. It is written for Android rather than adapted from the iPhone app, and it uses the same bridge, the same direct connection to your console and the same cloud-alerts service, so there is nothing to change on your side.</p><p>What carries over: open and close verified by the sensor, the camera picture, two doors, family invites, alerts with Close now on the notification, the arrival notification, and Demo mode. Android's own features take the place of Apple's: home-screen widgets, Quick Settings tiles for Open, Close and Stop, app shortcuts for each door, a notification that stays up while the door is open, and a Wear OS app with a tile and complications.</p><p>Some things differ, because the platforms do. There are no lock-screen widgets and no voice phrases like Siri's. The arrival notification needs location access set to <em>Allow all the time</em>. And Garage Opener Unlimited cannot be shared with family, because Google Play does not share in-app purchases, so each person buys their own; a purchase made on the App Store does not carry over to Google Play either. The price and the 20 free opens are the same.</p>`,
    },
  ],
  fr: [
    {
      q: "De quel matériel ai-je besoin ?",
      a: `<p>Une console UniFi Protect (testée sur Protect 7.2.x), un relais dont une sortie est configurée en <strong>Pulse</strong> et câblée sur les bornes du bouton-poussoir de votre moteur, et un capteur tout-en-un Protect posé sur la porte avec un type de montage <strong>Garage</strong>. Le capteur n'est pas facultatif : c'est lui qui rend chaque commande vérifiée plutôt qu'optimiste.</p>`,
    },
    {
      q: "Pourquoi mon relais reste-t-il activé au lieu de faire une impulsion ?",
      a: `<p>Sur Protect 7.2.x, l'appel <code>activate</code> du relais <em>bascule</em> la sortie au lieu de l'impulser, quelle que soit la durée d'impulsion configurée. L'app et le bridge émulent donc un appui : activer, attendre environ 800&nbsp;ms, désactiver. C'est ce que signifie le mode d'impulsion <code>emulated</code>, et c'est la valeur par défaut parce que c'est le comportement réel du matériel.</p><p>Si votre relais impulse vraiment de lui-même, passez en mode <code>native</code> et la durée d'impulsion de la console reprend la main : <em>Appui sur le bouton → Activation simple</em> dans l'app quand elle se connecte directement à la console, ou <code>RELAY_PULSE_MODE=native</code> sur un bridge.</p>`,
    },
    {
      q: "Le bridge est-il nécessaire ?",
      a: `<p>Non. Il y a deux façons de se connecter, et les deux vous donnent l'ouverture et la fermeture vérifiées par le capteur, la Watch, les widgets, Siri et les Raccourcis, des alertes quand la porte reste ouverte, et l'accès hors de chez vous via un VPN.</p><p>Directement à la console, c'est le démarrage le plus rapide : rien à installer, mais chaque appareil a besoin de sa propre clé d'API Protect, il n'y a pas de journal d'activité, et les alertes viennent du service cloud facultatif. Le bridge demande une machine allumée en permanence avec Docker (un NAS, un Raspberry Pi, un VPS), capable de joindre votre console. En échange, la famille rejoint par code QR sans jamais détenir votre clé, vous avez un journal d'activité par nom, les règles d'alerte s'exécutent sur votre propre matériel, et les raccourcis sont fiables en arrière-plan.</p><p><a href="/fr#connect">Le comparatif de la page d'accueil</a> met les deux côte à côte : ce que chacune demande, ce que vous y gagnez et ce à quoi vous renoncez.</p>`,
    },
    {
      q: "Est-ce gratuit ?",
      a: `<p>Le téléchargement est gratuit, avec 20 ouvertures incluses. Ensuite, un achat unique dans l'app, Garage Opener Unlimited (4,99 $ US, ou l'équivalent dans l'App Store de votre pays), supprime la limite pour de bon. Il n'y a pas d'abonnement, et l'achat peut être partagé via le Partage familial.</p><p>Seules les ouvertures sont décomptées. Fermer et Arrêter fonctionnent toujours, quota épuisé ou non, parce que l'app ne doit jamais être la raison pour laquelle un garage reste ouvert. L'état de la porte, l'image de la caméra, les alertes et les invitations familiales ne sont jamais limités non plus, et le mode Démo est illimité. Avec deux portes, les 20 ouvertures sont communes aux deux.</p><p>Si vous avez acheté l'app avant qu'elle ne devienne gratuite, vous êtes débloqué automatiquement, sans rien avoir à faire. Le bridge et le service d'alertes cloud ne coûtent rien.</p>`,
    },
    {
      q: "Faut-il Home Assistant ?",
      a: `<p>Non, et il n'y a aucune intégration avec lui. L'app parle directement à l'API de Protect.</p>`,
    },
    {
      q: "L'app ne trouve pas mon bridge.",
      a: `<p>La découverte utilise Bonjour, et le multicast ne traverse pas le réseau bridge de Docker. C'est pourquoi le compose de référence lance le conteneur avec <code>network_mode: host</code>. Si ce n'est pas possible, par exemple sur Docker Desktop pour macOS ou Windows, publiez plutôt <code>8787:8787</code>, mettez <code>BONJOUR=false</code> et <code>PUBLIC_URL=http://&lt;hôte&gt;:8787</code>, et saisissez l'adresse sur l'écran de connexion. Tout fonctionne à l'identique, sauf la découverte. Bonjour s'arrête aussi à la frontière d'un VLAN, sauf si votre passerelle relaie le mDNS : un téléphone sur un autre VLAN que le bridge a lui aussi besoin de l'adresse saisie.</p><p>Le bridge écoute sur le <strong>port 8787</strong> : l'adresse est donc <code>http://&lt;hôte&gt;:8787</code>, avec l'adresse locale de la machine qui héberge le conteneur. N'oubliez pas le port : sans lui, l'app tente le port 80 et n'obtient rien. Vérifiez aussi que votre téléphone est sur le même segment réseau et que l'isolation des clients est désactivée sur ce réseau Wi-Fi.</p>`,
    },
    {
      q: "Est-ce que ça marche quand je ne suis pas chez moi ?",
      a: `<p>Oui, avec les deux façons de se connecter, via un VPN vers votre domicile : WireGuard sur l'UDM, ou Tailscale. C'est la voie recommandée parce que rien n'est exposé ; le téléphone se comporte simplement comme s'il était à la maison. Si vous utilisez un bridge, un tunnel Cloudflare ou votre propre reverse proxy avec certificat fonctionnent aussi.</p><p>La redirection de port n'est pas recommandée et n'est volontairement pas documentée : elle place sur l'internet public un appareil qui ouvre votre garage, protégé par un seul jeton.</p>`,
    },
    {
      q: "Comment donner l'accès aux autres personnes du foyer ?",
      a: `<p>Avec un bridge : depuis l'écran Famille, vous créez une invitation à usage unique ; l'autre téléphone la scanne ou la colle et rejoint. Il ne voit jamais votre jeton d'administration ni votre clé Protect. Vous voyez qui a rejoint, vous pouvez renommer et révoquer, et le journal d'activité indique qui a fait quoi, par son nom.</p><p>Sans bridge, il n'y a pas d'invitations. Chaque personne saisit une clé d'API Protect sur son propre appareil, de préférence une clé à elle, et retirer quelqu'un revient à supprimer cette clé dans Protect. C'est la principale raison d'utiliser le bridge dans un foyer.</p><p>L'accès est enregistré sur le bridge, pas sur votre téléphone. <strong>Oublier cette configuration</strong> dans l'app n'efface que ce téléphone : toutes les personnes invitées continuent d'ouvrir la porte tant que vous ne les avez pas révoquées depuis l'écran Famille, ce qui reste possible après avoir ressaisi votre jeton d'administration. Si ce jeton a pu fuiter, ou si un téléphone qui le détenait a disparu, changez <code>BRIDGE_TOKENS</code> sur le bridge et redémarrez-le : l'ancien jeton cesse de fonctionner immédiatement, les membres invités ne sont pas concernés, et vous saisissez le nouveau jeton sur votre propre téléphone.</p>`,
    },
    {
      q: "J'ai deux portes de garage. Peut-il gérer les deux ?",
      a: `<p>Oui, à partir de la version 1.1 de l'app : les deux portes sur un seul téléphone, et une porte par défaut pour chaque personne. Chaque porte a besoin de sa propre sortie de relais (un relais en a deux, ou vous pouvez utiliser deux relais) et de son propre capteur tout-en-un monté sur cette porte. C'est le capteur qui confirme chaque commande : une porte sans capteur ne peut pas être configurée.</p><p>Avec un bridge, un seul bridge pilote les deux portes. Il faut le bridge 0.6 ou une version ultérieure, et la seconde porte s'ajoute dans la configuration du bridge ; le <a href="/fr/self-hosting#two-doors">guide d'auto-hébergement</a> liste les réglages. En connexion directe à la console, vous associez les deux portes dans l'app. Dans les deux cas, la porte par défaut est celle sur laquelle agissent la Watch, les widgets et Siri sauf indication contraire, et l'autre porte se trouve sur le même écran, juste en dessous.</p><p>Une réserve, dite clairement : nous n'avons nous-mêmes qu'une seule porte. La seconde sortie du relais a été testée sur le simulateur, pas sur une seconde porte réelle. Si vous en avez deux, votre retour nous intéresse.</p>`,
    },
    {
      q: "Puis-je voir le garage dans l'app ?",
      a: `<p>Oui, à partir de la version 1.1. L'écran de la porte affiche une image de la caméra associée à cette porte, celle qui se trouve dans le garage : vous pouvez vérifier que rien ne gêne avant de manœuvrer la porte, et qu'elle s'est vraiment fermée ensuite. Deux portes peuvent partager la même caméra.</p><p>Ce sont des images fixes, rafraîchies toutes les quelques secondes et plus souvent pendant que la porte bouge. Ce n'est pas de la vidéo en direct. Avec un bridge (0.6 ou ultérieur), c'est le bridge qui récupère l'image et la transmet : les téléphones de la famille ne détiennent donc jamais votre clé Protect. En connexion directe à la console, le téléphone la demande lui-même à la console. L'image n'est jamais envoyée au service d'alertes cloud.</p><p>Si la caméra est hors ligne ou injoignable, vous voyez la dernière image accompagnée de son heure : une image ancienne n'est jamais présentée comme actuelle. Si aucune caméra n'est associée à la porte, l'image n'est simplement pas affichée, et tout le reste fonctionne comme avant.</p>`,
    },
    {
      q: "À quoi servent les alertes cloud si je n'ai pas de bridge ?",
      a: `<p>Votre console envoie les événements de la porte à une URL de webhook privée, et le service vous renvoie une notification quand la porte est restée ouverte trop longtemps, qu'elle l'est encore à l'heure de votre contrôle nocturne, ou qu'une voiture est dans le garage porte ouverte.</p><p>Le service ne détient aucun identifiant vers votre console : il ne peut donc rien ouvrir ni fermer. « Fermer maintenant » est exécuté par l'app, via votre propre connexion. Il ne conserve que le type d'événement, l'identifiant de l'appareil et l'horodatage, pendant sept jours.</p>`,
    },
    {
      q: "Mon adresse de webhook pour les alertes cloud est-elle secrète ?",
      a: `<p>Traitez-la comme un mot de passe. La longue partie aléatoire de <code>https://alerts.garageopener.app/w/&lt;jeton&gt;</code> identifie votre installation : quiconque la détient pourrait vous envoyer de faux événements de porte — le cas qui compte étant un faux « fermée » alors que la porte est ouverte, ce qui supprimerait l'alerte que vous attendiez.</p><p>Elle ne permet <strong>pas</strong> de lire quoi que ce soit, de modifier vos réglages ni de supprimer vos données : tout cela exige un autre secret, conservé dans le trousseau de votre téléphone et qui n'apparaît jamais dans une adresse web.</p><p>Comme elle figure dans l'adresse plutôt que dans un en-tête masqué, elle est enregistrée dans les journaux des serveurs web traversés. C'est contraint, pas choisi : l'Alarm Manager d'UniFi Protect ne permet de saisir qu'une URL, il n'y a donc pas d'autre endroit où la mettre. Donc : ne collez pas l'adresse complète dans un forum, une capture d'écran ou un ticket d'assistance. Si vous pensez qu'elle a été vue, désactivez puis réactivez les alertes cloud — une nouvelle adresse est émise, à recoller dans vos deux règles Alarm Manager.</p>`,
    },
    {
      q: "Y a-t-il une app Apple Watch ? Des widgets ? Siri ?",
      a: `<p>Oui aux trois, plus le Centre de contrôle, le bouton Action, les widgets de l'écran verrouillé et une activité en direct pendant que la porte est ouverte, avec un bouton Fermer. Des actions Raccourcis sont incluses pour vos propres automatisations.</p>`,
    },
    {
      q: "Puis-je essayer sans le matériel ?",
      a: `<p>Oui. Le mode Démo pilote une porte simulée, avec temps de course, capteur et alertes, sans console ni identifiants. C'est le mode qu'utilise la revue de l'App Store.</p>`,
    },
    {
      q: "Est-ce que la porte peut s'ouvrir toute seule ?",
      a: `<p>Non. L'arrivée à la maison vous envoie une notification avec un bouton Ouvrir ; c'est vous qui appuyez. La seule action automatique est la fermeture nocturne facultative, désactivée par défaut et qu'il faut activer délibérément.</p>`,
    },
    {
      q: "Que se passe-t-il si j'arrête la porte à mi-course ?",
      a: `<p>L'app mémorise le sens de déplacement, car le capteur ne distingue pas une porte arrêtée à mi-course d'une porte grande ouverte : il rapporte le même contact dans les deux cas. L'appui suivant va donc dans le sens que vous attendez, et non dans celui qu'une lecture naïve suggérerait.</p>`,
    },
    {
      q: "Y a-t-il une app Android ?",
      a: `<p>Oui, elle arrive. Une app Android native est en test fermé sur Google Play, et elle sera ouverte à tous une fois ce test terminé ; il n'y a pas encore de date. Elle est écrite pour Android plutôt qu'adaptée de l'app iPhone, et elle utilise le même bridge, la même connexion directe à votre console et le même service d'alertes cloud : vous n'avez rien à changer de votre côté.</p><p>Ce qui est repris : l'ouverture et la fermeture vérifiées par le capteur, l'image de la caméra, deux portes, les invitations familiales, les alertes avec « Fermer maintenant » sur la notification, la notification d'arrivée et le mode Démo. Les fonctions propres à Android remplacent celles d'Apple : des widgets pour l'écran d'accueil, des boutons Réglages rapides pour Ouvrir, Fermer et Arrêter, des raccourcis d'application pour chaque porte, une notification qui reste affichée tant que la porte est ouverte, et une app Wear OS avec une carte et des complications.</p><p>Certaines choses diffèrent, parce que les plateformes diffèrent. Il n'y a pas de widgets sur l'écran verrouillé, ni de phrases vocales comme avec Siri. La notification d'arrivée demande l'accès à la position réglé sur <em>Toujours autoriser</em>. Et Garage Opener Unlimited ne peut pas être partagé avec la famille, car Google Play ne partage pas les achats intégrés : chaque personne achète le sien. Un achat fait sur l'App Store n'est pas repris sur Google Play non plus. Le prix et les 20 ouvertures gratuites sont les mêmes.</p>`,
    },
  ],
};

/** Strips the hand-written HTML for the JSON-LD `acceptedAnswer`, which must be text. */
export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "en" ? "en-US" : "fr-FR",
    mainEntity: FAQ[locale].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(),
      },
    })),
  };
}
