import { BuyerEmailTemplate } from "@/components/emails";
import { testData } from "@/components/emails/config";

export default function BuyerEmailPreview() {
  return <BuyerEmailTemplate {...testData.buyer} />;
}
