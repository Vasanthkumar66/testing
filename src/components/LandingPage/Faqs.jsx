import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import './Faqs.css'

const faqs = [
  {
    question: "1. What types of groceries do you offer?",
    answer:
      "We offer a wide range of groceries including fresh produce, dairy products, canned goods, snacks, beverages, and much more. You can explore our product catalog for a complete list of items.",
  },
  {
    question: "2. Do you offer delivery in my area?",
    answer:
      "We strive to provide delivery services to as many areas as possible. To check if we deliver to your area, simply enter your zip code during checkout, and our system will let you know if we can deliver to your location.",
  },
  {
    question: "3. How long does delivery take?",
    answer:
      "Delivery times may vary depending on your location and order volume. We aim to deliver your groceries as quickly as possible. You can choose a delivery time slot that is convenient for you during the checkout process.",
  },
  {
    question: "4. Is there a minimum order requirement?",
    answer:
      "Yes, there is a minimum order requirement for delivery. The minimum order amount may vary depending on your location. You can view the minimum order amount for your area during checkout.",
  },
  {
    question: "5. What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods, including credit cards, debit cards, and online payment platforms. You can choose your preferred payment method at checkout.",
  },
  {
    question: "6. Can I track my delivery?",
    answer:
      "Yes, you can track your delivery in real-time. Once your order is out for delivery, you will receive a tracking link via email or SMS. Click on the link to see the status of your delivery and the estimated arrival time.",
  },
  {
    question: "7. Do you offer discounts and promotions?",
    answer:
      "Yes, we frequently offer discounts and promotions on various products. Keep an eye on our website and subscribe to our newsletter to stay updated on the latest deals and offers.",
  },
  {
    question: "8. What if I receive damaged or incorrect items?",
    answer:
      "We strive to ensure the quality and accuracy of your order. If you receive damaged or incorrect items, please contact our customer support team immediately. We will arrange for replacements or refunds as needed.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="faq-item">
      <Typography
        variant="h6"
        component="div"
        onClick={toggleExpansion}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
          padding: "16px",
          "&:hover": {
            backgroundColor: "black",
            color:"#eeb03d"
          },
        }}
      >
        {question}
        <ExpandMoreIcon
          sx={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Typography>
      <Collapse in={expanded}>
        <div className="faq-answer">
          <Typography variant="body1">{answer}</Typography>
        </div>
      </Collapse>
    </div>
  );
};

const Faqs = () => {
  return (
    <div className="faq-section">
      <Typography
        variant="h4"
        sx={{
          fontFamily: "fantasy",
          backgroundImage:
            "linear-gradient(to left bottom, #eeb03d, #c2763f, #874839, #452527, #000000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: "20px",
          marginTop: "20px",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default Faqs;
