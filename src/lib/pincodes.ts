export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  estimatedDays: number;
  deliveryDateStr: string;
  isCodAvailable: boolean;
  isServiceable: boolean;
  hub: string;
}

// Map major Indian postal prefixes
const METRO_PIN_PREFIXES: Record<string, { city: string; state: string; days: number }> = {
  "11": { city: "New Delhi", state: "Delhi", days: 2 },
  "12": { city: "Gurugram / Faridabad", state: "Haryana", days: 2 },
  "20": { city: "Noida / Ghaziabad", state: "Uttar Pradesh", days: 2 },
  "40": { city: "Mumbai", state: "Maharashtra", days: 2 },
  "41": { city: "Pune", state: "Maharashtra", days: 2 },
  "56": { city: "Bengaluru", state: "Karnataka", days: 2 },
  "50": { city: "Hyderabad", state: "Telangana", days: 2 },
  "60": { city: "Chennai", state: "Tamil Nadu", days: 3 },
  "70": { city: "Kolkata", state: "West Bengal", days: 3 },
  "38": { city: "Ahmedabad", state: "Gujarat", days: 3 },
  "30": { city: "Jaipur", state: "Rajasthan", days: 3 },
  "16": { city: "Chandigarh", state: "Punjab", days: 3 },
  "68": { city: "Kochi", state: "Kerala", days: 4 },
};

export function checkIndianPincode(pincode: string): PincodeInfo {
  const cleanPin = pincode.trim().replace(/\D/g, "");

  if (cleanPin.length !== 6 || cleanPin.startsWith("0")) {
    return {
      pincode: cleanPin,
      city: "Unknown",
      state: "India",
      estimatedDays: 0,
      deliveryDateStr: "",
      isCodAvailable: false,
      isServiceable: false,
      hub: "None",
    };
  }

  const prefix = cleanPin.substring(0, 2);
  const metroMatch = METRO_PIN_PREFIXES[prefix];

  let days = 4;
  let city = "District Hub";
  let state = "India";

  if (metroMatch) {
    days = metroMatch.days;
    city = metroMatch.city;
    state = metroMatch.state;
  } else {
    // Determine state by first digit (Postal zones)
    const zone = cleanPin[0];
    switch (zone) {
      case "1":
        state = "Northern India (Punjab / HP / J&K / Haryana)";
        days = 4;
        break;
      case "2":
        state = "Uttar Pradesh / Uttarakhand";
        days = 4;
        break;
      case "3":
        state = "Western India (Rajasthan / Gujarat)";
        days = 4;
        break;
      case "4":
        state = "Maharashtra / Goa / MP / Chhattisgarh";
        days = 4;
        break;
      case "5":
        state = "Southern India (Andhra / Telangana / Karnataka)";
        days = 3;
        break;
      case "6":
        state = "Southern India (Tamil Nadu / Kerala)";
        days = 4;
        break;
      case "7":
        state = "Eastern / North Eastern India";
        days = 5;
        break;
      case "8":
        state = "Bihar / Jharkhand";
        days = 5;
        break;
      default:
        state = "India";
        days = 5;
    }
  }

  // Calculate arrival date
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + days);

  const deliveryDateStr = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return {
    pincode: cleanPin,
    city,
    state,
    estimatedDays: days,
    deliveryDateStr,
    isCodAvailable: true,
    isServiceable: true,
    hub: `Express BlueDart Air Hub (${city})`,
  };
}
