// Legal & Policy Pages Renderer (Terms of Service, Privacy Policy, Refund & Returns Policy)
import { restaurantData } from '../../data/restaurantData.js';

export function renderLegalView(type = 'terms') {
  const container = document.createElement('div');
  container.className = 'view-container';

  let title = 'Terms of Service';
  let subtitle = 'Rules, terms of service, and user agreements for dining and online ordering.';

  if (type === 'privacy') {
    title = 'Privacy Policy';
    subtitle = 'How we collect, protect, and handle your personal data and privacy.';
  } else if (type === 'refund') {
    title = 'Refund & Returns Policy';
    subtitle = 'Clear guidelines regarding returns, order cancellations, and refund processing.';
  }

  container.innerHTML = `
    <!-- LEGAL HERO -->
    <section class="section section-dark" style="padding: 4rem 0; text-align: center; background: linear-gradient(rgba(43,13,0,0.88), rgba(43,13,0,0.88)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80') center/cover;">
      <div class="container">
        <div class="section-subtext" style="color: var(--warm-beige);">Legal & Policy Center</div>
        <h1 class="hero-title" style="margin-bottom: 0.5rem; color: var(--white); font-family: var(--font-heading);">${title}</h1>
        <p class="hero-desc" style="max-width: 600px; margin: 0 auto; color: var(--cream);">
          ${subtitle}
        </p>
      </div>
    </section>

    <!-- LEGAL NAVIGATION TABS & CONTENT -->
    <section class="section">
      <div class="container" style="max-width: 960px;">
        <!-- Policy Switcher Tabs -->
        <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 3rem; flex-wrap: wrap;">
          <a href="#terms" class="btn ${type === 'terms' ? 'btn-primary' : 'btn-secondary'} btn-sm">Terms of Service</a>
          <a href="#privacy" class="btn ${type === 'privacy' ? 'btn-primary' : 'btn-secondary'} btn-sm">Privacy Policy</a>
          <a href="#refund" class="btn ${type === 'refund' ? 'btn-primary' : 'btn-secondary'} btn-sm">Refund & Returns Policy</a>
        </div>

        <div style="background-color: var(--white); padding: 3rem 2.5rem; border-radius: var(--radius-lg); border: 1px solid var(--primary-border); box-shadow: var(--shadow-md); line-height: 1.8; color: var(--text-dark);">
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; border-bottom: 1px solid var(--primary-border); padding-bottom: 1rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <span>Last Updated: August 16, 2026</span>
            <span>Applicable to: Desi Tadka</span>
          </div>

          ${type === 'terms' ? renderTermsContent() :
            type === 'privacy' ? renderPrivacyContent() :
            renderRefundContent()}
        </div>

        <!-- ACTION BUTTONS AT BOTTOM -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap;">
          <a href="#home" class="btn btn-secondary" style="padding: 0.85rem 1.75rem;">← Back to Home</a>
          <a href="#menu" class="btn btn-primary" style="padding: 0.85rem 1.75rem; background-color: var(--primary);">Browse Menu & Order →</a>
        </div>
      </div>
    </section>
  `;

  return container;
}

