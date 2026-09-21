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
      a: `<p>A UniFi Protect console (tested on Protect 7.2.x), a relay with one output configured as <strong>Pulse</strong> and wired across your opener's push-button terminals, and a Protect all-in-one sensor mounted on the door with its mount type set to <strong>Garage</strong>. The sensor is not optional — it is the thing that makes every command verified rather than hopeful.</p>`,
    },
    {
      q: "Why does my relay stay on instead of pulsing?",
      a: `<p>On Protect 7.2.x the relay's <code>activate</code> call <em>toggles</em> the output rather than pulsing it, whatever the pulse duration says. So the app and the bridge emulate a press: switch on, wait about 800&nbsp;ms, switch off. That is what the <code>emulated</code> pulse mode means, and it is the default because it is what the hardware actually does.</p><p>If your relay genuinely pulses on its own, switch the mode to <code>native</code> and the console's own pulse duration takes over.</p>`,
    },
    {
      q: "Do I need the bridge?",
      a: `<p>No. Connecting the app straight to your Protect console works on your home network with nothing else to install.</p><p>The bridge earns its keep when you want alert rules that run whether or not your phone is awake, an activity log you can export, family invites, or Shortcuts that work reliably in the background. It also keeps a single connection to the console instead of one per device.</p>`,
    },
    {
      q: "Do I need Home Assistant?",
      a: `<p>No, and there is no integration with it. This talks to Protect's own API directly.</p>`,
    },
    {
      q: "The app can't find my bridge.",
      a: `<p>Discovery uses Bonjour, and multicast does not cross Docker's bridge network. Run the container with <code>--network host</code>. If you cannot — on Docker Desktop for macOS or Windows, for instance — map the port instead, set <code>BONJOUR=false</code>, and type the bridge's address on the connection screen. Everything except discovery works identically.</p><p>Also check that your phone is on the same network segment and that client isolation is off on that Wi-Fi network.</p>`,
    },
    {
      q: "Does it work when I'm away from home?",
      a: `<p>Yes, once the bridge is reachable from outside. The recommended route is a VPN back to your house — WireGuard on the UDM, or Tailscale — because nothing is exposed. A Cloudflare Tunnel or your own reverse proxy with a certificate also works.</p><p>Port forwarding is not recommended and is deliberately not documented: it puts a device that opens your garage on the public internet behind a single token.</p>`,
    },
    {
      q: "How do other people in my household get access?",
      a: `<p>From the Family screen you create a one-time invite; the other phone scans or pastes it and joins. They never see your admin token. You can see everyone who has joined, rename them, and revoke any of them, and the activity log records who did what by name.</p>`,
    },
    {
      q: "What do cloud alerts do if I don't have a bridge?",
      a: `<p>Your console posts door events to a private webhook URL, and the service pushes a notification back when the door has been open too long, is still open at your nightly check time, or a car is in the garage with the door up.</p><p>It never holds a credential to your console, so it cannot open or close anything. “Close now” on a notification is carried out by the app, over your own connection. It stores only the event type, device id and timestamp, for seven days.</p>`,
    },
    {
      q: "Is there an Apple Watch app? Widgets? Siri?",
      a: `<p>Yes to all three, plus Control Center, the Action Button, Lock Screen widgets and a Live Activity while the door is open with a Close button on it. Shortcuts actions are included, so you can build your own automations.</p>`,
    },
    {
      q: "Can I try it without the hardware?",
      a: `<p>Yes. Demo mode drives a simulated door — travel time, sensor, alerts and all — with no console and no credentials. It is the same mode App Review uses to test the app.</p>`,
    },
    {
      q: "Will it open my door by itself?",
      a: `<p>No. Arriving home sends you a notification with an Open button; you still tap it. The only automatic action is the optional nightly auto-close, which is off by default and which you have to turn on deliberately.</p>`,
    },
    {
      q: "What happens if I stop the door half-way?",
      a: `<p>The app remembers which way it was travelling, because the sensor cannot tell a door stopped part-way from one standing fully open — it reports the same contact for both. So the next press goes the direction you expect rather than the direction a naive reading would suggest.</p>`,
    },
    {
      q: "Is there an Android app?",
      a: `<p>No, and there are no plans for one.</p>`,
    },
  ],
  fr: [
    {
      q: "De quel matériel ai-je besoin ?",
      a: `<p>Une console UniFi Protect (testée sur Protect 7.2.x), un relais dont une sortie est configurée en <strong>Pulse</strong> et câblée sur les bornes du bouton-poussoir de votre moteur, et un capteur tout-en-un Protect posé sur la porte avec un type de montage <strong>Garage</strong>. Le capteur n'est pas facultatif : c'est lui qui rend chaque commande vérifiée plutôt qu'optimiste.</p>`,
    },
    {
      q: "Pourquoi mon relais reste-t-il activé au lieu de faire une impulsion ?",
      a: `<p>Sur Protect 7.2.x, l'appel <code>activate</code> du relais <em>bascule</em> la sortie au lieu de l'impulser, quelle que soit la durée d'impulsion configurée. L'app et le bridge émulent donc un appui : activer, attendre environ 800&nbsp;ms, désactiver. C'est ce que signifie le mode d'impulsion <code>emulated</code>, et c'est la valeur par défaut parce que c'est le comportement réel du matériel.</p><p>Si votre relais impulse vraiment de lui-même, passez en mode <code>native</code> et la durée d'impulsion de la console reprend la main.</p>`,
    },
    {
      q: "Le bridge est-il nécessaire ?",
      a: `<p>Non. Relier l'app directement à votre console Protect fonctionne sur votre réseau domestique, sans rien d'autre à installer.</p><p>Le bridge devient intéressant si vous voulez des règles d'alerte qui tournent que votre téléphone soit réveillé ou non, un journal d'activité exportable, des invitations familiales, ou des raccourcis fiables en arrière-plan. Il garde aussi une seule connexion vers la console au lieu d'une par appareil.</p>`,
    },
    {
      q: "Faut-il Home Assistant ?",
      a: `<p>Non, et il n'y a aucune intégration avec lui. L'app parle directement à l'API de Protect.</p>`,
    },
    {
      q: "L'app ne trouve pas mon bridge.",
      a: `<p>La découverte utilise Bonjour, et le multicast ne traverse pas le réseau bridge de Docker. Lancez le conteneur avec <code>--network host</code>. Si ce n'est pas possible — sur Docker Desktop pour macOS ou Windows par exemple — publiez plutôt le port, mettez <code>BONJOUR=false</code> et saisissez l'adresse du bridge sur l'écran de connexion. Tout fonctionne à l'identique, sauf la découverte.</p><p>Vérifiez aussi que votre téléphone est sur le même segment réseau et que l'isolation des clients est désactivée sur ce réseau Wi-Fi.</p>`,
    },
    {
      q: "Est-ce que ça marche quand je ne suis pas chez moi ?",
      a: `<p>Oui, dès que le bridge est joignable depuis l'extérieur. La voie recommandée est un VPN vers votre domicile — WireGuard sur l'UDM, ou Tailscale — parce que rien n'est exposé. Un tunnel Cloudflare ou votre propre reverse proxy avec certificat fonctionnent aussi.</p><p>La redirection de port n'est pas recommandée et n'est volontairement pas documentée : elle place sur l'internet public un appareil qui ouvre votre garage, protégé par un seul jeton.</p>`,
    },
    {
      q: "Comment donner l'accès aux autres personnes du foyer ?",
      a: `<p>Depuis l'écran Famille, vous créez une invitation à usage unique ; l'autre téléphone la scanne ou la colle et rejoint. Il ne voit jamais votre jeton d'administration. Vous voyez qui a rejoint, vous pouvez renommer et révoquer, et le journal d'activité indique qui a fait quoi, par son nom.</p>`,
    },
    {
      q: "À quoi servent les alertes cloud si je n'ai pas de bridge ?",
      a: `<p>Votre console envoie les événements de la porte à une URL de webhook privée, et le service vous renvoie une notification quand la porte est restée ouverte trop longtemps, qu'elle l'est encore à l'heure de votre contrôle nocturne, ou qu'une voiture est dans le garage porte ouverte.</p><p>Le service ne détient aucun identifiant vers votre console : il ne peut donc rien ouvrir ni fermer. « Fermer maintenant » est exécuté par l'app, via votre propre connexion. Il ne conserve que le type d'événement, l'identifiant de l'appareil et l'horodatage, pendant sept jours.</p>`,
    },
    {
      q: "Y a-t-il une app Apple Watch ? Des widgets ? Siri ?",
      a: `<p>Oui aux trois, plus le Centre de contrôle, le bouton Action, les widgets de l'écran verrouillé et une activité en direct pendant que la porte est ouverte, avec un bouton Fermer. Des actions Raccourcis sont incluses pour vos propres automatisations.</p>`,
    },
    {
      q: "Puis-je essayer sans le matériel ?",
      a: `<p>Oui. Le mode Démo pilote une porte simulée — temps de course, capteur, alertes — sans console ni identifiants. C'est le mode qu'utilise la revue de l'App Store.</p>`,
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
      a: `<p>Non, et ce n'est pas prévu.</p>`,
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
