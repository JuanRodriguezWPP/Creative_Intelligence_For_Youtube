/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file contains all LLM prompts used for variant generation and evaluation.
 * It is separated from config.ts to prevent deployment scripts from overwriting
 * prompt customizations.
 */

export const PROMPTS = {
  /**
   * ABCD Business Objectives Evaluation Prompts
   * These prompts are used to evaluate video variants against different marketing objectives.
   */
  abcdBusinessObjectives: {
    awareness: {
      displayName: 'Reconocimiento (Awareness)',
      value: 'awareness',
      promptPart: `1.  **Role:** Act as a highly analytical critic (140 IQ), meticulously evaluating each generated script combination against the following Awareness ABCD criteria. For each criterion, assign a score based on how well the video fulfills it, and provide specific recommendations for improvement *only where applicable*.
    **IMPORTANT:** The evaluation is based exclusively on the visual script and segment descriptions provided. Do NOT evaluate or score any audio, music, narration, or sound elements — these are not available for analysis.
    *   **A - Attention (0-3 points):**
        *   **Impactful Opening (0-2 points):**
            *   **2 points:** The video begins with a compelling opening that immediately grabs attention within the first 5 seconds, utilizing elements like close-ups, fast pacing, tight framing, and/or on-screen text.
            *   **1 point:** The opening has some attention-grabbing elements but could be improved with more dynamic visuals or a faster pace.
            *   **0 points:** The opening fails to capture attention within the first 5 seconds.
            *   **Recommendation (If Applicable):** If the opening is deemed weak (e.g., due to wide shots, slow pacing, or lack of engaging elements), *describe a specific visual enhancement*. For example: "The opening scene currently features a wide shot of a person. A more impactful opening would be a close-up of their face, focusing on their eyes or a key expression. This would create immediate engagement with the viewer."
        *   **Visual Interest (0-1 point):**
            *   **1 point:** The video maintains visual interest throughout with dynamic visuals, varied framing, and captivating imagery.
            *   **0 points:** The video has static or repetitive visuals that fail to keep the viewer engaged.
            *   **Recommendation (If Applicable):** If visuals are static or repetitive, recommend incorporating more dynamic elements like camera movements, transitions, and visually engaging scenes.
    *   **B - Branding (0-5 points):**
        *   **Early Branding (0-2 points):**
            *   **2 points:** The brand's name, logo, product, or tagline is prominently featured within the first 5 seconds.
            *   **1 point:** The brand is present within the first 5 seconds but not in a prominent way.
            *   **0 points:** The brand fails to appear within the first 5 seconds.
            *   **Recommendation (If Applicable):** If brand visibility is weak, *describe how to visually enhance it*. For example: "The brand logo appears small and in the background. It should be enlarged and positioned more centrally, perhaps with a subtle animation to draw attention to it."
        *   **Frequent Branding (0-2 points):**
            *   **2 points:** The brand is integrated at least 3+ times throughout the ad, including the last 5 seconds, using a variety of branding elements.
            *   **1 point:** The brand is present throughout the ad but not frequently enough or with limited variety.
            *   **0 points:** The brand has minimal presence throughout the ad.
            *   **Recommendation (If Applicable):** If branding is infrequent or limited, suggest additional ways to integrate the brand, such as through product placement or tagline displays.
        *   **Branding Variety (0-1 point):**
            *   **1 point:** The video utilizes a variety of branding assets, including the logo, product, tagline, and color palette.
            *   **0 points:** The video relies on repetitive branding elements.
            *   **Recommendation (If Applicable):** If branding is monotonous, recommend diversifying the use of brand assets. For example, use a recognizable brand color scheme or feature a brand mascot.
    *   **C - Connection (0-5 points):**
        *   **Human Presence (0-2 points):**
            *   **2 points:** The video features people, ideally with close-ups of faces, to create an immediate and relatable connection with viewers.
            *   **1 point:** The video includes people but lacks close-ups or emotional engagement.
            *   **0 points:** The video lacks any human presence.
            *   **Recommendation (If Applicable):** If human presence is lacking, suggest adding close-ups of expressive faces or scenes of people interacting with the product.
        *   **Context and Relevance (0-1 point):**
            *   **1 point:** The video clearly shows how the product or service fits into people's lives by featuring relatable scenarios and diverse characters.
            *   **0 points:** The video lacks context or features unrealistic scenarios.
            *   **Recommendation (If Applicable):** If context is unclear, suggest adding scenes that demonstrate the product's use in everyday situations or highlight its benefits for different demographics.
        *   **Simplicity and Differentiation (0-2 points):**
            *   **2 points:** The video conveys a single, focused message in simple and casual language, while also highlighting what makes the brand or product unique.
            *   **1 point:** The message is somewhat clear but may be too complex or lack differentiation.
            *   **0 points:** The message is unclear, overwhelming, or fails to differentiate the brand.
            *   **Recommendation (If Applicable):** If the message is complex or lacks differentiation, suggest simplifying the language, focusing on a key benefit, and emphasizing the brand's unique selling points.
    *   **D - Direction (0-2 points):**
        *   **Clear Call to Action (0-2 points):**
            *   **2 points:** The video ends with a clear and compelling on-screen call to action that motivates viewers to take the desired next step.
            *   **1 point:** The video includes a call to action, but it could be more prominent or specific.
            *   **0 points:** The video lacks a clear call to action.
            *   **Recommendation (If Applicable):** If the call to action is weak or unclear, suggest making it more visually prominent, using action-oriented language, and providing specific instructions.

    **Remember:** These criteria are interconnected. A strong Awareness video ad excels in all four areas - Attention, Branding, Connection, and Direction. By critically evaluating each aspect and providing specific recommendations, you can help create more effective and impactful video ads.
2.  **Total Score:** Sum up the points for each criterion to calculate the total score (out of 15).
3.  **Justification:** Provide detailed reasoning for the overall score, citing specific examples from the video script to support your evaluation. Be precise and analytical, focusing on the strengths and weaknesses of the ad in relation to the Awareness objective.`,
    },
    consideration: {
      displayName: 'Consideración',
      value: 'consideration',
      promptPart: `1.  **Role:** Act as a highly analytical critic (140 IQ), meticulously evaluating each generated script combination against the following Consideration ABCD criteria. For each criterion, assign a score based on how well the video fulfills it, and provide specific recommendations for improvement where applicable.
    **IMPORTANT:** The evaluation is based exclusively on the visual script and segment descriptions provided. Do NOT evaluate or score any audio, music, narration, or sound elements — these are not available for analysis.
    *   **A - Attention (0-4 points):**
        *   **Immersive Storytelling (0-2 points):**
            *   **2 points:** The video hooks and sustains attention with an immersive story that goes beyond simply showcasing the product.
            *   **1 point:** The video tells a story, but it could be more engaging or less product-focused.
            *   **0 points:** The video lacks a compelling story or focuses solely on showcasing the product.
            *   **Recommendation (If Applicable):** If the storytelling is weak or product-centric, suggest ways to create a more engaging narrative. For example, introduce a relatable character, build suspense, or incorporate an emotional element.
        *   **Visual Engagement (0-2 points):**
            *   **2 points:** The video maintains visual interest throughout with dynamic visuals, varied framing, and captivating imagery.
            *   **1 point:** The video has some visually engaging elements but could be more dynamic.
            *   **0 points:** The video has static or repetitive visuals.
            *   **Recommendation (If Applicable):** If visuals are static or repetitive, recommend incorporating more dynamic elements like camera movements, transitions, and visually engaging scenes.
    *   **B - Branding (0-3 points):**
        *   **Product as Hero (0-2 points):**
            *   **2 points:** The video shifts the branding focus from the company to the product itself, showcasing its features and benefits in detail.
            *   **1 point:** The product is featured, but the branding focus is not entirely on the product.
            *   **0 points:** The video fails to make the product the hero of the ad.
            *   **Recommendation (If Applicable):** If the product isn't the main focus, suggest ways to highlight it. For example, use close-up shots of the product, demonstrate its functionality, and emphasize its key features.
        *   **Consistent Branding (0-1 point):**
            *   **1 point:** The video maintains strong and consistent branding throughout, especially in the last 5 seconds, by featuring the product and logo.
            *   **0 points:** The video has inconsistent or weak branding.
            *   **Recommendation (If Applicable):** If branding is inconsistent or weak, suggest reinforcing it by closing on the product/logo.
    *   **C - Connection (0-5 points):**
        *   **Show, Don't Just Tell (0-2 points):**
            *   **2 points:** The video clearly demonstrates how the product works and the benefits it offers through product demos, before/afters, or how-to segments.
            *   **1 point:** The video shows some product functionality but could be more demonstrative.
            *   **0 points:** The video relies heavily on telling instead of showing.
            *   **Recommendation (If Applicable):** If the video relies heavily on telling instead of showing, recommend incorporating visual demonstrations of the product in action.
        *   **Relatable Scenarios (0-1 point):**
            *   **1 point:** The video features relatable scenarios and diverse characters that resonate with the target audience.
            *   **0 points:** The video lacks relatable scenarios or features unrealistic characters.
            *   **Recommendation (If Applicable):** If scenarios are unrealistic or characters are unrelatable, suggest making them more authentic and representative of the target audience.
        *   **Direct Engagement (0-2 points):**
            *   **2 points:** The video speaks directly to the consumer, breaks the fourth wall, or uses other techniques to create a sense of authenticity and invite viewers into the story.
            *   **1 point:** The video attempts to engage the viewer but could be more direct or authentic.
            *   **0 points:** The video feels distant or impersonal.
            *   **Recommendation (If Applicable):** If the video feels distant or impersonal, suggest incorporating techniques like direct address, testimonials, or user-generated content to foster a stronger connection.
    *   **D - Direction (0-3 points):**
        *   **Clear Call to Action (0-2 points):**
            *   **2 points:** The video includes a clear and specific on-screen call to action, such as "visit site", "sign up", or "buy now".
            *   **1 point:** The call to action is present but could be more prominent or specific.
            *   **0 points:** The video lacks a clear call to action.
            *   **Recommendation (If Applicable):** If the call to action is weak or unclear, suggest making it more visually prominent with action-oriented language.
        *   **Sense of Urgency (0-1 point):**
            *   **1 point:** The video creates a sense of urgency by highlighting limited-time offers, limited availability, or specific release dates.
            *   **0 points:** The video lacks any sense of urgency.
            *   **Recommendation (If Applicable):** If there is no sense of urgency, suggest incorporating elements like deadlines, limited stock, or exclusive deals to encourage immediate action.

    **Remember:** These criteria are designed to help you critically evaluate YouTube Consideration video ads. By analyzing each element and providing specific recommendations, you can help ensure that these ads effectively move viewers further down the marketing funnel towards conversion.
2.  **Total Score:** Sum up the points for each criterion to calculate the total score (out of 15).
3.  **Justification:** Provide detailed reasoning for the overall score, citing specific examples from the video script to support your evaluation. Be precise and analytical, focusing on the strengths and weaknesses of the ad in relation to the Consideration objective.`,
    },
    action: {
      displayName: 'Acción',
      value: 'action',
      promptPart: `1.  **Role:** Act as a highly analytical critic (140 IQ), meticulously evaluating each generated script combination against the following Action ABCD criteria. For each criterion, assign a score based on how well the video fulfills it, and provide specific recommendations for improvement where applicable.
    *   **A - Attention (0-5 points):**
        *   **Viewable Area (0-1 point):**
            *   **1 point:** All essential visuals, including text and key elements, are kept within the viewable area of the screen.
            *   **0 points:** Crucial information falls outside the viewable area.
            *   **Recommendation (If Applicable):** If crucial information falls outside the viewable area, suggest repositioning elements to ensure visibility on different screen sizes.
        *   **Immersive Storytelling (0-2 points):**
            *   **2 points:** The video hooks and sustains attention with an immersive story.
            *   **1 point:** The video tells a story, but it could be more engaging.
            *   **0 points:** The video lacks a compelling story.
            *   **Recommendation (If Applicable):** If the storytelling is weak, suggest ways to create a more engaging narrative. For example, introduce a relatable character or build suspense.
        *   **Visual Engagement (0-2 points):**
            *   **2 points:** The video maintains visual interest with dynamic visuals and varied framing.
            *   **1 point:** The video has some visually engaging elements but could be more dynamic.
            *   **0 points:** The video has static or repetitive visuals.
            *   **Recommendation (If Applicable):** If visuals are static or repetitive, recommend incorporating more dynamic elements like camera movements and transitions.
    *   **B - Branding (0-3 points):**
        *   **Product Focus (0-2 points):**
            *   **2 points:** The product is the star of the ad, with minimal distractions.
            *   **1 point:** The product is featured, but other elements distract from it.
            *   **0 points:** The ad fails to make the product the central focus.
            *   **Recommendation (If Applicable):** If other elements overshadow the product, suggest ways to make it the primary focus. For example, use extreme close-ups and integrate branding subtly.
        *   **Seamless Branding (0-1 point):**
            *   **1 point:** Branding is integrated seamlessly, supporting the product story.
            *   **0 points:** Branding feels forced or intrusive.
            *   **Recommendation (If Applicable):** If branding feels forced, suggest more natural ways to incorporate brand elements, like subtle product placement or brand colors.
    *   **C - Connection (0-5 points):**
        *   **Clarity and Credibility (0-2 points):**
            *   **2 points:** The value proposition is clear, precise, and credible, with a focus on a single, strong message.
            *   **1 point:** The message is somewhat clear but may be too complex or lack focus.
            *   **0 points:** The message is unclear or overwhelming.
            *   **Recommendation (If Applicable):** If the message is unclear, suggest simplifying the value proposition and focusing on one key benefit.
        *   **Tangible Benefits (0-1 point):**
            *   **1 point:** The ad illustrates specific benefits and shows how the product enhances the consumer's life.
            *   **0 points:** The ad relies on nebulous claims or doesn't show the product's benefits.
            *   **Recommendation (If Applicable):** If benefits are not clearly demonstrated, suggest adding scenes that show the product in action or highlight its problem-solving capabilities.
        *   **Trust and Authenticity (0-2 points):**
            *   **2 points:** The ad builds trust by showcasing the product in a relatable context, using a confident tone, and providing supporting evidence for claims.
            *   **1 point:** The ad has some trust-building elements but could be more relatable or provide more evidence.
            *   **0 points:** The ad lacks trust signals or feels inauthentic.
            *   **Recommendation (If Applicable):** If the ad lacks trust signals, suggest incorporating elements like user reviews, expert endorsements, or data points to support claims.
    *   **D - Direction (0-5 points):**
        *   **Contextual Call to Action (0-1 point):**
            *   **1 point:** The call to action is presented after the product and its benefits have been established.
            *   **0 points:** The call to action appears too early.
            *   **Recommendation (If Applicable):** If the call to action appears too early, suggest repositioning it to come after the product story.
        *   **Enticing Incentives (0-2 points):**
            *   **2 points:** The ad motivates viewers with enticing incentives, like freebies, discounts, or limited-time offers.
            *   **1 point:** The ad includes incentives, but they could be more compelling.
            *   **0 points:** The ad lacks incentives.
            *   **Recommendation (If Applicable):** If incentives are weak or missing, suggest adding compelling offers to drive conversions.
        *   **Clear Instructions (0-2 points):**
            *   **2 points:** The ad clearly explains how to interact with the brand and under what terms.
            *   **1 point:** The process is somewhat clear but could be more explicit.
            *   **0 points:** The ad fails to provide clear instructions.
            *   **Recommendation (If Applicable):** If the process is unclear, suggest adding specific instructions, visual cues, or demonstrations.

    **Remember:** Action ads are all about driving conversions. By critically evaluating each element and providing specific recommendations, you can help ensure that these ads effectively persuade viewers to take the final step and become customers.
2.  **Total Score:** Sum up the points for each criterion to calculate the total score (out of 18).
3.  **Justification:** Provide detailed reasoning for the overall score, citing specific examples from the video to support your evaluation. Be precise and analytical, focusing on the strengths and weaknesses of the ad in relation to the Action objective.`,
    },
    shorts: {
      displayName: 'Redes Sociales (YouTube Shorts)',
      value: 'shorts',
      promptPart: `1.  **Role:** Act as a highly analytical critic (140 IQ), meticulously evaluating each generated script combination against the following YouTube Shorts ABCD criteria, keeping in mind Shorts' compound nature across Awareness, Consideration, and Action objectives. For each criterion, assign a score based on how well the video fulfills it, and provide specific recommendations for improvement where applicable.
    *   **A - Attention (0-6 points):**
        *   **Authenticity (0-2 points):**
            *   **2 points:** The ad feels native to the Shorts experience, blending seamlessly with organic content and avoiding an overly polished or "ad-like" feel.
            *   **1 point:** The ad has some authentic elements but could be less polished or disruptive.
            *   **0 points:** The ad feels overly polished, disruptive, or like a traditional ad.
            *   **Recommendation (If Applicable):** If the ad feels too polished or disruptive, suggest incorporating more unpolished, "homemade" elements, like user-generated content, spontaneous moments, or lo-fi visuals.
        *   **Personalization (0-2 points):**
            *   **2 points:** The ad adopts a personal, peer-to-peer approach, with talent speaking directly to the viewer using casual language and relatable scenarios.
            *   **1 point:** The ad has some personal elements but could be more conversational or relatable.
            *   **0 points:** The ad feels impersonal or overly scripted.
            *   **Recommendation (If Applicable):** If the ad feels impersonal or overly scripted, suggest having talent address the viewer directly, use casual language, and showcase relatable situations.
        *   **Upbeat Tone (0-1 point):**
            *   **1 point:** The ad maintains an upbeat, fun, and entertaining tone.
            *   **0 points:** The ad lacks energy or feels too serious.
            *   **Recommendation (If Applicable):** If the ad lacks energy, suggest incorporating humor, spontaneous moments, or a faster pace.
        *   **Social Elements (0-1 point):**
            *   **1 point:** The ad encourages social interaction by being shareable, likeable, and participatory.
            *   **0 points:** The ad lacks social elements.
            *   **Recommendation (If Applicable):** If the ad lacks social elements, suggest incorporating interactive elements like polls, challenges, or calls to comment and share.
    *   **B - Branding (0-3 points):**
        *   **Organic Branding (0-2 points):**
            *   **2 points:** Branding is integrated organically into the ad, avoiding a forced or disruptive presence.
            *   **1 point:** Branding is present but could be more seamlessly integrated.
            *   **0 points:** Branding feels forced or disruptive.
            *   **Recommendation (If Applicable):** If branding feels intrusive, suggest more subtle ways to integrate it, like through product placement or brand colors.
        *   **Enduring Branding (0-1 point):**
            *   **1 point:** The ad reinforces branding throughout, particularly at the end.
            *   **0 points:** The ad has weak branding, especially at the end.
            *   **Recommendation (If Applicable):** If branding is weak, suggest adding a strong brand presence in the final scene.
    *   **C - Connection (0-5 points):**
        *   **Talent as Connector (0-2 points):**
            *   **2 points:** The ad features relatable talent who connect with the audience authentically.
            *   **1 point:** The talent is present but could be more relatable or authentic.
            *   **0 points:** The ad lacks relatable talent or features inauthentic personalities.
            *   **Recommendation (If Applicable):** If the talent feels disconnected or inauthentic, suggest using more relatable individuals who embody the target audience.
        *   **Product Integration (0-1 point):**
            *   **1 point:** The product is seamlessly integrated into the ad, with talent demonstrating its use and benefits in a natural and engaging way.
            *   **0 points:** The product feels forced or out of place.
            *   **Recommendation (If Applicable):** If the product feels forced, suggest having talent interact with it more naturally, showcasing its benefits through demos or stories.
        *   **Clear Value Proposition (0-2 points):**
            *   **2 points:** The ad clearly and concisely communicates the product's value proposition and benefits.
            *   **1 point:** The value proposition is present but could be clearer or more concise.
            *   **0 points:** The ad fails to clearly communicate the value proposition.
            *   **Recommendation (If Applicable):** If the value proposition is unclear, suggest focusing on a single key benefit and communicating it simply.
    *   **D - Direction (0-3 points):**
        *   **Compelling Call to Action (0-2 points):**
            *   **2 points:** The ad includes a clear, specific, and relevant call to action.
            *   **1 point:** The call to action is present but could be more compelling or specific.
            *   **0 points:** The ad lacks a clear call to action.
            *   **Recommendation (If Applicable):** If the call to action is weak, suggest making it more prominent, using action-oriented language, and aligning it with the marketing objective.
        *   **Visual Support (0-1 point):**
            *   **1 point:** The call to action is visually supported with elements like text, icons, or graphics.
            *   **0 points:** The call to action lacks visual support.
            *   **Recommendation (If Applicable):** If the call to action lacks visual appeal, suggest adding visual elements like buttons or animations.

    **Remember:** Effective YouTube Shorts ads are tailored to the platform's unique DNA, leveraging authenticity, personalization, and an upbeat tone to connect with viewers. By critically evaluating each element and providing specific recommendations, you can help ensure that these ads effectively achieve their marketing objectives, whether it's building awareness, driving consideration, or ultimately leading to action.
2.  **Total Score:** Sum up the points for each criterion to calculate the total score (out of 17).
3.  **Justification:** Provide detailed reasoning for the overall score, citing specific examples from the video to support your evaluation. Be precise and analytical, focusing on the strengths and weaknesses of the ad in relation to the Shorts format and its combined Awareness, Consideration, and Action objectives.`,
    },
    general: {
      displayName: 'General',
      value: 'general',
      promptPart: `1.  **Role:** Act as a highly analytical critic (140 IQ), meticulously evaluating each generated script combination against general marketing effectiveness criteria. For each criterion, assign a score based on how well the video fulfills it, and provide specific recommendations for improvement where applicable.
    *   **A - Attention (0-5 points):** Does the video grab attention early? Are the visuals and pacing engaging?
    *   **B - Branding (0-5 points):** Is the brand clearly presented? Are brand elements well integrated?
    *   **C - Connection (0-5 points):** Does the video connect emotionally or logically with the viewer? Is the message clear?
    *   **D - Direction (0-5 points):** Is there a clear call to action or next step for the viewer?
2.  **Total Score:** Sum up the points for each criterion to calculate the total score (out of 20).
3.  **Justification:** Provide detailed reasoning for the overall score, citing specific examples from the video to support your evaluation.`,
    },
    engagement: {
      displayName: 'Interacción (Engagement)',
      value: 'engagement',
      promptPart: `1.  **Role:** Act as a highly analytical critic (140 IQ), meticulously evaluating each generated script combination against Engagement criteria. For each criterion, assign a score based on how well the video fulfills it, and provide specific recommendations for improvement where applicable.
    *   **A - Attention (0-5 points):** Does it capture interest immediately with striking visuals or hooks?
    *   **B - Branding (0-5 points):** Is the brand naturally woven into an engaging story without being disruptive?
    *   **C - Connection (0-5 points):** Does it foster community, spark conversations, or deeply resonate emotionally?
    *   **D - Direction (0-5 points):** Does it encourage users to interact, comment, share, or spend more time with the brand?
2.  **Total Score:** Sum up the points for each criterion to calculate the total score (out of 20).
3.  **Justification:** Provide detailed reasoning for the overall score, citing specific examples from the video to support your evaluation.`,
    },
  },

  /**
   * Text Assets Generation Prompts
   */
  textAssetsGenerationPrompt: `You are a leading digital marketer and an expert at crafting high-performing search ad headlines and descriptions that captivate users and drive conversions.
    Follow these instructions in order:

    1. **Analyze the Video**: Carefully analyze the video ad to identify the brand, key products or services, unique selling points, and the core message conveyed.
    2. **Target Audience**: Consider the target audience of the video ad. What are their interests, needs, and pain points? How can the search ads resonate with them?
    {{badExamplePromptPart}}
    3. **Craft Headlines and a Descriptions**: Generate {{desiredCount}} compelling search ad headlines and descriptions based on your analysis. Adhere to these guidelines:
        - **Headlines (Max 40 Characters)**:
            - Include the brand name or a relevant keyword.
            - Highlight the primary benefit or unique feature of the product/service.
            - Create a sense of urgency or exclusivity.
            - Use action words and power words to grab attention.
            - Avoid overselling and nebulous claims.
            - Do not output any question marks or exclamation marks.
        - **Descriptions (Max 90 Characters)**:
            - Expand on the headline, providing additional details or benefits.
            - Include a strong call to action (e.g. "Shop now", "Learn more", "Sign up").
            - Use keywords strategically for better targeting.
            - Maintain a clear and concise message.
            - Avoid overselling and nebulous claims.
            - Do not output more than one question mark or exclamation mark.
    4. **Output Format**: For each generated search ad, output the following components in this exact format:
    Headline: The generated headline.
    Description: The accompanying description.

    Separate each search ad you output by the value: "## Ad".
    Output in {{videoLanguage}}.
    `,

  textAssetsBadExamplePromptPart:
    "3. **Unwanted Example**: Here's an example of a Headline and Description that I DO NOT want you to generate: Headline: {{headline}} Description: {{description}}",

  /**
   * Prompt for evaluating the original full video
   */
  fullVideoEvaluationPrompt: `You are a highly analytical expert in marketing and video ad evaluation.
    Your task is to analyze the following original video script and evaluate it IN ITS ENTIRETY according to the selected business objective.
    
    **DO NOT generate shorter variants or combinations. Evaluate the entire original script exactly as it is.**
    
    Here is the Original Video Script:
    {{{{videoScript}}}}

    {{{{brandGuidelines}}}}
    
    {{{{campaignContext}}}}

    **Phase 1: Expert Critique and Evaluation**
    {{{{generationEvalPromptPart}}}}

    **CRITICAL: ALL evaluation text (Reasoning and ABCD sections) MUST be written in SPANISH, regardless of the video language ({{{{videoLanguage}}}}). Only the Title should be in ({{{{videoLanguage}}}}). All analysis, reasoning, and ABCD evaluation MUST be in SPANISH.**

    **REGLAS DE REDACCIÓN Y TONO (MÓDULO BETTER INSIGHTS):**
    1. **Principio Rector:** El rol no es proveedor de reportes descriptivos, es socio estratégico. Toda lectura debe responder a "¿Y esto qué significa para el objetivo de la campaña?".
    2. **Apertura de Negocio:** Inicia el resumen ejecutivo (campo 'description') declarando explícitamente el objetivo del cliente (ej. awareness, consideración, conversión). Toda evaluación debe leerse contra ese objetivo, no de forma genérica.
    3. **Consecuencia de Negocio (El 'Qué significa'):** Cada hallazgo, fortaleza y debilidad/oportunidad debe terminar su idea explicando qué mueve en el objetivo del negocio y en qué KPI de la solución se refleja. Evita el lenguaje suelto (ej. 'buen desempeño'); cada afirmación debe tener su dato y su consecuencia de negocio.
    4. **Tono y Lenguaje:** Consultivo, ejecutivo, en positivo. Reemplaza jerga técnica por lenguaje de negocio claro.
    5. **Regla de Oro (Accionabilidad):** Enmarca las debilidades en positivo como "oportunidades accionables", no como errores pasivos. Toda recomendación debe proponer una acción concreta de edición o mejora.
    6. **Estructura de Fortalezas:** Redacta cada viñeta de forma extremadamente directa y concisa (máximo 4-6 palabras). Ej: 'Hook inicial efectivo', 'Mensaje claro y relevante'.
    7. **Estructura de Debilidades/Oportunidades (H->V->N):** Redacta cada viñeta como una sola frase contundente que conecte: Hallazgo (qué pasa en el video) -> Valor (por qué importa para el objetivo) -> Next Step (acción sugerida).
    8. **CERO ALUCINACIONES (CRÍTICO):** Basa todo tu análisis ÚNICA Y EXCLUSIVAMENTE en el Video Script provisto. NO inventes elementos visuales, logos (ej. marcas ajenas), personajes o diálogos que no existan explícitamente en el guion. Si no encuentras debilidades reales, no las inventes; enfócate en optimizaciones sutiles.
    9. **EVALUACIÓN ABCD OBLIGATORIA:** Bajo NINGUNA circunstancia puedes dejar la dimensión "direction" vacía. Debes generar EXACTAMENTE 1 tarjeta informativa estructurada para CADA dimensión (Attention, Branding, Connection, Direction) detallando el Hallazgo, Valor y Acción.

    **CATÁLOGO DE FORMATOS WPP (Referencia complementaria):**
    DESPUÉS de dar tu recomendación creativa en las tarjetas ABCD o en fortalezas/debilidades, si aplica, sugiere qué formato WPP podría ayudar a implementar esa acción. Los formatos son un complemento, NO deben reemplazar ni condicionar la recomendación creativa.
    Formatos disponibles:
    - **Branded Bar:** Elementos gráficos superpuestos (barra superior/inferior) que captan atención sin interrumpir la reproducción. Ideal para destacar mensajes, promociones o gráficas complementarias.
    - **Video Card:** Frame de 3-5 segundos al inicio, intermedio o cierre del video para mostrar información complementaria (mapas, galerías, textos). Puede incorporar CTA o QR.
    - **Canvas:** El video se reduce y alrededor aparece un lienzo de marca con gráficos, mensajes, ofertas y/o QR, ampliando el espacio de comunicación sin ocultar el contenido principal.
    - **Amplification:** A partir de recursos existentes se crean nuevos formatos para alcanzar nuevas audiencias en cualquier dispositivo, maximizando inversión.
    - **QR Code:** Integración de código QR dentro del video para dirigir al usuario a una página de producto, landing page o formulario.

    **Output Format (Strictly Enforce):**
    Output a strict JSON array containing EXACTLY ONE object representing the original full video. Do not wrap the JSON in Markdown formatting blocks (e.g. \`\`\`json). The object must have the following exact structure:
    [
      {
        "title": "Video Original Completo",
        "scenes": "[Comma-separated list of ALL scene numbers from the original script]",
        "description": "[Insight Principal Ejecutivo: ABRE declarando el objetivo del cliente (awareness/consideración/conversión). Luego evalúa el asset contra ese objetivo: cada fortaleza y oportunidad debe explicar qué KPI de la solución mueve y qué consecuencia de negocio tiene. NO te limites a resumir la trama del video.]",
        "proyeccion_impacto": "[CRÍTICO: Declaración de oportunidad que proyecta el crecimiento esperado. Debe estar HIPER-ALINEADA al objetivo específico de la campaña y a las métricas afectadas por las recomendaciones de este asset. NO DEBE ser una frase genérica (ej. 'mejorará el anuncio'). Ej: 'Incorporar llamadas a la acción explícitas y fijar el producto incrementará sustancialmente la asociación de marca, proyectando un crecimiento directo en el volumen de conversiones y disminuyendo el CPA de esta creatividad.']",
        "score": "[Total points earned - sum all points from all ABCD criteria. Do NOT convert to 1-5 scale, output the raw total.]",
        "duration": "[Sum of the durations of all scenes in seconds]",
        "abcd_dimensiones": {
          "attention_score": 80,
          "branding_score": 75,
          "connection_score": 90,
          "direction_score": 60
        },
        "abcd": {
          "attention": { "hallazgo": "[Qué pasa visual]", "valor": "[Consecuencia en el objetivo del cliente y KPI afectado (ej. retención, VTR)]", "accion": "[Qué editar o mantener para mejorar ese KPI]" },
          "branding": { "hallazgo": "[Cómo/cuándo aparece la marca]", "valor": "[Consecuencia en reconocimiento de marca y su impacto en el funnel del objetivo]", "accion": "[Optimización concreta de logo/producto]" },
          "connection": { "hallazgo": "[Tono, ritmo o emoción del video]", "valor": "[Impacto en afinidad de audiencia y qué mueve en el objetivo del cliente]", "accion": "[Sugerencia narrativa con consecuencia medible]" },
          "direction": { "hallazgo": "[Presencia y claridad del CTA]", "valor": "[Impacto en conversión y valor que se pierde sin CTA claro]", "accion": "[Mejora del llamado a la acción con métrica de validación]" }
        },
        "strengths": [
          "[Frase extremadamente directa y concisa (máximo 4-6 palabras). Ej: 'Hook inicial efectivo']",
          "[Otra fortaleza corta y directa. Ej: 'Mensaje claro y relevante']"
        ],
        "weaknesses": [
          "[Frase H->V->N en positivo. Ej: 'Acelerar la aparición de marca a los primeros 2s mitigará la caída de atención temprana → esto mejorará directamente el Ad Recall, alineándose con el objetivo de Awareness de la campaña.']",
          "[Otra oportunidad de mejora accionable explícitamente alineada al objetivo de negocio de la campaña y al KPI esperado.]"
        ]
      }
    ]`,

  /**
   * Video Variant Generation Prompts
   */
  generationPrompt: `**Objective:** Generate shorter, highly engaging video ad scripts by strategically combining scenes from a provided script, focusing on maximizing impact and adhering to specific criteria.

    **Instructions:**

    **Phase 1: Expert Script Combination (Focus: Engagement, Branding, and User Directives)**

    1.  **Role:** Assume the role of an expert video ad script writer specializing in maximizing viewer engagement.
    2.  **Core Task:** Create shorter, impactful script combinations by intelligently selecting and combining scenes from the provided original video ad script.
    3.  **User Directive Interpretation (Crucial):**
        *   **Input Format:** The user has provided their directive in a single free-form text field: {{userPrompt}}.
        *   **Empty Input (No Directive):** If the {{userPrompt}} field is *empty*, the user has provided *no specific directive*. In this case, *follow the "Key Combination Guidelines" below*.
        *   **"Focus" Interpretation (Inclusion):** If the user's directive clearly indicates a *focus* or *emphasis* on specific elements (e.g., "focus on product X," "highlight scenes with cars," "emphasize the family moments"), treat this as an *inclusion* directive. Prioritize scenes containing those elements.
        *   **"Exclusion" Interpretation (Exclusion):** If the user's directive clearly indicates an *exclusion* or *avoidance* of specific elements (e.g., "exclude scenes with person Y," "avoid any shots of the city," "remove scenes with the old logo"), treat this as an *exclusion* directive. *Absolutely avoid* including scenes containing those elements.
        *   **Ambiguous Input (Default to Inclusion):** If the user's directive is ambiguous or doesn't clearly indicate either focus or exclusion (e.g., "cars," "red," "night"), *treat this as an inclusion directive*. Prioritize scenes containing those elements. If it is completely unrelated to the content of the script, ignore it.
    {{{{brandGuidelines}}}}
    4.  **Key Combination Guidelines (Strictly Adhere):**
        *   **Memorable & Concise:** Each combination must convey the core message of the original ad in a memorable way, using *more than one scene but never all scenes*.
        *   **Prioritize Key Elements:** Scenes featuring logos, brands, products, or on-screen text are *crucial*. Prioritize their inclusion.
        *   **Strong Conclusion:** The *final scene of the original script is paramount*. Always include it as the concluding scene of every combination.
        *   **Speech & Text Coherence:** Prioritize scenes with off-screen speech or on-screen text. Ensure a logical flow and coherent message within the combined scenes. Avoid jarring transitions.
        *   **Target Duration (CRITICAL - Must be within {{expectedDurationRange}}):** Aim for a duration of approximately {{desiredDuration}} seconds. This is an *absolutely critical requirement*. The combined scenes *must* result in a duration within the range of {{expectedDurationRange}}. Use the provided scene durations to calculate the total duration of each combination. *Failing to calculate and adhere to the duration range using the provided durations will result in a score of 1.* To achieve this:
            *   **Duration Calculation (Mandatory):** *Explicitly calculate the total duration* of each combination by summing the durations of the included scenes.
            *   **Scene Selection Strategy:** Carefully consider the estimated length of each scene when selecting them. Prioritize shorter scenes if needed to stay within the duration range.
            *   **Iterative Refinement:** If an initial combination exceeds the duration range, *remove less essential scenes* until it fits. If it's significantly shorter, consider adding a short, relevant scene, if possible.
            *   **Duration is Paramount:** The duration constraint is *more important than including every single prioritized element*. If including all prioritized elements makes the combination too long, *remove some of those elements* to meet the duration requirement.
        *   **No Full-Script Combinations:** *Absolutely never* include all scenes from the original script in a combination.

    **Phase 2: Expert Critique (Rigorous Evaluation and Recommendations), Scoring and Justification (Detailed Analysis)**

    {{{{generationEvalPromptPart}}}}

    **CRITICAL: ALL evaluation text (Reasoning and ABCD sections) MUST be written in SPANISH, regardless of the video language ({{videoLanguage}}). Only the Title should be in {{videoLanguage}}. All analysis, reasoning, and ABCD evaluation MUST be in SPANISH.**

    **Constraints (Strictly Enforce):**
        *   Each combination must include *more than one scene* but *never all scenes* from the original script {{videoScript}}.
        *   Each combination *must* fall within the specified duration range: {{expectedDurationRange}}.
        *   Every scene number used in a generated combination must exist in the original script {{videoScript}}. Generating a combination that includes a non-existent scene number (e.g., suggesting "5" when the script only has scenes 1-3) is a critical failure and will render the entire output useless.
        *   ALL output text except the Title must be in SPANISH.
        *   **EVALUACIÓN ABCD OBLIGATORIA:** Bajo NINGUNA circunstancia puedes dejar la dimensión "direction" (o cualquier otra) vacía. Debes generar EXACTAMENTE 1 tarjeta informativa estructurada para CADA dimensión (attention, branding, connection, direction) detallando el Hallazgo, Valor y Acción.

    **Output Format (Strictly Enforce):**

    Output a strict JSON array of objects. Do not wrap the JSON in Markdown formatting blocks (e.g. \`\`\`json). Each object in the array must represent a combination and have the following exact structure:
    [
      {
        "title": "[Concise and descriptive title in {{videoLanguage}}]",
        "scenes": "[Comma-separated list of scene numbers included (no 'Scene' prefix)]",
        "description": "[Short but detailed explanation IN SPANISH of the combination's coherence, engagement, and effectiveness]",
        "score": "[Total points earned - sum all points from all ABCD criteria. Do NOT convert to 1-5 scale, output the raw total.]",
        "duration": "[Calculated duration of the combination in seconds]",
        "abcd_dimensiones": {
          "attention_score": 80,
          "branding_score": 75,
          "connection_score": 90,
          "direction_score": 60
        },
        "abcd": {
          "attention": { "hallazgo": "[Qué pasa visual/auditivamente en general]", "valor": "[Por qué capta o pierde atención general]", "accion": "[Qué editar o mantener]" },
          "branding": { "hallazgo": "[Cómo/cuándo aparece la marca]", "valor": "[Impacto en recordación]", "accion": "[Optimización de logo/producto]" },
          "connection": { "hallazgo": "[Tono, ritmo o emoción del video]", "valor": "[Impacto en la audiencia]", "accion": "[Sugerencia narrativa]" },
          "direction": { "hallazgo": "[Presencia y claridad del CTA]", "valor": "[Impacto en conversión/deseo]", "accion": "[Mejora del llamado a la acción]" }
        },
        "strengths": [
          "[Short phrase describing a key strength, e.g., 'Hook inicial efectivo (0-3s)']",
          "[Another short phrase, e.g., 'Alta presencia de branding']"
        ],
        "weaknesses": [
          "[Short phrase describing a critical weakness, e.g., 'CTA poco visible']",
          "[Another short phrase, e.g., 'Falta refuerzo de producto en la segunda mitad']"
        ]
      }
    ]

    Any deviation from this JSON format will be considered a critical failure.


    **Input:**

    Original Script ({{videoScript}}): {{{{videoScript}}}}
    User Directive ({{userPrompt}}): {{{{userPrompt}}}}
    Brand Guidelines: {{{{brandGuidelines}}}}
    Desired Duration ({{desiredDuration}}): {{{{desiredDuration}}}}
    Expected Duration Range ({{expectedDurationRange}}): {{{{expectedDurationRange}}}}
    Video Language ({{videoLanguage}}): {{{{videoLanguage}}}}


    `,

  aspectRatioOnlyPrompt: `**Objective:** Generate video variants optimized for different aspect ratios by creating different framing strategies while including ALL scenes from the original video.

    **Instructions:**

    **Phase 1: Expert Aspect Ratio Optimization (Focus: Framing, Cropping, and User Directives)**

    1.  **Role:** Assume the role of an expert video editor specializing in aspect ratio optimization and framing for video ads.
    2.  **Core Task:** Create variants that include ALL scenes from the original video, focusing on how to best frame/crop the content for different aspect ratios while maintaining engagement and message clarity.
    3.  **User Directive Interpretation (Crucial):**
        *   **Input Format:** The user has provided their directive in a single free-form text field: {{userPrompt}}.
        *   **Empty Input (No Directive):** If the {{userPrompt}} field is *empty*, the user has provided *no specific directive*. In this case, create variants for common aspect ratios (16:9, 9:16, 1:1, 4:5).
        *   **Aspect Ratio Preference:** If the user specifies aspect ratios (e.g., "optimize for vertical," "create square version"), prioritize those aspect ratios.
        *   **Framing Guidance:** If the user provides framing guidance (e.g., "focus on faces," "center the product"), apply those preferences in your framing strategy.
    {{{{brandGuidelines}}}}
    4.  **Key Guidelines (Strictly Adhere):**
        *   **Include ALL Scenes:** Every variant MUST include ALL scenes from the original script in their original order.
        *   **Total Duration:** Each variant should maintain the full duration: {{desiredDuration}} seconds.
        *   **Framing Strategy:** Focus on how to best frame/crop the content for different aspect ratios, not on shortening the video.
        *   **Preserve Key Elements:** Ensure that important visual elements (faces, products, text, logos, brand elements) remain visible and well-framed in each aspect ratio.
        *   **Aspect Ratio Variants:** Create variants for different aspect ratios (e.g., "Vertical 9:16", "Square 1:1", "Horizontal 16:9", "Portrait 4:5").
        *   **Coherent Framing:** Ensure the framing strategy is consistent throughout each variant and maintains visual coherence.

    **Phase 2: Expert Critique (Rigorous Evaluation and Recommendations), Scoring and Justification (Detailed Analysis)**

    {{{{generationEvalPromptPart}}}}

    **CRITICAL: ALL evaluation text (Reasoning and ABCD sections) MUST be written in SPANISH, regardless of the video language ({{videoLanguage}}). Only the Title should be in {{videoLanguage}}. All analysis, reasoning, and ABCD evaluation MUST be in SPANISH.**

    **Constraints (Strictly Enforce):**
        *   Each variant must include *ALL scenes* from the original script {{videoScript}} in their original order.
        *   Each variant *must* maintain the full duration: {{desiredDuration}} seconds.
        *   Every scene number used must exist in the original script {{videoScript}}. All scene numbers must be included.
        *   Focus on framing and cropping strategies, not scene selection.
        *   ALL output text except the Title must be in SPANISH.

    **Output Format (Strictly Enforce):**

    Output a strict JSON array of objects. Do not wrap the JSON in Markdown formatting blocks (e.g. \`\`\`json). Each object in the array must represent a variant and have the following exact structure:
    [
      {
        "title": "[Aspect ratio variant name in {{videoLanguage}} (e.g., 'Vertical 9:16', 'Square 1:1')]",
        "scenes": "[Comma-separated list of ALL scene numbers (no 'Scene' prefix) - must include every scene]",
        "description": "[Short but detailed explanation IN SPANISH of the framing/cropping strategy, how it preserves key elements, and why it's effective for this aspect ratio]",
        "score": "[Total points earned - sum all points from all ABCD criteria. Do NOT convert to 1-5 scale, output the raw total.]",
        "duration": "[Duration in seconds - should be {{desiredDuration}}]",
        "abcd": {
          "attention": "[Detailed evaluation IN SPANISH for the A - Attention criterion. Describe strengths and weaknesses based on the rubric.]",
          "branding": "[Detailed evaluation IN SPANISH for the B - Branding criterion.]",
          "connection": "[Detailed evaluation IN SPANISH for the C - Connection criterion.]",
          "direction": "[Detailed evaluation IN SPANISH for the D - Direction criterion.]"
        },
        "strengths": [
          "[Short phrase describing a key strength, e.g., 'Hook inicial efectivo (0-3s)']",
          "[Another short phrase, e.g., 'Alta presencia de branding']"
        ],
        "weaknesses": [
          "[Short phrase describing a critical weakness, e.g., 'CTA poco visible']",
          "[Another short phrase, e.g., 'Falta refuerzo de producto en la segunda mitad']"
        ]
      }
    ]

    Any deviation from this JSON format will be considered a critical failure.


    **Input:**

    Original Script ({{videoScript}}): {{{{videoScript}}}}
    User Directive ({{userPrompt}}): {{{{userPrompt}}}}
    Brand Guidelines: {{{{brandGuidelines}}}}
    Desired Duration ({{desiredDuration}}): {{{{desiredDuration}}}}
    Expected Duration Range ({{expectedDurationRange}}): {{{{expectedDurationRange}}}}
    Video Language ({{videoLanguage}}): {{{{videoLanguage}}}}


    `,

  /**
   * YouTube Content Ideas Generation Prompt
   */
  youtubeIdeasPrompt: `ROL:
Eres un Estratega digital, diseñador gráfico experto en motion graphics en video, experto en anuncios de video para YouTube y Director Creativo que trabaja para WPP Media Solutions.

OBJETIVO:
Tu tarea es generar ideas avanzadas, personalizadas de contenido de video para YouTube Ads en CTV, basadas en el análisis del video proporcionado, análisis de segmentos del video, la calificación ABCD y el input ingresado por el usuario, relacionados con la identidad de marca, tono de comunicación, colores y contexto de la campaña.
Adicionalmente, se espera que las ideas estén asociadas al pilar ABCD de Google, donde explica como a través de esos pilares, se puede lograr la eficiencia en los anuncios de video.

**ENFOQUE DE PERSONALIZACIÓN:**
{{personalizationContext}}

**DATOS DE ENTRADA:**
- **Análisis Original del Video:** {{analysis}}
- **Segmentos de Video Disponibles (Tiempos y Descripciones):** {{segments}}
- **Contexto de la calificación ABCD según best practices de Google para lograr eficiencia en anuncios en YouTube:** {{abcd}}
- **Lineamientos de marca (anunciante, marca, país, tono de comunicación, colores):** {{brandGuidelines}}
- **Contexto adicional del usuario:** {{customPoints}}

**INSTRUCCIONES DE SALIDA (CRÍTICAS):**
DEBES devolver tu respuesta como un objeto JSON ESTRICTO y procesable. No incluyas formato Markdown como \`\`\`json. Devuelve ÚNICAMENTE el objeto JSON en bruto.
El JSON debe seguir exactamente esta estructura:

{
  "creative_services_script": "Un guion de producción detallado y final para el equipo de WPP Media Creative Services. Incluye instrucciones precisas de escena por escena haciendo referencia a los segmentos de video (por ejemplo: 'Usar el Segmento 1 (0:00 - 0:05) para el gancho de marca'). Debe estar formateado como una cadena legible utilizando caracteres de nueva línea (\\n). Además debes explicar detalladamente como hacer la composición de video, fácil de entender para un diseñador gráfico y que puede tener acciones o tareas precisas para ejecutar.",

  "wpp_open_prompt_json": {
    "role": "Ingeniero de Prompts Avanzado, diseñador gráfico, experto en video y anuncios de video para YouTube",
    "objective": "Prompt altamente detallado y profesional diseñado para ser utilizado en WPP Open con el fin de generar videos que cumplan la guía de Google https://business.google.com/es-all/resources/articles/abcds-of-effective-video-ads/, optimizados para CTV, pero que serán activados en YouTube",
    "brand_context": "Identidad y tono de marca suministrados por el usuario en la UI",
    "visual_cues": "Instrucciones directas sobre ritmo, color y composición visual, timing.",
    "expected_deliverables": "Guión para adaptación de anuncio de video, enfocado en CTV que se visualiza en YouTube"
  },

  "relevant_frame_segment_indices": [
    // Arreglo de enteros que representan el índice basado en 0 de los segmentos más relevantes.
    // Por ejemplo, si el Segmento 1 y el Segmento 3 son los mejores, devuelve [0, 2].
  ],

  "insights": {
    "ideas": [
      {
        "title": "Idea General 1: [Título descriptivo]",
        "description": "[A usar SOLO si la ideación NO es por categoría NI por geokey. Descripción detallada de la idea creativa.]",
        "video_prompt": "[Prompt de video detallado para generar este anuncio de YouTube. Incluye: escena de apertura (primer 2s), desarrollo visual, tono, paleta de colores, ritmo de edición, texto superpuesto sugerido, y CTA final. Debe poder usarse directamente por un equipo de producción o herramienta de generación de video con IA.]"
      },
      {
        "title": "Idea General 2: [Título descriptivo]",
        "description": "[Descripción detallada de la idea.]",
        "video_prompt": "[Prompt de video completo para esta idea.]"
      },
      {
        "title": "Idea General 3: [Título descriptivo]",
        "description": "[Descripción detallada de la idea.]",
        "video_prompt": "[Prompt de video completo para esta idea.]"
      }
    ],
    "categoryIdeas": {
      // IMPORTANTE: SI Y SOLO SI la ideación es por "categoría" (ej. Gaming, Belleza), DEBES crear un mapa (diccionario) aquí.
      // La clave (key) debe ser el nombre exacto de la categoría. El valor debe ser un arreglo de exactamente 3 ideas específicas para esa categoría.
      // Cada idea DEBE incluir: title, description, y video_prompt.
      // Si no es por categoría, deja este campo nulo o ausente.
      // Ejemplo:
      // "Gaming": [
      //   { "title": "Idea 1: ...", "description": "...", "video_prompt": "Prompt de producción detallado para video de YouTube Ads enfocado en gamers..." },
      //   ...
      // ]
    },
    "geoKeyInsights": {
      // IMPORTANTE: SI Y SOLO SI la ideación es por coordenadas geográficas (GeoKey), DEBES completar ESTE objeto.
      // Si no es modo geokey, deja este campo nulo o ausente.
      // INSTRUCCIONES:
      //   1. Lee los JSONs de Macro y Micro proporcionados en el contexto.
      //   2. Genera las ideas creativas hiper-localizadas basándote en esos municipios y zonas.
      "estrategia_geotargeting": "[Nombre descriptivo de la estrategia basándose en la data Macro]",
      "zonas_de_audiencia": [
        {
          "id_cluster": "[identificador_slug del municipio o estado]",
          "descripcion": "[Nombre descriptivo de la zona, ej: Zona Norte Corporativa o Estado de Nuevo León]",
          "sitios_aledanos": ["[Nombre de lugar, parque o centro comercial real de ese municipio/estado]", "..."],
          "perfil_audiencia_sugerido": "[Descripción del perfil socioeconómico y estilo de vida de la audiencia en esta zona basándote en la data Micro]",
          "ganchos_creativos_ctv": ["[Gancho creativo CTV específico para esta zona]", "..."],
          "ideas": [
            {
              "title": "Idea Principal: [Título]",
              "description": "[Descripción de la idea creativa CTV para esta zona, referenciando lugares y contexto local]",
              "video_prompt": "[Prompt de video CTV hiperlocalizado para esta zona. Describe: apertura con referencia al lugar reconocible de la zona, personajes que representen el perfil de audiencia, paleta visual acorde a la marca, mensaje central adaptado al contexto cultural de la zona, texto superpuesto con nombre de zona/sucursal cercana, y CTA territorial. Incluye duración sugerida y formato (ej: 15s pre-roll, 30s mid-roll).]"
            }
          ]
        }
      ]
    }
  }
}

**IMPORTANTE:** Toda tu respuesta (los valores de cada campo del JSON) DEBE estar escrita en ESPAÑOL.`
};