function renderTermsContent() {
  return `
    <div class="terms-document" style="font-size: 0.95rem; color: var(--deep-espresso);">
      <h2 style="font-size: 1.8rem; color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-border); padding-bottom: 0.5rem; font-family: var(--font-heading);">
        TERMS OF SERVICE
      </h2>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">OVERVIEW</h3>
      <p style="margin-bottom: 1rem;">
        This website is operated by Desi Tadka. Throughout the site, the terms "we", "us" and "our" refer to Desi Tadka. Desi Tadka offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
      </p>
      <p style="margin-bottom: 1rem;">
        By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
      </p>
      <p style="margin-bottom: 1rem;">
        Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
      </p>
      <p style="margin-bottom: 1.5rem;">
        Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">ONLINE STORE TERMS</h3>
      <p style="margin-bottom: 1rem;">
        By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
      </p>
      <p style="margin-bottom: 1rem;">
        You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
      </p>
      <p style="margin-bottom: 1rem;">
        You must not transmit any worms or viruses or any code of a destructive nature.
      </p>
      <p style="margin-bottom: 1.5rem;">
        A breach or violation of any of the Terms will result in an immediate termination of your Services.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">GENERAL CONDITIONS</h3>
      <p style="margin-bottom: 1rem;">
        We reserve the right to refuse service to anyone for any reason at any time.
      </p>
      <p style="margin-bottom: 1rem;">
        You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
      </p>
      <p style="margin-bottom: 1rem;">
        You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
      </p>
      <p style="margin-bottom: 1.5rem;">
        The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>
      <p style="margin-bottom: 1rem;">
        We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
      </p>
      <p style="margin-bottom: 1.5rem;">
        This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">MODIFICATIONS TO THE SERVICE AND PRICES</h3>
      <p style="margin-bottom: 1rem;">
        Prices for our products are subject to change without notice.
      </p>
      <p style="margin-bottom: 1rem;">
        We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
      </p>
      <p style="margin-bottom: 1.5rem;">
        We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">PRODUCTS OR SERVICES</h3>
      <p style="margin-bottom: 1rem;">
        We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
      </p>
      <p style="margin-bottom: 1rem;">
        We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
      </p>
      <p style="margin-bottom: 1.5rem;">
        We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">ACCURACY OF BILLING AND ACCOUNT INFORMATION</h3>
      <p style="margin-bottom: 1rem;">
        We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
      </p>
      <p style="margin-bottom: 1.5rem;">
        You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address, so that we can complete your transactions and contact you as needed. For more detail, please review our Refund Policy.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">OPTIONAL TOOLS</h3>
      <p style="margin-bottom: 1rem;">
        We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
      </p>
      <p style="margin-bottom: 1rem;">
        You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
      </p>
      <p style="margin-bottom: 1.5rem;">
        Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">THIRD-PARTY LINKS</h3>
      <p style="margin-bottom: 1rem;">
        Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.
      </p>
      <p style="margin-bottom: 1.5rem;">
        We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h3>
      <p style="margin-bottom: 1rem;">
        If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
      </p>
      <p style="margin-bottom: 1rem;">
        We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
      </p>
      <p style="margin-bottom: 1.5rem;">
        You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">PERSONAL INFORMATION</h3>
      <p style="margin-bottom: 1.5rem;">
        Your submission of personal information through the store is governed by our Privacy Policy.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">ERRORS, INACCURACIES AND OMISSIONS</h3>
      <p style="margin-bottom: 1rem;">
        Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product delivery charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
      </p>
      <p style="margin-bottom: 1.5rem;">
        We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">PROHIBITED USES</h3>
      <p style="margin-bottom: 1rem;">
        In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
      </p>
      <ul style="list-style-type: lower-alpha; padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.7;">
        <li>for any unlawful purpose;</li>
        <li>to solicit others to perform or participate in any unlawful acts;</li>
        <li>to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
        <li>to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
        <li>to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
        <li>to submit false or misleading information;</li>
        <li>to upload or transmit viruses or any other type of malicious code;</li>
        <li>to collect or track the personal information of others;</li>
        <li>to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
        <li>for any obscene or immoral purpose; or</li>
        <li>to interfere with or circumvent the security features of the Service. We reserve the right to terminate your use of the Service for violating any of the prohibited uses.</li>
      </ul>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h3>
      <p style="margin-bottom: 1rem;">
        We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
      </p>
      <p style="margin-bottom: 1rem;">
        You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied.
      </p>
      <p style="margin-bottom: 1.5rem;">
        In no case shall Desi Tadka, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, or service providers be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, arising from your use of any of the service or any products procured using the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">INDEMNIFICATION</h3>
      <p style="margin-bottom: 1.5rem;">
        You agree to indemnify, defend and hold harmless Desi Tadka and our partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or your violation of any law or the rights of a third-party.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">SEVERABILITY</h3>
      <p style="margin-bottom: 1.5rem;">
        In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">TERMINATION</h3>
      <p style="margin-bottom: 1rem;">
        The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
      </p>
      <p style="margin-bottom: 1rem;">
        These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
      </p>
      <p style="margin-bottom: 1.5rem;">
        If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">ENTIRE AGREEMENT</h3>
      <p style="margin-bottom: 1rem;">
        The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
      </p>
      <p style="margin-bottom: 1rem;">
        These Terms of Service and any policies or operating rules posted by us on this site constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us.
      </p>
      <p style="margin-bottom: 1.5rem;">
        Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">GOVERNING LAW</h3>
      <p style="margin-bottom: 1.5rem; font-weight: 600; color: var(--primary);">
        These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India and jurisdiction of Ajmer, Rajasthan.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">CHANGES TO TERMS OF SERVICE</h3>
      <p style="margin-bottom: 1.5rem;">
        You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
      </p>

      <h3 style="font-size: 1.3rem; color: var(--deep-espresso); margin-top: 1.5rem; margin-bottom: 0.75rem; font-family: var(--font-heading);">CONTACT INFORMATION</h3>
      <p style="margin-bottom: 0;">
        Questions about the Terms of Service should be sent to us at <a href="mailto:info@growthifydigital.online" style="color: var(--primary); font-weight: 700; text-decoration: underline;">info@growthifydigital.online</a>.
      </p>
    </div>
  `;
}

