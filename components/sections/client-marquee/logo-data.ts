interface ClientLogoImageData {
  id: string;
  name: string;
  type: "image";
  src: string;
  width: number;
  height: number;
}

export type ClientLogoData = ClientLogoImageData;

export const clientLogos: readonly ClientLogoData[] = [
  {
    id: "predictx",
    name: "PredictX",
    type: "image",
    src: "/images/clients/predictx.png",
    width: 2172,
    height: 724,
  },
  {
    id: "aahii",
    name: "AAHII",
    type: "image",
    src: "/images/clients/aahii.png",
    width: 641,
    height: 160,
  },
  {
    id: "predictx-sports",
    name: "PredictX Sports",
    type: "image",
    src: "/images/clients/predictxsports.png",
    width: 2172,
    height: 724,
  },
  {
    id: "gsm-group",
    name: "GSM Group",
    type: "image",
    src: "/images/clients/gsmgroup.png",
    width: 2095,
    height: 751,
  },
  {
    id: "jnp",
    name: "JNP",
    type: "image",
    src: "/images/clients/jnp.png",
    width: 2172,
    height: 724,
  },
  {
    id: "ghor",
    name: "Ghor",
    type: "image",
    src: "/images/clients/ghor.png",
    width: 2172,
    height: 724,
  },
  {
    id: "madhab-lodge",
    name: "Madhab Lodge",
    type: "image",
    src: "/images/clients/madhablodge.png",
    width: 2172,
    height: 724,
  },
  {
    id: "porisrom",
    name: "Porisrom",
    type: "image",
    src: "/images/clients/porisrom.png",
    width: 2172,
    height: 724,
  },
  {
    id: "zupiter-india",
    name: "Zupiter India",
    type: "image",
    src: "/images/clients/zupiterindia.png",
    width: 2172,
    height: 724,
  },
  {
    id: "always-compliant",
    name: "Always Compliant",
    type: "image",
    src: "/images/clients/alwayscomplaint.png",
    width: 2170,
    height: 725,
  },
] as const;
