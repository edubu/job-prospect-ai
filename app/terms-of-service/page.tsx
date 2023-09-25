import React from "react";

import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

const TermsOfServicePage = () => {
  const markdownContent = `
# Terms of Service

_Last updated: September, 25, 2023_

## 1. Agreement to Terms

These Terms of Service constitute a legally binding agreement made between you, 
whether personally or on behalf of an entity (“you”) and Job Prospect AI (“we,” “us” or “our”), 
concerning your access to and use of the Job Prospect AI website as well as any other media form, 
media channel, mobile website or mobile application related, linked, 
or otherwise connected thereto (collectively, the “Site”)
You agree that by accessing the Site, you have read, understood, 
and agree to be bound by all of these Terms of Service. 
If you do not agree with all of these Terms of Service, 
then you are expressly prohibited from using the Site and you must discontinue use immediately.

## 2. Modifications and Interruptions

We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at 
our sole discretion without notice. 
We also reserve the right to modify or discontinue all or part of the Site without notice at any time.

We will not be liable to you or any third party for any modification, 
price change, suspension, or discontinuance of the Site.

## 3. Intellectual Property Rights

The Site is our proprietary property and all source code, databases, functionality, 
software, website designs, audio, video, text, photographs, 
and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, 
and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, 
and are protected by copyright and trademark laws and various other intellectual property rights 
and unfair competition laws of the United States, foreign jurisdictions, and international conventions.

## 4. User Representations

By using the Site, you represent and warrant that:

- All registration information you submit will be true, accurate, current, and complete.
- You will maintain the accuracy of such information and promptly update such registration 
  information as necessary.
- You have the legal capacity and you agree to comply with these Terms of Service.

## 5. Governing Law

These Terms of Service and your use of the Site are governed by and construed in accordance 
with the laws of the state of Michigan applicable to agreements made and to be entirely performed 
within the state of Michigan, without regard to its conflict of law principles.

## 6. Contact Us

In order to resolve a complaint regarding the Site or to receive further information regarding 
the use of the Site, please contact us at:

- Email: support@jobprospect.ai
- Address: 4655 M 72, Harrisville, Michigan, 48740`;

  return (
    <div className={`${styles["markdown-container"]} bg-subBackground`}>
      <ReactMarkdown children={markdownContent} />
    </div>
  );
};

export default TermsOfServicePage;
