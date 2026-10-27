import ivoryModel from "@/assets/ivory-model.jpg";
import ivoryCollar from "@/assets/ivory-collar.jpg";
import ivoryCuff from "@/assets/ivory-cuff.jpg";
import ivoryHem from "@/assets/ivory-hem.jpg";
import ivoryBow from "@/assets/ivory-bow.jpg";
import maroonModel from "@/assets/maroon-model.jpg";
import maroonCollar from "@/assets/maroon-collar.jpg";
import maroonCuff from "@/assets/maroon-cuff.jpg";
import maroonHem from "@/assets/maroon-hem.jpg";
import maroonBow from "@/assets/maroon-bow.jpg";

/** Central, editable product configuration. Replace placeholders with real details. */
export const BRAND = {
  name: "Kurta", // TODO: your brand name
  whatsappNumber: "919652564916",
  email: "", // TODO: order enquiry email
  phone: "", // TODO
};

export const PRODUCT = {
  name: "The Royal Bow Kurta",
  price: 2199,
  includedNote: "Kurta only. Trousers shown for styling purposes and sold separately.",
  sizes: ["M", "L", "XL"],
  fabric: "Fabric details to be added.", // TODO
};

export const SIZE_GUIDE: { size: string; chest: string; length: string; shoulder: string }[] =
  PRODUCT.sizes.map((size) => ({ size, chest: "—", length: "—", shoulder: "—" })); // TODO: real measurements

export const POLICIES = {
  delivery: "Delivery information will be shared here.", // TODO
  shipping: "Shipping charges will be confirmed here.", // TODO
  returns: "Return and exchange policy will be shared here.", // TODO
};

export type ColorId = "ivory" | "maroon";

export const COLORS: Record<
  ColorId,
  { id: ColorId; label: string; full: string; mood: string; model: string; collar: string; cuff: string; hem: string; bow: string }
> = {
  ivory: {
    id: "ivory",
    label: "Ivory White",
    full: "Ivory White with Gold detailing",
    mood: "Clean, timeless elegance.",
    model: ivoryModel, collar: ivoryCollar, cuff: ivoryCuff, hem: ivoryHem, bow: ivoryBow,
  },
  maroon: {
    id: "maroon",
    label: "Royal Maroon",
    full: "Deep Maroon with Gold detailing",
    mood: "Depth, confidence, occasion-ready.",
    model: maroonModel, collar: maroonCollar, cuff: maroonCuff, hem: maroonHem, bow: maroonBow,
  },
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
