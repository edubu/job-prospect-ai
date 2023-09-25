import React from "react";

import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

const PrivacyPolicyPage = () => {
  const markdownContent = `
# Privacy Policy

_Last updated: September, 25, 2023_

## 1. Introduction

Welcome to Job Prospect AI (“we” or “our”). We respect your privacy and are committed to protecting your personal data. 
This privacy policy will inform you about how we look after your personal data when you visit our website (https://jobprospect.ai) 
(regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.

## 2. The Data We Collect About You

We may collect, use, store and transfer different kinds of personal data about you, which we have grouped together as follows:

- **Identity Data** includes first name, last name, username or similar identifier.
- **Contact Data** includes billing address, delivery address, email address, and telephone numbers.
- **Technical Data** includes internet protocol (IP) address, browser type and version, time zone setting and location, 
browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.

## 3. How We Use Your Personal Data

We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:

- Where we need to perform the contract we are about to enter into or have entered into with you.
- Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
- Where we need to comply with a legal obligation.

## 4. Data Security

We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, 
or accessed in an unauthorized way, altered, or disclosed. 
In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.

## 5. Data Retention

We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
including for the purposes of satisfying any legal, accounting, or reporting requirements.

## 6. Your Legal Rights

Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
including the right to request access to your personal data, request correction of your personal data, request erasure of your personal data, 
object to processing of your personal data, request restriction of processing your personal data, request transfer of your personal data, 
and right to withdraw consent.

## 7. Contact Us

If you have any questions about this privacy policy or our privacy practices, please contact us at:

- Email: support@jobprospect.ai
- Address: 4655 M 72, Harrisville, Michigan, 48740`;

  return (
    <div className={`${styles["markdown-container"]} bg-subBackground`}>
      <ReactMarkdown children={markdownContent} />
    </div>
  );
};

export default PrivacyPolicyPage;