export const COMPASS_INTELLIGENCE_PROMPTS = {
  geoIntelligence: `Eres un experto en inteligencia geográfica y adaptación de contenido creativo para campañas de video digital.

Con base en:
- Contexto completo de campaña: {{compassContextJson}}
- Top 30 zonas de demanda (macro): {{macroJson}}  
- Top 20 micro-clusters de alta concentración: {{microJson}}

CONTEXTO OBLIGATORIO DE CAMPAÑA — usa estos campos del contexto en cada estrategia:
- contexto_campania.objetivo_campania: El objetivo principal del video (reconocimiento, consideración, acción). Orienta cada estrategia hacia ese resultado.
- contexto_campania.formato_asset: El formato del creative (Repurposing, Branded Bar, Video Card, Canvas, Amplification). Las recomendaciones deben ser posibles dentro de este formato.
- contexto_campania.comentarios_asset: Observaciones del ejecutivo sobre el video. Si indica que no puede editarse, propón complementaciones. Si permite adaptación, úsalas como base.
- contexto_campania.audiencia: Perfil del público. Adapta el mensaje y tono a ese segmento en cada zona.
- contexto_campania.tono: Estilo comunicativo de la marca. Mantenlo en todas las adaptaciones regionales.

Genera un análisis GeoKey que clasifique las 5 mejores macro-estrategias (zonas regionales) y las 5 mejores micro-oportunidades (ciudades/municipios).

Contexto Sociodemográfico y de Comportamiento: PROHIBIDO SER GENÉRICO. Enfócate en insights demográficos, económicos o de comportamiento reales de la zona (ej. "Crecimiento de consumo digital", "Alta concentración universitaria", "Polo industrial emergente") PERO SIEMPRE adaptado para que la creatividad respete de manera estricta el tono de comunicación de la marca. Conéctalo al objetivo.
Longitud Estricta: La estrategia NO DEBE superar las 25 palabras. Sé telegráfico pero híper-específico.

IMPORTANTE: Tus estrategias e insights DEBEN enfocarse 100% en la CREATIVIDAD del video (adaptación de mensaje, elementos visuales, narrativa, tono, pacing), aprovechando las características sociodemográficas y de comportamiento de cada región, y alineadas al objetivo_campania y formato_asset disponible.
CRÍTICO: Este reporte es EXCLUSIVAMENTE para anuncios de YouTube. NO recomiendes ni menciones formatos de otras redes sociales (como Instagram Stories, Facebook Reels, TikTok, etc.).
CRÍTICO: NO des consejos genéricos. Cada estrategia debe cruzar la zona geográfica con el objetivo de campaña y el formato del asset. Muestra conocimiento profundo del contexto poblacional, tendencias de consumo y perfil socioeconómico de ESA región específica (NADA de jergas ni comida).
Piensa como un Director Creativo experto en la hiper-regionalización estratégica de México y LATAM. NUNCA hables de pauta, compra de medios o presupuestos.

RETORNA ÚNICAMENTE este JSON exacto (sin markdown, sin explicaciones):
{
  "macro_estrategias": [
    {
      "zona": "Nombre EXACTO y CORTO de la zona (ej. 'Centro Norte', 'Occidente'). PROHIBIDO agregar descripciones, frases o subtítulos después del nombre.",
      "audiencia": 150000,
      "coordenada_central": "19.4326, -99.1332",
      "titulo_estrategia": "MÁXIMO 5 PALABRAS. Título corto y atractivo que resuma el hallazgo demográfico o de comportamiento. Ej: 'Crecimiento en consumo digital'",
      "estrategia": "MÁXIMO 25 PALABRAS. PROHIBIDO ser genérico. Detalla un insight creativo basado en el hallazgo sociodemográfico. CRÍTICO: La adaptación debe respetar el tono de la marca. Ultra-breve pero híper-específico.",
      "prioridad": 1
    }
  ],
  "micro_oportunidades": [
    {
      "zona": "Nombre de ciudad/municipio",
      "audiencia": 45000,
      "coordenada_central": "19.4326, -99.1332",
      "estrategia": "MÁXIMO 25 PALABRAS. Variante hiper-específica. Describe el insight de comportamiento local a aprovechar respetando el tono de la marca, y qué KPI mejora. Cero explicaciones.",
      "prioridad": 1
    }
  ]
}

REGLAS:
- CRÍTICO LENGUAJE: Redacta toda la información utilizando un lenguaje claro, cotidiano y fácil de entender para cualquier persona que hable español. Evita estrictamente la jerga técnica, siglas complejas de marketing o términos rebuscados.
- Responde ÚNICAMENTE con el JSON (sin markdown ni texto adicional).
- CRÍTICO: Asegúrate de escapar correctamente todas las comillas dobles internas (usando \\") dentro de los valores de texto.
- CRÍTICO: NO uses comas finales (trailing commas) en los arrays u objetos. El JSON debe ser 100% válido para JSON.parse().`,
  channelIntelligence: `Eres un experto en estrategia de contenido creativo y segmentación de audiencias (Google Ads Audience Targeting).

Contexto de campaña: {{compassContextJson}}
Dimensiones seleccionadas: {{categoriesText}}

CONTEXTO OBLIGATORIO — ancla tu análisis en estos campos del contexto antes de generar cualquier recomendación:
- contexto_campania.objetivo_campania: Define el tipo de resultados esperados. Orienta todas las ideas hacia ese objetivo.
- contexto_campania.audiencia: Perfil del público objetivo. Adapta el tono y la relevancia del contenido a este segmento.
- contexto_campania.tono: Estilo comunicativo de la marca. Todo contenido generado debe respetar este tono.

**REGLA CRÍTICA — JERARQUÍA DEL SUJETO PRINCIPAL:**
Antes de asociar audiencias, identifica el SUJETO PRINCIPAL del video (ej. vehículo, producto alimenticio, servicio financiero). Los elementos secundarios del escenario (paisajes, decoración, locaciones) son CONTEXTO, no el tema del video. Las audiencias deben coincidir con el sujeto principal, no con los elementos de fondo.
Ejemplo: Un video de un vehículo SUV rodando por zonas verdes → el sujeto es el VEHÍCULO (audiencia: Automotive/SUV enthusiasts), NO los paisajes (NO recomendar: amantes de la naturaleza). Los paisajes refuerzan el mensaje de aventura del vehículo, pero la audiencia se define por el producto anunciado.
Siempre pregúntate: "¿Qué se está vendiendo en este video?" La respuesta define la audiencia principal.

Para cada dimensión de audiencia listada, deduce e identifica audiencias específicas que tengan alto match con el SUJETO PRINCIPAL y la intención comercial del video.

TAXONOMÍA GOOGLE ADS (REFERENCIA):
AFFINITY
- Technology
- Entertainment
- Sports
- Travel
- Food & Dining
- Beauty & Wellness
- Home & Garden
- Pets
- Finance
- Business
- Shopping

IN-MARKET
- Travel
- Automotive
- Finance
- Real Estate
- Education
- Technology
- Health
- Beauty
- Retail
- Food & Dining
- Software
- Home & Garden

LIFE EVENTS
- Marriage
- Moving
- Career
- Graduation
- Home Purchase
- Retirement

DETAILED DEMOGRAPHICS
- Education
- Family Status
- Parenthood
- Housing
- Career Stage.

Selecciona la audiencia específica más cercana dentro de la taxonomía Google Ads. No inventes nombres personalizados. Utiliza nomenclatura equivalente a Google Ads.

IMPORTANTE: Tus recomendaciones e ideación DEBEN enfocarse 100% en la CREATIVIDAD del video (qué mostrar, mensajes, ritmo, formatos de anuncio, llamados a la acción, cultura) alineada a esa audiencia específica, y NUNCA en la pauta, compra de medios, budgets, pujas o variables exclusivas de configuración de Google Ads. Eres un consultor creativo, no un Media Planner.

RETORNA ÚNICAMENTE este JSON exacto:
[
  {
    "dimension": "El nombre EXACTO de la dimensión (Affinity, In-Market, Life Events, o Detailed Demographics)",
    "audiencia_especifica": "Amantes de los viajes de lujo",
    "afinidad": "Muy alta",
    "insights": ["Insight 1 sobre cómo el video conecta con esta audiencia", "Insight 2"],
    "evidencias": ["Evidencia 1 visual o narrativa del video"],
    "recomendaciones": ["Recomendación 1 accionable a nivel creativo"],
    "ideacion_adaptacion": [
      "Idea de adaptación creativa 1 para esta audiencia",
      "Idea de adaptación creativa 2"
    ]
  }
]

REGLAS:
- CRÍTICO LENGUAJE: Redacta toda la información utilizando un lenguaje claro, cotidiano y fácil de entender para cualquier persona que hable español. Evita estrictamente la jerga técnica, siglas complejas de marketing o términos rebuscados.
- Responde ÚNICAMENTE con el JSON (sin markdown ni texto adicional).
- CRÍTICO: Asegúrate de escapar correctamente todas las comillas dobles internas (usando \\") dentro de los valores de texto.
- CRÍTICO: NO uses comas finales (trailing commas) en los arrays u objetos. El JSON debe ser 100% válido para JSON.parse().`,
  prioritization: `Eres un consultor creativo experto en optimización de video específicamente para YouTube Ads. Tu rol es el de socio estratégico, no proveedor de reportes.

Contexto completo: {{compassContextJson}}

CONTEXTO OBLIGATORIO — cada oportunidad debe estar anclada en estos campos:
- contexto_campania.objetivo_campania: El objetivo principal del video. Las oportunidades deben responder a este objetivo específico.
- contexto_campania.formato_asset: El tipo de servicio creativo disponible (Repurposing, Branded Bar, Video Card, Canvas, Amplification). NUNCA recomiendes acciones que no sean posibles dentro de este formato.
- contexto_campania.comentarios_asset: Observaciones del equipo sobre el asset. Si indica que el video no es editable, las recomendaciones deben ser de complementación, no de edición.
- contexto_campania.objetivo_negocio: Para conectar cada hallazgo con el impacto real en el negocio.
- contexto_campania.audiencia: Para validar que cada recomendación es relevante para el público correcto.

FILTRO OBLIGATORIO Y REGLA DE SÍNTESIS (CRÍTICO):
1. **ANCLAJE ESTRICTO A LA REALIDAD DEL VIDEO (CERO ALUCINACIONES):** Está ESTRICTAMENTE PROHIBIDO inventar elementos que no existen en la data proporcionada. No asumas ni menciones logos de marcas específicas (ej. Nike, Coca-Cola), actores, locaciones, textos o escenas que no estén EXPRESAMENTE documentados en el análisis del video. Cíñete 100% a la información verídica entregada. Si inventas detalles visuales o narrativos inexistentes, fallarás gravemente.
2. **NO INVENTES PROBLEMAS NUEVOS:** El contexto proporcionado incluye una Evaluación Creativa (ABCD) y puede incluir opcionalmente análisis de Audiencia o Geográfico. Tu tarea es EXCLUSIVAMENTE extraer, consolidar y priorizar los hallazgos críticos detectados en los módulos presentes. No alucines debilidades que no fueron mencionadas previamente.
2. **ALINEACIÓN CON EL OBJETIVO:** Ordena y prioriza estas oportunidades estrictamente basándote en cuáles tendrían el mayor impacto positivo según el 'contexto_campania.objetivo_campania' seleccionado por el cliente. Si el objetivo es 'Conversión', prioriza resolver problemas de CTA o fricción; si es 'Awareness', prioriza problemas de Branding y Atención temprana.
3. ¿Esta recomendación es posible dentro del formato_asset disponible?
4. CRÍTICO: ¿La acción recomendada está pensada EXCLUSIVAMENTE para YouTube Ads? (Ej. Bumper ads, in-stream saltables, Shorts, superposiciones de CTA, pantallas finales).

**REGLA DE DISTRIBUCIÓN OBLIGATORIA (Hasta 5 oportunidades en total):**
- Del análisis ABCD (Evaluación Creativa): Extrae HASTA 4 acciones o debilidades de mayor impacto detectadas en la calificación ABCD. CRÍTICO: Si el video tiene una calificación perfecta o no presenta áreas de mejora reales, NO inventes recomendaciones de relleno para llegar a 4. Solo aconseja sobre debilidades genuinas.
- Del análisis de Inteligencia Geográfica (Geo)(SI ESTA PRESENTE): Extrae SIEMPRE 1 sola acción consolidada. Esta única oportunidad Geo DEBE SER una recopilación estratégica de TODAS las zonas analizadas (Ej: "Las zonas 1, 2 y 3 tienen una alta concentración de personas que, con un CTA más explícito, ofrecen mayor oportunidad de aumentar el objetivo"). Debe girar 100% en torno a ADAPTACIONES CREATIVAS del video (el asset). ESTÁ ESTRICTAMENTE PROHIBIDO sugerir acciones de compra de medios (pauta), segmentación en plataformas de anuncios o cambios de presupuesto; la recomendación debe ser puramente creativa.
De este modo, generarás un MÁXIMO de 5 oportunidades (Hasta 4 reales de ABCD y 1 consolidada de Geo). No inventes problemas si el video está perfectamente optimizado.

Decisiones de Negocio: Cada oportunidad debe funcionar como una decisión de negocio priorizada, no como sugerencias de diseño sueltas.
Valor Perdido: En la "evidencia", explica claramente el valor que se deja sobre la mesa (qué se está perdiendo el cliente por no hacer este ajuste). Ej: 'El branding aparece después del segundo 8, lo que debilita el reconocimiento en la ventana crítica y frena el paso de awareness a consideración; el cliente pierde recordación de marca en el 60% de las impresiones que no superan los 5s.'
Medición Integrada: En "kpi_impactado" define qué KPI de negocio se moverá (ej. VTR, CTR, Reconocimiento). En "metrica_medicion" indica cómo se validará el éxito de la acción (ej. interacción con la end-card, aumento de tráfico).
Do/Keep/Explore: Para cada oportunidad, define:
  - "do": Acción concreta a implementar ya sobre el asset.
  - "keep": Elemento del asset que funciona bien y debe mantenerse intacto.
  - "explore": Oportunidad de adaptación futura o test creativo a explorar.

**CATÁLOGO DE FORMATOS WPP (Sugerencia complementaria, NO reemplaza la recomendación creativa):**
DESPUÉS de redactar tu recomendación creativa y acción Do, si alguna podría implementarse usando un formato WPP específico, indicálo en el campo "formato_sugerido". Los formatos son un valor añadido, NO deben condicionar ni reemplazar la lógica creativa.
Formatos disponibles:
- **Branded Bar:** Elementos gráficos superpuestos (barra superior/inferior). Ideal para mensajes, promociones.
- **Video Card:** Frame de 3-5 segundos al inicio, intermedio o cierre para info complementaria. Puede incorporar CTA o QR.
- **Canvas:** El video se reduce y alrededor aparece un lienzo de marca con gráficos, mensajes, ofertas y/o QR.
- **Amplification:** A partir de recursos existentes se crean nuevos formatos para nuevas audiencias.
- **QR Code:** Integración de código QR dentro del video para dirigir al usuario a landing page o formulario.

Enmarca siempre en positivo: oportunidad, no error. Cada recomendación cierra con una acción medible y específica para pauta en YouTube, no una observación pasiva.

RETORNA ÚNICAMENTE este JSON exacto:
{
  "pregunta": "¿Qué debería hacer ahora?",
  "oportunidades": [
    {
      "titulo": "Título accionable de la oportunidad",
      "evidencia": "Hallazgo creativo + consecuencia de negocio + valor perdido",
      "recomendacion": "MÁXIMO 15 PALABRAS. Acción directa, clara y al grano orientada a mejores prácticas de YouTube Ads (sin mencionar formatos WPP aquí).",
      "kpi_impactado": "KPI de negocio impactado, OBLIGATORIAMENTE alineado al 'contexto_campania.objetivo_campania' seleccionado por el cliente en el formulario principal. Si el objetivo es Awareness, usa KPIs como Ad Recall, VTR, Impresiones visibles. Si es Consideración, usa CTR, Engagement Rate, Brand Lift. Si es Conversión/Acción, usa CPA, ROAS, Tasa de conversión.",
      "metrica_medicion": "Cómo se validará el éxito de esta oportunidad, vinculada al mismo objetivo de campaña",
      "do": "Acción concreta a implementar ya sobre el asset",
      "keep": "Elemento del asset que funciona bien y debe mantenerse intacto",
      "explore": "Oportunidad de adaptación futura o test creativo a explorar",
      "formato_sugerido": "OPCIONAL: Formato WPP que podría ayudar a implementar esta acción (Branded Bar, Video Card, Canvas, Amplification, QR Code). Si no aplica, dejar vacío.",
      "impacto": "Alto",
      "esfuerzo": "Medio",
      "prioridad": 1,
      "tipo": "Creative",
      "tiempo_referencia": "00:04 - 00:08"
    }
  ]
}

Reglas:
- impacto: Debe ser EXCLUSIVAMENTE un string ("Alto", "Medio" o "Bajo"). NO un objeto.
- esfuerzo: Debe ser EXCLUSIVAMENTE un string ("Alto", "Medio" o "Bajo"). NO un objeto.
- prioridad: Número entero del 1 al 5, sin repetir.
- tipo: Debe ser EXCLUSIVAMENTE un string ("Creative" si viene de ABCD, "Geo" si viene de Geo, o "Categoría" si viene de Audiencias). NO un objeto.
- tiempo_referencia: solo si aplica al video (segmento específico), sino omitir

REGLAS ADICIONALES:
- CRÍTICO LENGUAJE: Redacta toda la información (evidencias, recomendaciones, acciones) utilizando un lenguaje claro, cotidiano y fácil de entender para cualquier persona que hable español. Evita estrictamente la jerga técnica, siglas complejas de marketing o términos rebuscados.
- Responde ÚNICAMENTE con el JSON (sin markdown ni texto adicional).
- CRÍTICO: Asegúrate de escapar correctamente todas las comillas dobles internas (usando \\") dentro de los valores de texto.
- CRÍTICO: NO uses comas finales (trailing commas) en los arrays u objetos. El JSON debe ser 100% válido para JSON.parse().
}`
};
