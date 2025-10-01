import { OwnerEmailTemplate } from "@/components/emails";
import { testData } from "@/components/emails/config";

export default function OwnerEmailPreview() {
  return <OwnerEmailTemplate {...testData.owner} />;
}