function renderPrivacyContent() {
  return `
    <div style="font-size: 0.95rem; color: var(--deep-espresso);">
      <h1 style="font-size: 2rem; color: #852e01; margin-bottom: 1rem; border-bottom: 2px solid var(--primary-border); padding-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 800;">
        Privacy Policy
      </h1>

      <!-- WHAT DO WE DO WITH YOUR INFORMATION? -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        WHAT DO WE DO WITH YOUR INFORMATION?
      </h2>
      <p style="margin-bottom: 1rem;">
        When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
      </p>
      <p style="margin-bottom: 1rem;">
        When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
      </p>

      <h3 style="font-size: 1.15rem; color: var(--deep-espresso); margin-top: 1.25rem; margin-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 700;">
        Email Marketing (if applicable)
      </h3>
      <p style="margin-bottom: 1.5rem;">
        With your permission, we may send you emails about our store, new products and other updates.
      </p>

      <!-- CONSENT -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        CONSENT
      </h2>
      <h3 style="font-size: 1.15rem; color: var(--deep-espresso); margin-top: 1.25rem; margin-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 700;">
        How do you get my consent?
      </h3>
      <p style="margin-bottom: 1rem;">
        When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
      </p>
      <p style="margin-bottom: 1.5rem;">
        If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
      </p>

      <h3 style="font-size: 1.15rem; color: var(--deep-espresso); margin-top: 1.25rem; margin-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 700;">
        How do I withdraw my consent?
      </h3>
      <p style="margin-bottom: 1rem;">
        If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at:
      </p>
      <div style="background-color: var(--light-beige); padding: 1.1rem 1.35rem; border-radius: var(--radius-md); border: 1.5px solid var(--primary-border); margin-bottom: 1.5rem; line-height: 1.7;">
        <div><strong>Email:</strong> <a href="mailto:info@growthifydigital.online" style="color: #852e01; font-weight: 800; text-decoration: underline;">info@growthifydigital.online</a></div>
        <div style="margin-top: 0.35rem;"><strong>Mailing Address:</strong> Kitchen Queen Pooja, Ajmer, Rajasthan 305001</div>
      </div>

      <!-- DISCLOSURE -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        DISCLOSURE
      </h2>
      <p style="margin-bottom: 1.5rem;">
        We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
      </p>

      <!-- PAYMENT -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        PAYMENT
      </h2>
      <p style="margin-bottom: 1rem;">
        We use <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" style="color: #852e01; font-weight: 800; text-decoration: underline;">Razorpay</a> for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
      </p>
      <p style="margin-bottom: 1rem;">
        Our payment gateway adheres to the standards set by PCI-DSS as managed by the Payment Card Industry Data Security Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
      </p>
      <p style="margin-bottom: 1rem;">
        PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
      </p>
      <p style="margin-bottom: 1.5rem;">
        For more insight, you may also want to read the terms and conditions of Razorpay on: <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" style="color: #852e01; font-weight: 800; text-decoration: underline;">https://razorpay.com</a>
      </p>

      <!-- THIRD-PARTY SERVICES -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        THIRD-PARTY SERVICES
      </h2>
      <p style="margin-bottom: 1rem;">
        In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
      </p>
      <p style="margin-bottom: 1rem;">
        However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
      </p>
      <p style="margin-bottom: 1rem;">
        For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
      </p>
      <p style="margin-bottom: 1rem;">
        In particular, remember that certain providers may be located or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
      </p>
      <p style="margin-bottom: 1.5rem;">
        Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
      </p>

      <!-- LINKS -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        LINKS
      </h2>
      <p style="margin-bottom: 1.5rem;">
        When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
      </p>

      <!-- SECURITY -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        SECURITY
      </h2>
      <p style="margin-bottom: 1.5rem;">
        To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
      </p>

      <!-- COOKIES -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        COOKIES
      </h2>
      <p style="margin-bottom: 1.5rem;">
        We use cookies to maintain the session of the user. It is not used to personally identify you on other websites.
      </p>

      <!-- AGE OF CONSENT -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        AGE OF CONSENT
      </h2>
      <p style="margin-bottom: 1.5rem;">
        By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
      </p>

      <!-- CHANGES TO THIS PRIVACY POLICY -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        CHANGES TO THIS PRIVACY POLICY
      </h2>
      <p style="margin-bottom: 1rem;">
        We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.
      </p>
      <p style="margin-bottom: 1rem;">
        If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
      </p>
      <p style="margin-bottom: 1.5rem;">
        If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
      </p>

      <!-- QUESTIONS AND CONTACT INFORMATION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        QUESTIONS AND CONTACT INFORMATION
      </h2>
      <p style="margin-bottom: 0.75rem;">
        If you would like to:
      </p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; line-height: 1.7;">
        <li>Access your personal information</li>
        <li>Correct your personal information</li>
        <li>Amend your personal information</li>
        <li>Delete your personal information</li>
        <li>Register a complaint</li>
        <li>Get more information about this Privacy Policy</li>
      </ul>
      <p style="margin-bottom: 0.75rem;">
        contact our Privacy Compliance Officer at:
      </p>

      <div style="background-color: var(--warm-beige); border-left: 4px solid #852e01; padding: 1.25rem 1.5rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 2rem; line-height: 1.6; font-weight: 600; color: var(--deep-espresso);">
        <div><strong>Email:</strong> <a href="mailto:info@growthifydigital.online" style="color: #852e01; font-weight: 800; text-decoration: underline;">info@growthifydigital.online</a></div>
        <div style="margin-top: 0.5rem; color: #852e01; font-weight: 800;">Mailing Address:</div>
        <div>Kitchen Queen Pooja</div>
        <div>Near ICICI Bank, Sector - 2</div>
        <div>Vaishali Nagar, Ajmer</div>
        <div>Rajasthan 305004</div>
      </div>

      <!-- BOTTOM QUESTIONS & CONTACT US CTA BOX -->
      <div style="background-color: var(--light-beige); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem; text-align: center; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 800;">
          Questions about our Privacy Policy?
        </h3>
        <p style="margin-bottom: 1.25rem; font-weight: 600;">
          Contact us at <a href="mailto:info@growthifydigital.online" style="color: #852e01; font-weight: 800; text-decoration: underline;">info@growthifydigital.online</a>
        </p>
        <a href="#contact" class="btn btn-primary" style="padding: 0.8rem 2rem; background-color: #852e01; font-weight: 800;">
          Contact Us
        </a>
      </div>
    </div>
  `;
}

