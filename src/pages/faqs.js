import React from "react";
import PageHeader from "../base-components/page-header";
import ToggleBlock from "../base-components/toggle-block";
import faqData from "../data/faq-data";

// Documentation/Sources used:
// https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/

function Faqs() {
    return (
        <div className="faqs">
            <PageHeader text={"FAQs"} />
                <div className="toggle-block">
                    {faqData.map((faq, index) => (
                        <ToggleBlock key={index} blockLabel={faq.blockLabel} blockContent={faq.blockContent} />
                    ))}
                </div>
        </div>
    );
}

export default Faqs;