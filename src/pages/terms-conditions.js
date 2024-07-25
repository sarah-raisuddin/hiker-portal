import React from "react";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import termsText from "../data/terms-data.js";


function TermsAndConditions() {
    return (
        <div className="terms-conditions">
            <PageHeader text={"Terms and Conditions for Use"} />
            <div className="terms-conditions-container">
                <div className="terms-conditions-body">
                        <p className="terms-text">{termsText}</p>
                    <SubmissionButton />
                </div>
            </div>

        </div>
        
    );
}

export default TermsAndConditions;