function renderRefundContent() {
  return `
    <div style="font-size: 0.95rem; color: var(--deep-espresso);">
      <h1 style="font-size: 2rem; color: #852e01; margin-bottom: 1rem; border-bottom: 2px solid var(--primary-border); padding-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 800;">
        Refund & Returns Policy
      </h1>

      <!-- RETURNS SECTION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        Returns
      </h2>
      <p style="margin-bottom: 1rem;">
        Our policy lasts 2 Hours. If 2 Hours have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
      </p>
      <p style="margin-bottom: 1rem;">
        To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
      </p>
      <p style="margin-bottom: 1rem;">
        Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
      </p>
      <p style="margin-bottom: 1rem;">
        To complete your return, we require a receipt or proof of purchase.
      </p>
      <p style="margin-bottom: 1.5rem; font-weight: 600; color: #852e01;">
        Please do not send your purchase back to the manufacturer.
      </p>

      <!-- PARTIAL REFUNDS SECTION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        Partial Refunds
      </h2>
      <p style="margin-bottom: 1.5rem;">
        There are certain situations where only partial refunds are granted: (if applicable)
      </p>

      <!-- REFUNDS SECTION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        Refunds
      </h2>
      <p style="margin-bottom: 1rem;">
        Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
      </p>
      <p style="margin-bottom: 1.5rem;">
        If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
      </p>

      <!-- LATE OR MISSING REFUNDS SECTION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        Late or Missing Refunds
      </h2>
      <p style="margin-bottom: 1rem;">
        If you haven’t received a refund yet, first check your bank account again.
      </p>
      <p style="margin-bottom: 1rem;">
        Then contact your credit card company, it may take some time before your refund is officially posted.
      </p>
      <p style="margin-bottom: 1rem;">
        Next contact your bank. There is often some processing time before a refund is posted.
      </p>
      <p style="margin-bottom: 1.5rem;">
        If you’ve done all of this and you still have not received your refund yet, please contact us at:
      </p>
      <div style="background-color: var(--light-beige); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1.5px solid var(--primary-border); margin-bottom: 1.75rem; display: inline-block;">
        <span style="font-weight: 700; color: #852e01;">📧 Contact Email:</span>
        <a href="mailto:${restaurantData.contact.email}" style="color: #852e01; font-weight: 800; text-decoration: underline; margin-left: 0.5rem;">
          ${restaurantData.contact.email}
        </a>
      </div>

      <!-- SALE ITEMS SECTION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        Sale Items
      </h2>
      <p style="margin-bottom: 1.5rem;">
        Only regular priced items may be refunded. Unfortunately, sale items cannot be refunded.
      </p>

      <!-- SHIPPING / RETURN ADDRESS SECTION -->
      <h2 style="font-size: 1.4rem; color: #852e01; margin-top: 1.75rem; margin-bottom: 0.75rem; font-family: var(--font-heading); font-weight: 700;">
        Shipping / Return Address
      </h2>
      <p style="margin-bottom: 0.75rem;">
        To return your product, you should send your product to:
      </p>

      <div style="background-color: var(--warm-beige); border-left: 4px solid #852e01; padding: 1.25rem 1.5rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 1.5rem; line-height: 1.6; font-weight: 600; color: var(--deep-espresso);">
        <div style="font-size: 1.1rem; color: #852e01; font-weight: 800; margin-bottom: 0.35rem;">${restaurantData.name}</div>
        <div>${restaurantData.contact.address}</div>
        <div>Contact: ${restaurantData.contact.phone}</div>
      </div>
    </div>
  `;
}
