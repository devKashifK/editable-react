import { Icon } from "@iconify/react";

export interface ComponentOption {
  type: string;
  label: string;
  icon?: string;
  defaultProps?: Record<string, any>;
}

export const AVAILABLE_COMPONENTS: ComponentOption[] = [
  { 
    type: "Hero", 
    label: "Hero Section",
    icon: "mdi:presentation",
    defaultProps: {
      title: "New Hero Section",
      description: "Add your description here",
      backgroundImage: "/placeholder.jpg",
      features: [],
      buttons: []
    }
  },
  { 
    type: "HeroDefault", 
    label: "Default Hero",
    icon: "mdi:presentation-play",
    defaultProps: {
      title: "New Hero",
      description: "Add your description here",
      backgroundImage: "/placeholder.jpg"
    }
  },
  { 
    type: "CTAWithImage", 
    label: "CTA with Image",
    icon: "mdi:image-text",
    defaultProps: {
      title: "New CTA Section",
      description: "Add your description here",
      image: "/placeholder.jpg",
      ctaAction: "Learn More"
    }
  },
  { 
    type: "CTADefault", 
    label: "Simple CTA",
    icon: "mdi:megaphone",
    defaultProps: {
      title: "New CTA",
      description: "Add your description here"
    }
  },
  { 
    type: "ServicesCard", 
    label: "Services Card",
    icon: "mdi:card-account-details",
    defaultProps: {
      title: "New Service",
      description: "Service description",
      icon: "mdi:star"
    }
  },
  {
    type: "CardWithImage",
    label: "Card With Image",
    icon: "mdi:card-image",
    defaultProps: {
      title: "New Card",
      description: "Card description",
      image: "/placeholder.jpg"
    }
  },
  {
    type: "HoverCard",
    label: "Hover Card",
    icon: "mdi:cards",
    defaultProps: {
      title: "New Hover Card",
      description: "Card description",
      cta: "Learn More",
      icon: "mdi:star"
    }
  },
  {
    type: "Title",
    label: "Title Section",
    icon: "mdi:format-title",
    defaultProps: {
      title: "New Title",
      subtitle: "Subtitle here",
      description: "Description text"
    }
  },
  {
    type: "TitleWithDoubleBorder",
    label: "Double Border Title",
    icon: "mdi:border-double",
    defaultProps: {
      children: "New Title"
    }
  },
  {
    type: "TitleWithBottomBorder",
    label: "Bottom Border Title",
    icon: "mdi:border-bottom",
    defaultProps: {
      children: "New Title"
    }
  },
  {
    type: "FAQ",
    label: "FAQ Section",
    icon: "mdi:frequently-asked-questions",
    defaultProps: {
      faq: [
        { question: "New Question", answer: "Add answer here" }
      ]
    }
  },
  {
    type: "section",
    label: "Section Container",
    icon: "mdi:view-section",
    defaultProps: {
      className: "py-12"
    }
  },
  {
    type: "Container",
    label: "Container",
    icon: "mdi:view-sequential",
    defaultProps: {
      className: "max-w-7xl mx-auto px-4"
    }
  },
  {
    type: "div",
    label: "Div Container",
    icon: "mdi:view-grid",
    defaultProps: {
      className: ""
    }
  }
]; 