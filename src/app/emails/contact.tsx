import { ContactEmailTemplate } from "@/components/emails";
import { testData } from "@/components/emails/config";

export default function ContactEmailPreview() {
  return <ContactEmailTemplate {...testData.contact} />;
}
