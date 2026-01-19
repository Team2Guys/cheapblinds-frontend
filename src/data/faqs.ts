import Delivery from "@components/svg/car";
import Fitting from "@components/svg/fitting";
import Measure from "@components/svg/measure";
import Package from "@components/svg/package";
import Support from "@components/svg/support";
import { FaqCategory } from "@/types/type";

export const faqData: FaqCategory[] = [
  {
    id: "products",
    title: "Products",
    icon: Package,
    items: [
      {
        question: "Q1: What types of blinds do you offer?",
        answer:
          "We offer affordable roller blinds, zebra blinds, vertical blinds, and Venetian blinds with motorised options.  They are designed to provide privacy, light control, and excellent value for money.",
      },
      {
        question: "Q2: Are your blinds durable, even though they are budget-friendly?",
        answer:
          "Yes. Our blinds are made from quality-tested materials to ensure durability, smooth operation, and long-lasting performance.",
      },
      {
        question: "Q3: Can I order fabric samples before buying?",
        answer:
          "Yes, you can order up to 5 free fabric samples, delivered within 24 hours, so you can confidently choose the right colour and texture.",
      },
      {
        question: "Q4: Do your blinds come with a warranty?",
        answer: "Yes, all our blinds include a limited warranty against manufacturing defects.",
      },
    ],
  },
  {
    id: "measuring",
    title: "Measuring",
    icon: Measure,
    items: [
      {
        question: "Q1: How do I measure my windows correctly?",
        answer:
          "Measure the width and height using a steel tape measure. Always measure twice to ensure accuracy.",
      },
      {
        question: "Q2: What if I measure wrong?",
        answer:
          "Our team will assist you with proper measurement guidance to help ensure the correct sizing before placing your order.",
      },
      {
        question: "Our measuring and fitting guides help?",
        answer:
          "Yes, our measuring and fitting guides provide step-by-step instructions for all products.",
      },
      {
        question: "Q3: Do you offer a professional measuring service?",
        answer:
          "Yes. We can arrange a professional measuring service at a small additional charge for accurate measurements and a perfect fit.",
      },
      {
        question: "Q4: What units should I use when submitting measurements?",
        answer: "Please provide all measurements in centimetres (cm) without rounding.",
      },
    ],
  },
  {
    id: "fitting",
    title: "Fitting",
    icon: Fitting,
    items: [
      {
        question: "Q1: Do you provide installation services?",
        answer:
          "No, we currently do not provide installation services. All blinds are supplied for easy DIY installation.",
      },
      {
        question: "Q2: Are installation instructions included?",
        answer: "Yes, every order includes clear fitting instructions and mounting accessories.",
      },
      {
        question: "Q3: Are the blinds easy to install by myself?",
        answer:
          "Yes. Basic tools and step-by-step instructions make installation simple for most homes.",
      },
      {
        question: "Q4: Can I get help if I face installation issues?",
        answer:
          "Our support team can provide basic guidance, but installation remains the customer’s responsibility.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    icon: Support,
    items: [
      {
        question: "Q1: How can I contact customer support?",
        answer: "You can contact us via phone, WhatsApp, email, or live chat for quick assistance.",
      },
      {
        question: "Q2: What are your customer support hours?",
        answer: "Live chat support is available 7 days a week from 9:00 AM to 9:00 PM.",
      },
      {
        question: "Q3: Can you help me choose the right blinds?",
        answer:
          "Yes! Our team can help you select blinds based on budget, room type, and privacy needs.",
      },
      {
        question: "Q4: What should I do if my blinds arrive damaged or defective?",
        answer: "Contact us within 7 days of delivery with clear photos and your order number.",
      },
    ],
  },
  {
    id: "deliveries",
    title: "Deliveries",
    icon: Delivery,
    items: [
      {
        question: "Q1: How long does delivery take?",
        answer: "Most customised orders are delivered within 1–4 working days.",
      },
      {
        question: "Q2: Do you offer free delivery?",
        answer: "Yes, free delivery is available on selected orders and locations.",
      },
      {
        question: "Q3: How long do free samples take to arrive?",
        answer: "Free samples (up to 5) are delivered within 24 hours.",
      },
      {
        question: "Q4: Can I track my order?",
        answer: "Yes, tracking details will be shared once your order is dispatched.",
      },
    ],
  },
];

export const InstructionData = [
  {
    question: "Our measuring and fitting guides help?",
    answer: "Typically 3–5 working days after confirmation.",
  },
  {
    question: "Our measuring and fitting guides help?",
    answer:
      "Yes, our measuring and fitting guides provide step-by-step instructions for all products.",
  },
  {
    question: "Our measuring and fitting guides help?",
    answer:
      "Yes, our measuring and fitting guides provide step-by-step instructions for all products.",
  },
  {
    question: "Our measuring and fitting guides help?",
    answer:
      "Yes, our measuring and fitting guides provide step-by-step instructions for all products.",
  },
];
